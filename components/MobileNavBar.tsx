
import React from 'react';
import { View } from '../types';
import { HomeIcon, WebAppIcon, BriefcaseIcon, StrategyIcon, MailIcon } from './icons/Icons';

interface MobileNavBarProps {
    visibleSection: View;
    onNavClick: (view: View) => void;
}

const NAV_ITEMS = [
    { view: 'home' as View, icon: HomeIcon, label: 'Home' },
    { view: 'projects' as View, icon: WebAppIcon, label: 'Work' },
    { view: 'experience' as View, icon: BriefcaseIcon, label: 'Exp' },
    { view: 'tracking' as View, icon: StrategyIcon, label: 'Track' },
    { view: 'contact' as View, icon: MailIcon, label: 'Me' },
] as const;

const MobileNavBar: React.FC<MobileNavBarProps> = ({ visibleSection, onNavClick }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md safe-area-pb">
            <div className="bg-white/80 dark:bg-mono-mid/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-black/10 dark:shadow-black/40 flex justify-between items-center px-2 py-2">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = visibleSection === item.view;
                    return (
                        <button
                            key={item.view}
                            onClick={() => onNavClick(item.view)}
                            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group focus:outline-none ${
                                isActive 
                                ? 'bg-brand-green text-mono-black shadow-[0_0_15px_rgba(160,219,36,0.4)]' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}
                            aria-label={item.label}
                        >
                            <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(MobileNavBar);
