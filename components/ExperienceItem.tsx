
import React from 'react';
import { ExperienceItem as ExperienceItemType } from '../types';

interface ExperienceItemProps {
    item: ExperienceItemType;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ item }) => {
    return (
        <div className="relative group">
            {/* Timeline Node - Perfectly centered on the line */}
            <div className="absolute -left-[1.65rem] sm:-left-[2.1rem] top-6 w-4 h-4 rounded-full border-[3px] border-white dark:border-mono-dark bg-gray-300 dark:bg-mono-light transition-all duration-300 ease-out-expo group-hover:bg-brand-green group-hover:scale-125 shadow-md z-10"></div>
            
            <div className="ml-4 sm:ml-6 bg-white dark:bg-mono-mid p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-white/5 transition-all duration-300 ease-out-expo hover:border-brand-green/30 dark:hover:border-brand-green/30 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 group-hover:bg-gray-50 dark:group-hover:bg-mono-mid/80">
                <div className="flex justify-between items-start mb-4 flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-4">
                        {item.logo && (
                            <div className="w-12 h-12 bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center">
                                <img src={item.logo} alt={`${item.company} logo`} className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-brand-green transition-colors duration-300">
                                {item.role}
                            </h3>
                            <p className="font-sans text-sm font-semibold text-gray-500 dark:text-gray-400">
                                {item.company}
                            </p>
                        </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full tracking-wide uppercase whitespace-nowrap">
                        {item.duration}
                    </span>
                </div>
                <ul className="space-y-2.5">
                   {item.description.map((point, i) => (
                       <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 opacity-70"></span>
                           <span>{point}</span>
                       </li>
                   ))}
                </ul>
            </div>
        </div>
    );
};

export default React.memo(ExperienceItem);
