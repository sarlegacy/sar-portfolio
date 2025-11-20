
import React, { useRef } from 'react';
import { Skill } from '../types';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

interface SkillCarouselProps {
    data: Skill[];
}

const SkillCarousel: React.FC<SkillCarouselProps> = ({ data }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const entry = useIntersectionObserver(carouselRef, { threshold: 0.5, triggerOnce: true });
    const isVisible = !!entry?.isIntersecting;

    // Sort skills by proficiency
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return (
        <div ref={carouselRef} className="relative -mx-2">
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
                {sortedData.map((skill, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-64 bg-gray-100 dark:bg-mono-dark p-5 rounded-xl border border-gray-200 dark:border-mono-mid transition-colors duration-500"
                    >
                        <div className="flex justify-between items-baseline mb-2">
                            <h4 className="font-display font-bold text-gray-900 dark:text-white transition-colors duration-500 truncate pr-2" title={skill.name}>{skill.name}</h4>
                            <span className="text-sm font-semibold text-gray-500 dark:text-mono-light transition-colors duration-500">{skill.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-mono-mid rounded-full h-2 transition-colors duration-500 overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-brand-green to-brand-blue h-2 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: isVisible ? `${skill.value}%` : '0%', transitionDelay: `${index * 50}ms` }}
                            ></div>
                        </div>
                    </div>
                ))}
                 <div className="flex-shrink-0 w-px"></div> {/* Spacer to ensure last item is not clipped by gradient */}
            </div>
             {/* Gradient overlays for fading effect */}
            <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-white dark:from-mono-dark via-white dark:via-mono-dark to-transparent pointer-events-none"></div>
            <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-white dark:from-mono-dark via-white dark:via-mono-dark to-transparent pointer-events-none"></div>
        </div>
    );
};

export default SkillCarousel;