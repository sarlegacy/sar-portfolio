import React, { useRef, useEffect } from 'react';
import SkillCarousel from '../SkillCarousel';
import { skillsData, profileData, servicesData } from '../../constants';
import StaggeredList from '../StaggeredList';
import TiltCard from '../TiltCard';
import ServiceCard from '../ServiceCard';

const SpotlightCard: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
            cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
        };

        const currentRef = cardRef.current;
        currentRef?.addEventListener('mousemove', handleMouseMove);
        return () => currentRef?.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return <div ref={cardRef} className="relative spotlight-card h-full">{children}</div>;
}


const HomePage = () => {
    const typingText = "An Entrepreneur & Software Developer.";
    return (
        <section id="home" className="h-full snap-start flex flex-col justify-center p-2 section-container is-visible">
            <div className="h-full flex flex-col gap-8 overflow-y-auto py-4 pr-2">
                <StaggeredList>
                    <TiltCard>
                        <SpotlightCard>
                            <div className="bg-white dark:bg-mono-dark p-8 rounded-2xl border border-gray-200 dark:border-mono-mid h-full transition-colors duration-500">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">
                                    Hi, I'm {profileData.name.split(' ')[0]}.
                                    <br />
                                    <span 
                                        className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-r-gray-800 dark:border-r-mono-white pr-1 align-bottom animate-typing transition-colors duration-500"
                                        style={{ width: `${typingText.length}ch` }}
                                    >
                                        {typingText}
                                    </span>
                                </h2>
                                <p className="text-gray-600 dark:text-mono-light max-w-2xl opacity-0 transition-colors duration-500" style={{ animation: 'fadeIn 1s ease-out 3.5s forwards' }}>
                                    I build innovative digital solutions and lead projects from concept to completion. With a diverse skill set in technology, marketing, and management, I turn ambitious ideas into successful realities.
                                </p>
                            </div>
                        </SpotlightCard>
                    </TiltCard>

                    <TiltCard>
                        <div className="bg-white dark:bg-mono-dark p-8 rounded-2xl border border-gray-200 dark:border-mono-mid h-full transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">What I Do</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {servicesData.map((service, index) => (
                                    <ServiceCard key={index} service={service} />
                                ))}
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard>
                        <div className="bg-white dark:bg-mono-dark p-8 rounded-2xl border border-gray-200 dark:border-mono-mid h-full transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">My Skills</h3>
                            <SkillCarousel data={skillsData} />
                        </div>
                    </TiltCard>
                </StaggeredList>
            </div>
        </section>
    )
};

export default HomePage;