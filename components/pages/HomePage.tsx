import React, { useRef } from 'react';
import { skillsData, servicesData, testimonialsData, startupsData } from '../../constants';
import ServiceCard from '../ServiceCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import TestimonialCard from '../TestimonialCard';
import BubbleChart from '../charts/BubbleChart';
import SectionCard from '../SectionCard';
import StartupCard from '../StartupCard';

const HomePage: React.FC = () => {
    const servicesRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const startupsRef = useRef<HTMLDivElement>(null);

    // Intersection Observers
    const servicesEntry = useIntersectionObserver(servicesRef, { threshold: 0.1, triggerOnce: true });
    const isServicesVisible = !!servicesEntry?.isIntersecting;

    const skillsEntry = useIntersectionObserver(skillsRef, { threshold: 0.1, triggerOnce: true });
    const isSkillsVisible = !!skillsEntry?.isIntersecting;

    const testimonialsEntry = useIntersectionObserver(testimonialsRef, { threshold: 0.1, triggerOnce: true });
    const isTestimonialsVisible = !!testimonialsEntry?.isIntersecting;

    const startupsEntry = useIntersectionObserver(startupsRef, { threshold: 0.1, triggerOnce: true });
    const isStartupsVisible = !!startupsEntry?.isIntersecting;
    
    return (
        <section id="home" className="min-h-screen lg:h-full snap-start flex flex-col justify-center p-2 section-container">
            <div className="flex-grow flex flex-col gap-8 lg:overflow-y-auto overflow-visible py-4 pr-2">
                
                {/* Startups Section */}
                <div
                    ref={startupsRef}
                    className={`${isStartupsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}
                >
                    <SectionCard title="My Startups">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {startupsData.map((startup, index) => (
                                <div 
                                    key={startup.id}
                                    className={isStartupsVisible ? 'animate-stagger-in' : 'opacity-0'}
                                    style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
                                >
                                    <StartupCard startup={startup} />
                                </div>
                            ))}
                         </div>
                    </SectionCard>
                </div>

                {/* Services Section - Staggered Animation */}
                <div 
                    ref={servicesRef} 
                    className={`${isServicesVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}
                >
                    <SectionCard title="What I Do">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {servicesData.map((service, index) => (
                                <div 
                                    key={index}
                                    className={isServicesVisible ? 'animate-stagger-in' : 'opacity-0'}
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                                >
                                    <ServiceCard service={service} />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* Skills Section */}
                <div 
                    ref={skillsRef}
                    className={`${isSkillsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}
                >
                    <SectionCard title="My Skills">
                         <div className="w-full h-[400px] sm:h-[450px]">
                            <BubbleChart data={skillsData} />
                        </div>
                    </SectionCard>
                </div>

                {/* Testimonials Section - Staggered Animation */}
                <div 
                    ref={testimonialsRef}
                    className={`${isTestimonialsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}
                >
                    <SectionCard title="What My Clients Say">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                            {testimonialsData.map((testimonial, index) => (
                                <div 
                                    key={testimonial.id}
                                    className={isTestimonialsVisible ? 'animate-stagger-in' : 'opacity-0'}
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>
        </section>
    )
};

export default HomePage;