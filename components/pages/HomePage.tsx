
import React, { useRef } from 'react';
import { skillsData, servicesData, testimonialsData } from '../../constants';
import StaggeredList from '../StaggeredList';
import TiltCard from '../TiltCard';
import ServiceCard from '../ServiceCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import TestimonialCard from '../TestimonialCard';

const HomePage: React.FC = () => {
    const skillsRef = useRef<HTMLDivElement>(null);
    const entry = useIntersectionObserver(skillsRef, { threshold: 0.5, triggerOnce: true });
    const isVisible = !!entry?.isIntersecting;
    
    // Dynamically select the top 4 skills to display, making the component more maintainable.
    const skillsToShow = [...skillsData].sort((a, b) => b.value - a.value).slice(0, 4);

    return (
        <section id="home" className="min-h-screen lg:h-full snap-start flex flex-col justify-center p-2 section-container">
            <div className="flex-grow flex flex-col gap-8 lg:overflow-y-auto overflow-visible py-4 pr-2">
                <StaggeredList>
                    <TiltCard>
                        <div className="bg-gray-50 dark:bg-mono-dark p-8 rounded-2xl border border-gray-200/50 dark:border-mono-mid h-full transition-colors duration-500">
                            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">What I Do</h3>
                            {/* Services Grid: 1 col on mobile, 2 on small-desktop, 3 on large screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {servicesData.map((service, index) => (
                                    <ServiceCard key={index} service={service} />
                                ))}
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard>
                        <div className="bg-gray-50 dark:bg-mono-dark p-8 rounded-2xl border border-gray-200/50 dark:border-mono-mid h-full transition-colors duration-500 flex flex-col">
                            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">My Skills</h3>
                            {/* Skills Grid: 2 cols mobile, 3 tablet, 4 desktop */}
                            <div ref={skillsRef} className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6">
                                {skillsToShow.map((skill, index) => (
                                    <div key={skill.name} className="group cursor-pointer">
                                        <div className="flex justify-between items-baseline mb-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                                            <h4 className="font-semibold text-gray-800 dark:text-mono-white transition-colors duration-300 group-hover:text-brand-green">{skill.name}</h4>
                                            <span className="text-sm font-medium text-gray-500 dark:text-mono-light transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">{skill.value}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-mono-mid rounded-full h-2 transition-all duration-300 overflow-hidden group-hover:shadow-[0_0_12px_rgba(160,219,36,0.4)] border border-transparent group-hover:border-brand-green/20">
                                            <div 
                                                className="bg-gradient-to-r from-brand-green to-brand-blue h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                                                style={{ width: isVisible ? `${skill.value}%` : '0%', transitionDelay: `${index * 100}ms` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard>
                        <div className="bg-gray-50 dark:bg-mono-dark p-8 rounded-2xl border border-gray-200/50 dark:border-mono-mid h-full transition-colors duration-500">
                            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">What My Clients Say</h3>
                            {/* Testimonials Grid: 1 col mobile, 2 cols tablet/desktop, 3 cols ultrawide */}
                            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {testimonialsData.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </TiltCard>
                </StaggeredList>
            </div>
        </section>
    )
};

export default HomePage;
