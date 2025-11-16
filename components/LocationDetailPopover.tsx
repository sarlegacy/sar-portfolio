import React from 'react';
import { XIcon } from './icons/Icons';

interface LocationData {
    title: string;
    address: string;
    mapImage: string;
    position: { top: string; left: string };
}

interface LocationDetailPopoverProps {
    data: LocationData;
    onClose: () => void;
}

const LocationDetailPopover: React.FC<LocationDetailPopoverProps> = ({ data, onClose }) => {
    return (
        <div
            className="absolute z-10 w-64 transform -translate-x-1/2 -translate-y-[110%] bg-white/10 dark:bg-mono-dark/60 backdrop-blur-lg rounded-xl border border-white/20 dark:border-mono-mid/60 shadow-2xl shadow-black/50 animate-fade-in"
            style={{ top: data.position.top, left: data.position.left, animationDuration: '0.3s' }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors z-20"
                aria-label="Close popover"
            >
                <XIcon />
            </button>

            <div className="relative overflow-hidden rounded-t-xl">
                <img src={data.mapImage} alt="Location map" className="w-full h-24 object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-mono-dark/80 via-mono-dark/50 to-transparent"></div>
            </div>
            
            <div className="p-4 pt-2">
                <h4 className="font-display font-bold text-white mb-1">{data.title}</h4>
                <p className="text-sm text-mono-light">{data.address}</p>
            </div>
            
            {/* Popover arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-4 h-4 bg-inherit border-b border-r border-white/20 dark:border-mono-mid/60 transform rotate-45 -z-10"></div>
        </div>
    );
};

export default LocationDetailPopover;