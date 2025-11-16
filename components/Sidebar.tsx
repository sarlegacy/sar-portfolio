import React from 'react';
import { profileData } from '../constants';
import { FacebookIcon, InstagramIcon, LinkedinIcon, DownloadIcon, InfoIcon } from './icons/Icons';

interface SidebarProps {
    onAboutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAboutClick }) => {
    return (
        <aside className="lg:sticky top-4 flex flex-col items-center lg:items-start bg-white/60 dark:bg-mono-dark/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-mono-mid h-full self-start transition-all duration-300 hover:border-gray-400/30 dark:hover:border-mono-light/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_30px_rgba(224,224,224,0.05)] hover:scale-[1.01]">
            <div className="relative mb-6 group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-mono-white dark:to-mono-light rounded-full animate-rotate-glow opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300 blur-lg"></div>
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <img 
                        src={profileData.avatar} 
                        alt={`${profileData.name} - professional headshot`} 
                        className="w-56 h-56 rounded-full object-cover transition-all duration-300 shadow-[0_0_0_4px_#FFF] dark:shadow-[0_0_0_4px_#141414] group-hover:shadow-[0_0_25px_rgba(0,0,0,0.1),_0_0_0_6px_rgba(229,231,235,0.5)] dark:group-hover:shadow-[0_0_25px_rgba(224,224,224,0.3),_0_0_0_6px_rgba(160,160,160,0.5)]" 
                    />
                    <div className="absolute bottom-5 right-5 w-5 h-5 bg-status-green rounded-full border-2 border-white dark:border-mono-dark animate-breathing transition-colors duration-500" title="Available for hire"></div>
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center lg:text-left transition-colors duration-500">{profileData.name}</h1>
            <h2 className="text-md text-gray-800 dark:text-mono-white font-semibold mb-4 text-center lg:text-left transition-colors duration-500">{profileData.title}</h2>
            <p className="text-gray-600 dark:text-mono-light text-sm mb-8 text-center lg:text-left transition-colors duration-500">{profileData.bio}</p>
            <div className="flex justify-center lg:justify-start gap-4 mb-8 w-full">
              <a href={profileData.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-mono-mid rounded-full text-gray-500 dark:text-mono-light hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(224,224,224,0.2)]" aria-label="Facebook profile">
                <FacebookIcon />
              </a>
              <a href={profileData.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-mono-mid rounded-full text-gray-500 dark:text-mono-light hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(224,224,224,0.2)]" aria-label="Instagram profile">
                <InstagramIcon />
              </a>
              <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-mono-mid rounded-full text-gray-500 dark:text-mono-light hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(224,224,224,0.2)]" aria-label="LinkedIn profile">
                <LinkedinIcon />
              </a>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onAboutClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-mono-mid text-gray-600 dark:text-mono-light font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:text-black dark:hover:text-white hover:shadow-lg dark:hover:shadow-black/50"
                >
                    <InfoIcon />
                    <span>About Me</span>
                </button>
                <a href="/saiful-alam-rafi-cv.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-mono-light dark:to-mono-white text-white dark:text-mono-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-[0_5px_20px_rgba(107,114,128,0.2)] hover:shadow-[0_8px_30px_rgba(55,65,81,0.2)] dark:shadow-[0_5px_20px_rgba(160,160,160,0.2)] dark:hover:shadow-[0_8px_30px_rgba(224,224,224,0.2)]">
                    <DownloadIcon />
                    <span>Download CV</span>
                </a>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);