import React from 'react';
import { profileData } from '../constants';
import { FacebookIcon, InstagramIcon, LinkedinIcon, DownloadIcon, InfoIcon } from './icons/Icons';

interface SidebarProps {
    onAboutClick: () => void;
    onViewResume: () => void;
}

// Moved outside component to avoid recreation on render
const socialLinks = [
    { href: profileData.socials.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: profileData.socials.instagram, icon: InstagramIcon, label: 'Instagram' },
    { href: profileData.socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
];

const Sidebar: React.FC<SidebarProps> = ({ onAboutClick, onViewResume }) => {
    return (
        <aside className="lg:sticky lg:top-4 flex flex-col items-center lg:items-start bg-white dark:bg-mono-dark/60 p-6 sm:p-8 rounded-none sm:rounded-3xl border-b sm:border border-gray-200 dark:border-mono-mid h-auto lg:h-full self-start transition-all duration-300 ease-out-expo hover:border-brand-green/30 dark:hover:border-brand-green/20 shadow-sm sm:hover:shadow-2xl sm:hover:shadow-brand-green/10 dark:hover:shadow-brand-green/5 mb-4 lg:mb-0 z-10 backdrop-blur-md sm:hover:-translate-y-1 print:hidden">
            
            <div className="relative mb-6 sm:mb-8 group w-full flex justify-center lg:justify-start">
                <div className="relative">
                    {/* Decorative glow behind avatar */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-green/40 to-brand-blue/40 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    
                    <img 
                        src={profileData.avatar} 
                        alt={`${profileData.name} - professional headshot`}
                        loading="lazy" 
                        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover border-4 border-white dark:border-mono-dark shadow-xl transition-transform duration-500 group-hover:scale-[1.05] group-hover:rotate-2" 
                    />
                    
                    {/* Live Status Indicator */}
                    <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 flex h-4 w-4 sm:h-5 sm:w-5 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-brand-green border-2 border-white dark:border-mono-dark"></span>
                    </div>
                </div>
            </div>

            <div className="text-center lg:text-left w-full">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 transition-colors duration-500 group-hover:text-brand-green/90 dark:group-hover:text-brand-green">
                    {profileData.name}
                </h1>
                <h2 className="font-sans text-sm sm:text-base font-medium text-brand-green mb-4 tracking-wide uppercase">
                    {profileData.title}
                </h2>
                <p className="text-gray-500 dark:text-mono-light text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                    {profileData.bio}
                </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3 mb-8 w-full">
                {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <a 
                            key={index}
                            href={link.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-3 bg-gray-50 dark:bg-mono-mid rounded-xl text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-mono-mid/50 transition-all duration-200 ease-out hover:-translate-y-1.5 hover:bg-white dark:hover:bg-mono-mid hover:text-brand-green dark:hover:text-brand-green hover:shadow-lg hover:shadow-brand-green/20 hover:border-brand-green/40" 
                            aria-label={`${link.label} profile`}
                        >
                            <Icon />
                        </a>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-row gap-3 sm:gap-4 mt-auto">
                <button
                    onClick={onAboutClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-mono-mid border border-gray-200 dark:border-mono-mid/50 text-gray-700 dark:text-mono-light font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-mono-mid/80 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-mono-light/30 active:scale-95 hover:shadow-md"
                >
                    <InfoIcon className="w-4 h-4" />
                    <span>About</span>
                </button>
                <button 
                    onClick={onViewResume}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-mono-black font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-brand-green dark:hover:bg-brand-green hover:text-mono-black hover:shadow-[0_0_25px_rgba(160,219,36,0.5)] active:scale-95 group hover:-translate-y-0.5"
                >
                    <DownloadIcon />
                    <span>Resume</span>
                </button>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);
