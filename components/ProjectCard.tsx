
import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, CodeIcon } from './icons/Icons';
import { useScrollContainer } from './context/ScrollContext';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    
    const [transform, setTransform] = useState({ scale: 1.1, translateY: 0 });
    const rafId = useRef<number | null>(null);
    const { scrollContainerRef } = useScrollContainer();

    const entry = useIntersectionObserver(wrapperRef, { threshold: 0.1, triggerOnce: true });
    const isVisible = !!entry?.isIntersecting;

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;
        if (!scrollContainer) return;

        const updateParallax = () => {
            if (!cardRef.current) return;
            
            const rect = cardRef.current.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            
            if (rect.bottom < containerRect.top - 100 || rect.top > containerRect.bottom + 100) {
                return;
            }

            const cardCenter = rect.top + rect.height / 2;
            const containerCenter = containerRect.top + containerRect.height / 2;
            const delta = cardCenter - containerCenter;
            const speed = -0.15; 
            const newTranslateY = delta * speed;

            setTransform(prev => ({ ...prev, translateY: newTranslateY }));
        };

        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(updateParallax);
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [scrollContainerRef]);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleMouseEnter = () => setTransform(prev => ({ ...prev, scale: 1.15 }));
    const handleMouseLeave = () => setTransform(prev => ({ ...prev, scale: 1.1 }));

    const linkClasses = "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300";

    return (
        <div 
            ref={wrapperRef}
            className={`transition-all duration-700 ${isVisible ? 'animate-stagger-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
                animationDelay: `${(index % 4) * 150}ms`,
                animationFillMode: 'backwards' 
            }}
        >
            <div 
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => onClick(project)}
                className="relative spotlight-card bg-white dark:bg-mono-mid rounded-2xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-white/5"
            >
                <div className="aspect-[4/3] md:aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 will-change-transform" 
                        style={{ 
                            transform: `scale(${transform.scale}) translateY(${transform.translateY}px)` 
                        }}
                    />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10 bg-white dark:bg-mono-mid transition-colors duration-500">
                    <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500 group-hover:text-brand-green leading-tight">
                        {project.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 4).map(tag => (
                            <span key={tag} className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                                <ExternalLinkIcon /> Live
                            </a>
                        )}
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                                <CodeIcon /> Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);
