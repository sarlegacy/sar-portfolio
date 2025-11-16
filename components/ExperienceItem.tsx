import React from 'react';
import { ExperienceItem as ExperienceItemType } from '../types';

interface ExperienceItemProps {
    item: ExperienceItemType;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ item }) => {
    return (
        <div className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[2.1rem] top-1 w-4 h-4 bg-gray-200 dark:bg-mono-mid rounded-full border-2 border-gray-400 dark:border-mono-light transition-all duration-300 group-hover:bg-gray-800 dark:group-hover:bg-mono-white group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_0_20px_rgba(224,224,224,0.7)]"></div>
            <div className="bg-white dark:bg-mono-dark p-6 rounded-2xl border border-gray-200 dark:border-mono-mid transition-all duration-300 hover:border-gray-300 dark:hover:border-mono-light/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(224,224,224,0.05)] hover:-translate-y-1">
                <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
                    <div className="flex items-center gap-4">
                        {item.logo && (
                            <div className="bg-gray-100 dark:bg-mono-black p-2 rounded-md flex-shrink-0 transition-colors duration-500">
                                <img src={item.logo} alt={`${item.company} logo`} className="w-8 h-8 object-contain" />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-500">{item.role}</h3>
                            <p className="text-md font-semibold text-gray-800 dark:text-mono-white transition-colors duration-500">{item.company}</p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-mono-light flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 transition-colors duration-500">{item.duration}</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 dark:text-mono-light space-y-2 text-sm pl-1 transition-colors duration-500">
                   {item.description.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default React.memo(ExperienceItem);