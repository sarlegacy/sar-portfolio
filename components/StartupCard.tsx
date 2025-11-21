import React from 'react';
import { Startup } from '../types';
import { ExternalLinkIcon } from './icons/Icons';

interface StartupCardProps {
    startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => (
    <div className="bg-white dark:bg-mono-mid p-6 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col h-full transition-all duration-300 ease-out-expo hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-brand-green/40 hover:-translate-y-1 hover:scale-[1.01] group">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <img src={startup.logo} alt={startup.name} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-brand-green transition-colors duration-300">{startup.name}</h4>
                    <p className="text-xs font-semibold text-brand-green uppercase tracking-wide">{startup.role}</p>
                </div>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded border ${startup.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'}`}>
                {startup.status}
            </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow leading-relaxed">{startup.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-white/5 group-hover:border-brand-green/10 transition-colors">
            <span className="text-xs text-gray-400 font-mono">{startup.year}</span>
            {startup.link && (
                <a href={startup.link} className="text-gray-400 hover:text-brand-green transition-colors p-1 hover:bg-brand-green/10 rounded-md">
                    <ExternalLinkIcon />
                </a>
            )}
        </div>
    </div>
);

export default React.memo(StartupCard);