import React, { useState, useMemo } from 'react';
import { Skill } from '../types';

interface SkillOrbitProps {
  data: Skill[];
}

const SkillOrbit: React.FC<SkillOrbitProps> = ({ data }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const skillTiers = useMemo(() => {
    const tiers: Record<number, Skill[]> = { 1: [], 2: [], 3: [] };
    // Prioritize skills with higher value to be in more prominent orbits
    const sortedSkills = [...data].sort((a, b) => b.value - a.value);
    
    sortedSkills.forEach((skill) => {
      if (skill.value >= 90) tiers[1].push(skill);
      else if (skill.value >= 80) tiers[2].push(skill);
      else tiers[3].push(skill);
    });
    return tiers;
  }, [data]);
  
  // Responsive radii
  const orbitConfig = {
    1: { radius: 100, duration: '20s' },
    2: { radius: 170, duration: '30s' },
    3: { radius: 240, duration: '40s' },
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative scale-75 sm:scale-90 md:scale-100">
      
      {/* Tooltip displayed at the center */}
      <div className="absolute z-20 transition-all duration-300 pointer-events-none w-64 text-center">
        {hoveredSkill ? (
          <div className="bg-white/80 dark:bg-mono-dark/80 backdrop-blur-md p-4 rounded-lg border border-gray-200 dark:border-mono-mid shadow-lg text-sm animate-fade-in transition-colors duration-500">
            <p className="font-bold text-gray-900 dark:text-mono-white mb-1 transition-colors duration-500">{hoveredSkill.name}</p>
            <p className="text-gray-600 dark:text-mono-light mb-2 transition-colors duration-500">Proficiency: {hoveredSkill.value}%</p>
            <p className="text-gray-600 dark:text-mono-light text-xs transition-colors duration-500">{hoveredSkill.description}</p>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-white dark:bg-mono-dark border-2 border-gray-200 dark:border-mono-mid flex items-center justify-center animate-center-pulse transition-colors duration-500">
            <span className="font-bold text-gray-900 dark:text-mono-white text-sm transition-colors duration-500">SKILLS</span>
          </div>
        )}
      </div>

      {Object.entries(skillTiers).map(([tierStr, skills]) => {
        // FIX: Cast `skills` to `Skill[]` as TypeScript may incorrectly infer it as `unknown` when using `Object.entries`.
        const skillArray = skills as Skill[];
        if (skillArray.length === 0) return null;
        const tier = parseInt(tierStr, 10);
        const config = orbitConfig[tier as keyof typeof orbitConfig];

        return (
          <div key={tier} className="absolute w-full h-full">
            {/* Orbit Path */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-300/30 dark:border-mono-mid/30 transition-opacity duration-300"
              style={{
                width: `${config.radius * 2}px`,
                height: `${config.radius * 2}px`,
                opacity: hoveredSkill ? 0.2 : 1
              }}
            />
            
            {/* Rotating container for skills */}
            <div
              className="absolute top-0 left-0 w-full h-full animate-orbit"
              style={{
                animationDuration: config.duration,
                animationDirection: tier % 2 === 0 ? 'reverse' : 'normal',
                animationPlayState: hoveredSkill ? 'paused' : 'running',
              }}
            >
              {skillArray.map((skill, index) => {
                const angle = (360 / skillArray.length) * index;
                return (
                  <div
                    key={skill.name}
                    className="absolute top-1/2 left-1/2 w-24 h-10 -m-5" // half width/height
                    style={{
                      transform: `rotate(${angle}deg) translateX(${config.radius}px) rotate(${-angle}deg)`,
                    }}
                  >
                    <div
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`w-full h-full flex items-center justify-center p-1 rounded-full cursor-pointer transition-all duration-300
                      ${hoveredSkill && hoveredSkill.name !== skill.name ? 'opacity-30 scale-90' : 'opacity-100'}
                      ${hoveredSkill && hoveredSkill.name === skill.name ? 'scale-125 bg-gray-900 text-white dark:bg-mono-white dark:text-mono-black shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(224,224,224,0.7)] z-10' : 'bg-white dark:bg-mono-dark border border-gray-200 dark:border-mono-mid text-gray-700 dark:text-mono-light hover:bg-gray-200 dark:hover:bg-mono-mid'}`}
                    >
                       <span className="text-sm font-semibold text-center leading-tight">{skill.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillOrbit;