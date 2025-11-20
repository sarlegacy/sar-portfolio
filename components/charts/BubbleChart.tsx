import React, { useState, useMemo, useCallback } from 'react';
import { ScatterChart, Scatter, ResponsiveContainer, ZAxis, XAxis, YAxis, Tooltip } from 'recharts';
import { Skill } from '../../types';

interface BubbleChartProps {
  data: Skill[];
}

// Define a specific type for the tooltip payload to avoid using `any`.
interface CustomTooltipPayload {
  payload: {
    name: string;
    value: number;
    description: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[];
}


const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/80 dark:bg-mono-dark/80 backdrop-blur-md p-4 rounded-lg border border-gray-200 dark:border-mono-mid shadow-lg text-sm w-64 transition-colors duration-500">
        <p className="font-bold text-gray-900 dark:text-mono-white mb-1 transition-colors duration-500">{data.name}</p>
        <p className="text-gray-600 dark:text-mono-light mb-2 transition-colors duration-500">Proficiency: {data.value}%</p>
        <p className="text-gray-600 dark:text-mono-light transition-colors duration-500">{data.description}</p>
      </div>
    );
  }
  return null;
};

// Props passed by Recharts to the custom shape component
interface CustomBubbleProps {
  cx: number;
  cy: number;
  r: number;
  index: number;
  payload: Skill & { x: number; y: number; isTop: boolean };
  hoveredSkill: string | null;
}

const CustomBubble = React.memo((props: CustomBubbleProps) => {
  const { cx, cy, payload, r: radius, index, hoveredSkill } = props;
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  
  const isTop = payload.isTop;
  const isLegendHovered = hoveredSkill === payload.name;
  const isHovered = isSelfHovered || isLegendHovered;

  return (
    <g
      transform={`translate(${cx},${cy})`}
      onMouseEnter={() => setIsSelfHovered(true)}
      onMouseLeave={() => setIsSelfHovered(false)}
      className={`animate-stagger-in cursor-pointer ${isTop && !isHovered ? 'animate-pulse-glow' : ''}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'backwards',
      }}
    >
      <g
        transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
        style={{
          transition: 'transform 0.2s ease-out, filter 0.2s ease-out',
          transformOrigin: 'center',
          filter: isHovered ? `drop-shadow(0 0 16px white)` : (isTop ? undefined : 'none'),
        }}
      >
        <circle r={radius} fill="url(#bubbleGradient)" />
        {/* Inner glow effect for more depth */}
        <circle r={radius} fill="url(#innerGlow)" />
        <circle 
            r={radius} 
            stroke={isHovered ? '#FFFFFF' : '#E0E0E0'} 
            strokeWidth={isHovered ? 2 : 1} 
            fill="none" 
            strokeOpacity={isHovered ? 1 : 0.4} 
            style={{ transition: 'all 0.2s ease-out' }}
        />
        <text
          x={0}
          y={0}
          dy="0.3em"
          textAnchor="middle"
          fill="#2A2A2A" // Softer dark grey for better readability
          fontSize={radius / 3.8}
          fontWeight="600"
          fontFamily="Sora, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          {payload.name}
        </text>
      </g>
    </g>
  );
});

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const positionedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    // A simple, deterministic algorithm to place bubbles
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const topValue = sortedData[0].value;

    const center = { x: 150, y: 150 };
    const positions = [];
    
    // Place the largest bubble in the center
    positions.push({ ...sortedData[0], x: center.x, y: center.y, isTop: sortedData[0].value === topValue });

    let angle = 0;
    let radius = 100;
    for (let i = 1; i < sortedData.length; i++) {
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        positions.push({ ...sortedData[i], x, y, isTop: sortedData[i].value === topValue });
        angle += Math.PI / 3; // Adjust angle for next bubble
        if (i % 6 === 0) {
            radius += 60; // Increase radius for the next circle of bubbles
        }
    }
    return positions;
  }, [data]);

  const renderBubble = useCallback(
    (props: Omit<CustomBubbleProps, 'hoveredSkill'>) => <CustomBubble {...props} hoveredSkill={hoveredSkill} />,
    [hoveredSkill]
  );
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <defs>
              {/* More sophisticated gradient for a pearlescent finish */}
              <radialGradient id="bubbleGradient" cx="0.35" cy="0.35" r="0.65">
                <stop offset="0%" stopColor="white" />
                <stop offset="70%" stopColor="#E0E0E0" />
                <stop offset="100%" stopColor="#A0A0A0" />
              </radialGradient>
              {/* Gradient for the inner glow effect */}
              <radialGradient id="innerGlow">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>
            <XAxis type="number" dataKey="x" hide={true} domain={[0, 300]} />
            <YAxis type="number" dataKey="y" hide={true} domain={[0, 300]} />
            <ZAxis type="number" dataKey="value" range={[40, 90]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Scatter data={positionedData} shape={renderBubble} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-shrink-0 pt-4 mt-2">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {data.sort((a,b) => b.value - a.value).map((skill) => (
            <div 
              key={skill.name} 
              className="flex items-center gap-2 text-sm cursor-pointer group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 dark:from-mono-white dark:to-mono-light transition-transform duration-200 group-hover:scale-125" />
              <span className="text-gray-600 dark:text-mono-light transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-mono-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BubbleChart;