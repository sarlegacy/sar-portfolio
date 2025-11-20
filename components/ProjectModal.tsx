
import React, { useRef } from 'react';
import { Project } from '../types';
import { XIcon, ExternalLinkIcon, CodeIcon } from './icons/Icons';
import { useFocusTrap } from './hooks/useFocusTrap';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap({
        trapRef: modalRef,
        isActive: !!project,
        onDeactivate: onClose
    });

    if (!project) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-mono-dark/90 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-mono-mid w-full max-w-3xl shadow-2xl shadow-black/50 relative overflow-hidden flex flex-col max-h-[90vh] animate-stagger-in"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
               <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-10"
                    aria-label="Close modal"
                >
                    <XIcon />
                </button>

                <div className="w-full aspect-video relative flex-shrink-0">
                     <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h2>
                    </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-brand-green/10 text-brand-green text-sm font-semibold px-3 py-1 rounded-full border border-brand-green/20">{tag}</span>
                        ))}
                    </div>

                    <p className="text-gray-600 dark:text-mono-light text-lg leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                         {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-green text-mono-black font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all shadow-[0_5px_15px_rgba(160,219,36,0.3)] group"
                            >
                                <ExternalLinkIcon /> 
                                <span>Live Demo</span>
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-200 dark:bg-mono-mid text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-mono-mid/80 transition-all"
                            >
                                <CodeIcon /> 
                                <span>Source Code</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal;
