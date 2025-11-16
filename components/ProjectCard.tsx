import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, CodeIcon } from './icons/Icons';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [imageTransform, setImageTransform] = useState('scale(1.1) translateY(0px)');
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        // The main content area is the scroll container.
        // We find it by traversing up from the cardRef.
        const scrollContainer = cardRef.current?.closest('.lg\\:col-span-3');
        if (!scrollContainer) return;

        const handleScroll = () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            rafId.current = requestAnimationFrame(() => {
                if (!cardRef.current) return;
                
                const { top: cardTop, height: cardHeight } = cardRef.current.getBoundingClientRect();
                const { top: containerTop, height: containerHeight } = scrollContainer.getBoundingClientRect();
                
                // Only run calculations if the card is within the container's viewport.
                if (cardTop > containerTop + containerHeight || cardTop + cardHeight < containerTop) {
                    return;
                }

                // Calculate the card's center relative to the container's center.
                const cardCenter = cardTop + cardHeight / 2;
                const containerCenter = containerTop + containerHeight / 2;
                
                // A value from -1 (card at container top) to 1 (card at container bottom).
                const scrollFactor = (cardCenter - containerCenter) / (containerHeight / 2);

                const parallaxStrength = 15; // Max pixels to translate.
                const newTranslateY = -scrollFactor * parallaxStrength;

                // Update transform, preserving the current scale
                setImageTransform(prev => {
                    // Extract current scale from the previous transform string
                    const scaleMatch = prev.match(/scale\(([^)]+)\)/);
                    const currentScale = scaleMatch ? scaleMatch[1] : '1.1';
                    return `scale(${currentScale}) translateY(${newTranslateY}px)`;
                });
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        setImageTransform(prev => prev.replace(/scale\([^)]+\)/, 'scale(1.15)'));
    };

    const handleMouseLeave = () => {
        setImageTransform(prev => prev.replace(/scale\([^)]+\)/, 'scale(1.1)'));
    };

    const linkClasses = "flex items-center gap-2 rounded-md px-2 py-1 -ml-2 text-sm text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-mono-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800 dark:focus-visible:ring-mono-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-mono-dark";


    return (
        <div 
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-white dark:bg-mono-dark rounded-2xl border border-gray-200 dark:border-mono-mid overflow-hidden flex flex-col group transition-all duration-300 hover:border-gray-300/30 dark:hover:border-mono-light/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_0_30px_rgba(224,224,224,0.07)] hover:-translate-y-2 hover:scale-[1.03]">
            <div className="aspect-video overflow-hidden">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500" 
                    style={{ transform: imageTransform }}
                />
            </div>
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{project.title}</h4>
                <p className="text-gray-600 dark:text-mono-light text-sm sm:text-base leading-relaxed mb-4 transition-colors duration-500">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 dark:bg-mono-mid text-gray-700 dark:text-mono-light text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-500">{tag}</span>
                    ))}
                </div>
                 <div className="flex items-center gap-4 mt-auto">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                            <ExternalLinkIcon /> Live Demo
                        </a>
                    )}
                    {project.repoUrl && (
                         <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                            <CodeIcon /> Source Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);