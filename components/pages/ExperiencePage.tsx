
import React, { useRef, useEffect } from 'react';
import { experienceData, organizationsData, educationData } from '../../constants';
import StaggeredList from '../StaggeredList';
import ExperienceItem from '../ExperienceItem';
import { useScrollContainer } from '../context/ScrollContext';
import TiltCard from '../TiltCard';

const ExperiencePage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const { scrollContainerRef } = useScrollContainer();

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);

            rafId.current = requestAnimationFrame(() => {
                if (!sectionRef.current || !progressRef.current) return;
                
                const { top: sectionTop, height: sectionHeight } = sectionRef.current.getBoundingClientRect();
                const { height: containerHeight } = scrollContainer.getBoundingClientRect();
                
                const visibleHeight = containerHeight - sectionTop;
                let progress = Math.max(0, Math.min(1, visibleHeight / sectionHeight));
                
                progressRef.current.style.transform = `scaleY(${progress})`;
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [scrollContainerRef]);

    return (
        <section ref={sectionRef} id="experience" className="min-h-screen lg:h-full snap-start flex flex-col p-2 section-container">
             <div className="flex-grow flex flex-col lg:overflow-y-auto overflow-visible py-4 pr-2">
                
                {/* Header */}
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8 flex-shrink-0 section-title transition-colors duration-500">Professional Journey</h2>
                
                {/* Organizations Grid (New) */}
                <div className="mb-12">
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-1">Organizations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {organizationsData.map((org) => (
                            <TiltCard key={org.id} className="h-full">
                                <div className="bg-white dark:bg-mono-mid p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center text-center h-full hover:border-brand-green/30 transition-all hover:shadow-md group">
                                    <img src={org.logo} alt={org.name} className="w-12 h-12 object-contain mb-3 grayscale group-hover:grayscale-0 transition-all" />
                                    <h4 className="font-bold text-gray-800 dark:text-white text-sm">{org.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{org.role}</p>
                                    <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full mt-2 text-gray-600 dark:text-gray-300">{org.duration}</span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-12 flex-grow">
                     <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6 ml-1">Career Timeline</h3>
                    <div className="relative pl-6 sm:pl-8 md:pl-10">
                      <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-brand-grey rounded-full transition-colors duration-500">
                         <div ref={progressRef} className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-brand-green to-brand-blue rounded-full origin-top" style={{ transform: 'scaleY(0)' }}></div>
                      </div>
                      <StaggeredList className="space-y-12">
                          {experienceData.map((item) => (
                              <ExperienceItem key={item.id} item={item} />
                          ))}
                      </StaggeredList>
                    </div>
                </div>

                {/* Education Section (New) */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-1">Education</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {educationData.map((edu) => (
                            <div key={edu.id} className="bg-gray-50 dark:bg-mono-mid/50 p-6 rounded-xl border-l-4 border-brand-green flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white dark:hover:bg-mono-mid transition-colors">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{edu.institution}</h4>
                                    <p className="text-brand-green font-medium">{edu.degree}</p>
                                    {edu.description && <p className="text-sm text-gray-500 mt-1">{edu.description}</p>}
                                </div>
                                <span className="text-sm font-mono font-bold text-gray-400 bg-white dark:bg-black/20 px-3 py-1 rounded-lg whitespace-nowrap">{edu.year}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperiencePage;