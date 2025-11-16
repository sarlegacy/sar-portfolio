import React, { useRef, useEffect } from 'react';
import { experienceData } from '../../constants';
import StaggeredList from '../StaggeredList';
import ExperienceItem from '../ExperienceItem';

const ExperiencePage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const scrollContainer = sectionRef.current?.closest('.lg\\:col-span-3');
        if (!scrollContainer) return;

        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);

            rafId.current = requestAnimationFrame(() => {
                if (!sectionRef.current || !progressRef.current) return;
                
                const { top: sectionTop, height: sectionHeight } = sectionRef.current.getBoundingClientRect();
                const { height: containerHeight } = scrollContainer.getBoundingClientRect();
                
                // Calculate how much of the section is visible from the top
                const visibleHeight = containerHeight - sectionTop;
                
                // Calculate progress as a percentage of the section's total height
                let progress = Math.max(0, Math.min(1, visibleHeight / sectionHeight));
                
                progressRef.current.style.transform = `scaleY(${progress})`;
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="h-full snap-start flex flex-col p-2 section-container">
             <div className="flex-grow flex flex-col overflow-y-auto py-4 pr-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex-shrink-0 section-title transition-colors duration-500">Work Experience</h2>
                <div className="flex-grow overflow-y-auto">
                    <div className="relative pl-8">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-mono-mid rounded-full transition-colors duration-500">
                         {/* Progress indicator */}
                         <div ref={progressRef} className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-gray-500 to-gray-800 dark:from-mono-light dark:to-mono-white rounded-full origin-top" style={{ transform: 'scaleY(0)' }}></div>
                      </div>
                      <StaggeredList className="space-y-12">
                          {experienceData.map((item) => (
                              <ExperienceItem key={item.id} item={item} />
                          ))}
                      </StaggeredList>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperiencePage;