import React, { useState, useEffect } from 'react';
import LocationDetailPopover from './LocationDetailPopover';

// A simple random number generator for our mock data
const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Define location data for the popovers
const locationData = {
    start: {
        title: 'Origin Hub: Innovatech Solutions',
        address: '123 Tech Avenue, San Francisco, CA',
        mapImage: 'https://images.unsplash.com/photo-1541432182333-5b8d5b19b380?q=80&w=800&auto=format&fit=crop',
        position: { top: '83.33%', left: '8.33%' } // y=250/300, x=50/600
    },
    end: {
        title: 'Destination: Creative Labs',
        address: '456 Design Drive, New York, NY',
        mapImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
        position: { top: '66.67%', left: '91.67%' } // y=200/300, x=550/600
    }
};

type SelectedPoint = 'start' | 'end' | null;


const LiveTrackingMap = () => {
    const [speed, setSpeed] = useState(88);
    const [eta, setEta] = useState(14);
    const [distance, setDistance] = useState(12.4);
    const [selectedPoint, setSelectedPoint] = useState<SelectedPoint>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed(getRandom(85, 95));
            setEta(prev => Math.max(1, prev - 1));
            setDistance(prev => Math.max(0, parseFloat((prev - 0.8).toFixed(1))));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const journeyDuration = 30; // seconds
    const totalDistance = 15;
    const progress = Math.max(0, 100 - (distance / totalDistance * 100));

    // SVG path for the animation
    const pathData = "M 50 250 Q 150 50 300 150 T 550 200";

    return (
        <div className="relative w-full aspect-[16/10] bg-mono-black/50 dark:bg-mono-dark rounded-2xl border border-gray-200 dark:border-mono-mid overflow-hidden p-4 flex flex-col justify-end">
            {/* Popover for location details */}
            {selectedPoint && (
                <LocationDetailPopover 
                    data={locationData[selectedPoint]} 
                    onClose={() => setSelectedPoint(null)} 
                />
            )}

            {/* Map SVG */}
            <svg width="100%" height="100%" viewBox="0 0 600 300" className="absolute top-0 left-0">
                <defs>
                    {/* Grid pattern */}
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(160, 219, 36, 0.05)" strokeWidth="1"/>
                    </pattern>
                    {/* Glow filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                     <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A0DB24" stopOpacity="0" />
                        <stop offset="100%" stopColor="#A0DB24" />
                    </linearGradient>
                </defs>

                {/* Grid Background */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Abstract landmass shapes */}
                <path d="M -10 80 C 40 40, 100 120, 150 70 S 250 0, 300 50 L 250 150 Z" fill="rgba(160, 219, 36, 0.03)" />
                <path d="M 400 250 C 450 300, 500 200, 550 220 S 650 150, 620 280 Z" fill="rgba(160, 219, 36, 0.03)" />

                {/* The tracking path */}
                <path d={pathData} strokeWidth="2" stroke="rgba(160, 219, 36, 0.2)" fill="none" strokeDasharray="5,5" />
                <path d={pathData} strokeWidth="2" stroke="url(#line-gradient)" fill="none" className="animate-draw-path" style={{ animationDuration: `${journeyDuration}s`, strokeDasharray: 1000 }} />

                {/* Start and End points */}
                <circle 
                    cx="50" 
                    cy="250" 
                    r="8" 
                    fill="#A0DB24" 
                    filter="url(#glow)"
                    className="cursor-pointer transition-transform duration-200 hover:scale-125"
                    onClick={() => setSelectedPoint(selectedPoint === 'start' ? null : 'start')}
                />
                <circle 
                    cx="550" 
                    cy="200" 
                    r="8" 
                    fill="#A0DB24"
                    className="animate-pulse-glow cursor-pointer transition-transform duration-200 hover:scale-125"
                    onClick={() => setSelectedPoint(selectedPoint === 'end' ? null : 'end')}
                />

                {/* The moving vehicle dot */}
                <g className="animate-move-along-path" style={{ animationDuration: `${journeyDuration}s`, offsetPath: `path('${pathData}')` }}>
                     <circle r="6" fill="#A0DB24" filter="url(#glow)" />
                     <circle r="3" fill="white" />
                </g>
            </svg>

            {/* UI Overlay */}
            <div className="relative bg-white/10 dark:bg-mono-dark/50 backdrop-blur-md rounded-xl p-4 border border-white/10 dark:border-mono-mid/50 text-white animate-fade-in">
                 <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-xs text-mono-light uppercase tracking-wider">Tracking ID</p>
                        <p className="font-bold font-display text-lg">SAR-TRK-2025</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-status-green/20 text-status-green text-sm font-semibold">
                         <span className="w-2 h-2 rounded-full bg-status-green animate-pulse"></span>
                         En Route
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-3">
                    <div>
                        <p className="text-xs text-mono-light uppercase">Speed</p>
                        <p className="font-bold text-xl">{speed} <span className="text-sm font-normal">km/h</span></p>
                    </div>
                     <div>
                        <p className="text-xs text-mono-light uppercase">ETA</p>
                        <p className="font-bold text-xl">{eta} <span className="text-sm font-normal">min</span></p>
                    </div>
                     <div>
                        <p className="text-xs text-mono-light uppercase">Distance Left</p>
                        <p className="font-bold text-xl">{distance} <span className="text-sm font-normal">km</span></p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div>
                     <p className="text-xs text-mono-light mb-1">Journey Progress</p>
                     <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div className="bg-brand-green h-1.5 rounded-full transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTrackingMap;