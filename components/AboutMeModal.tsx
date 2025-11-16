import React from 'react';
import { profileData } from '../constants';
import { XIcon } from './icons/Icons';

interface AboutMeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
            style={{ animationDuration: '0.3s' }}
            onClick={onClose}
        >
            <div
                className="bg-white/80 dark:bg-mono-dark/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-mono-mid w-full max-w-2xl shadow-2xl shadow-black/50 relative transition-colors duration-500"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-mono-white transition-colors z-10"
                    aria-label="Close modal"
                >
                    <XIcon />
                </button>
                
                <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 text-center sm:text-left">
                        <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-mono-mid flex-shrink-0 object-cover transition-colors duration-500" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-500">{profileData.name}</h2>
                            <h3 className="text-md text-gray-800 dark:text-mono-white font-semibold transition-colors duration-500">{profileData.title}</h3>
                        </div>
                    </div>
                    
                    <div className="text-gray-600 dark:text-mono-light space-y-4 whitespace-pre-line text-sm sm:text-base transition-colors duration-500">
                        {profileData.longBio || profileData.bio}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeModal;