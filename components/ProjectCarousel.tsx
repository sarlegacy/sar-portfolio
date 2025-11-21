
import React, { useRef } from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface ProjectCarouselProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of container width
            const targetScroll = direction === 'left' 
                ? current.scrollLeft - scrollAmount 
                : current.scrollLeft + scrollAmount;

            current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group">
            {/* Left Navigation Button */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full bg-white dark:bg-mono-mid shadow-lg text-gray-600 dark:text-white border border-gray-200 dark:border-mono-light/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-green hover:text-mono-black disabled:opacity-0 hidden md:block"
                aria-label="Scroll left"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Scroll Container */}
            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-2 scrollbar-hide"
            >
                {projects.map((project, index) => (
                    <div 
                        key={project.id} 
                        className="snap-center shrink-0 w-[85vw] sm:w-[400px]"
                    >
                        <ProjectCard 
                            project={project} 
                            index={index} 
                            onClick={onProjectClick} 
                        />
                    </div>
                ))}
                {/* Spacer to ensure last item has margin */}
                <div className="w-2 shrink-0"></div>
            </div>

             {/* Right Navigation Button */}
             <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full bg-white dark:bg-mono-mid shadow-lg text-gray-600 dark:text-white border border-gray-200 dark:border-mono-light/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-green hover:text-mono-black hidden md:block"
                aria-label="Scroll right"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
            
            {/* Mobile Swipe Hint overlay (optional, for UX) */}
            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                 {projects.map((_, i) => (
                     <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20"></div>
                 ))}
            </div>
        </div>
    );
};

export default ProjectCarousel;
