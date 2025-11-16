import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, CodeIcon } from './icons/Icons';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div 
            className="bg-white dark:bg-mono-dark rounded-2xl border border-gray-200 dark:border-mono-mid overflow-hidden flex flex-col group transition-all duration-300 hover:border-gray-300/30 dark:hover:border-mono-light/30 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:scale-[1.03]">
            <div className="h-48 overflow-hidden">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" 
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{project.title}</h4>
                <p className="text-gray-600 dark:text-mono-light text-sm mb-4 flex-grow transition-colors duration-500">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 dark:bg-mono-mid text-gray-700 dark:text-mono-light text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-500">{tag}</span>
                    ))}
                </div>
                 <div className="flex items-center gap-4 mt-auto">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-mono-white transition-colors">
                            <ExternalLinkIcon /> Live Demo
                        </a>
                    )}
                    {project.repoUrl && (
                         <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-mono-white transition-colors">
                            <CodeIcon /> Source Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);