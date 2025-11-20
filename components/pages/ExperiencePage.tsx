
import React, { useRef, useEffect } from 'react';
import { experienceData } from '../../constants';
import StaggeredList from '../StaggeredList';
import ExperienceItem from '../ExperienceItem';
import { useScrollContainer } from '../context/ScrollContext';

const ExperiencePage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const { scrollContainerRef } = useScrollContainer();

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            // Use requestAnimationFrame to avoid layout thrashing and ensure smooth animations.
            if (rafId.current) cancelAnimationFrame(rafId.current);

            rafId.current = requestAnimationFrame(() => {
                if (!sectionRef.current || !progressRef.current) return;
                
                const { top: sectionTop, height: sectionHeight } = sectionRef.current.getBoundingClientRect();
                const { height: containerHeight } = scrollContainer.getBoundingClientRect();
                
                // Calculate how much of the section is visible from the top of the viewport.
                const visibleHeight = containerHeight - sectionTop;
                
                // Calculate scroll progress as a percentage (0 to 1) of the section's total height.
                // The value is clamped between 0 and 1.
                let progress = Math.max(0, Math.min(1, visibleHeight / sectionHeight));
                
                // Apply the calculated progress to the vertical scale of the progress bar.
                progressRef.current.style.transform = `scaleY(${progress})`;
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [scrollContainerRef]);

    return (
        <section ref={sectionRef} id="experience" className="min-h-screen lg:h-full snap-start flex flex-col p-2 section-container">
             <div className="flex-grow flex flex-col lg:overflow-y-auto overflow-visible py-4 pr-2">
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8 flex-shrink-0 section-title transition-colors duration-500">Work Experience</h2>
                <div className="flex-grow lg:overflow-y-auto overflow-visible">
                    {/* Increased left padding to ensure timeline fits on mobile */}
                    <div className="relative pl-6 sm:pl-8 md:pl-10">
                      {/* Timeline line */}
                      <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-brand-grey rounded-full transition-colors duration-500">
                         {/* Progress indicator */}
                         <div ref={progressRef} className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-brand-green to-brand-blue rounded-full origin-top" style={{ transform: 'scaleY(0)' }}></div>
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
