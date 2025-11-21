
import React from 'react';
import { profileData, experienceData, educationData, skillsData, startupsData } from '../constants';
import { MailIcon, PhoneIcon, ExternalLinkIcon } from './icons/Icons';

const ResumeTemplate: React.FC = () => {
    return (
        <div 
            id="resume-print-view" 
            className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 p-0 max-w-[210mm] mx-auto h-auto min-h-[297mm] shadow-2xl print:shadow-none print:bg-white print:text-black transition-colors duration-300 font-sans text-sm leading-relaxed relative overflow-hidden flex flex-col"
        >
            {/* Decorative Top Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-brand-green to-brand-blue print:bg-black print:from-black print:to-black flex-shrink-0"></div>

            <div className="p-8 sm:p-10 md:p-12 flex-grow">
                {/* Header with Avatar */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 border-b border-gray-200 dark:border-gray-700 print:border-gray-300 pb-8">
                    <div className="flex-1 order-2 md:order-1">
                        <h1 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tight text-gray-900 dark:text-white print:text-black mb-2">
                            {profileData.name}
                        </h1>
                        <p className="text-lg font-medium text-brand-green print:text-gray-800 tracking-wide uppercase mb-5">
                            {profileData.title}
                        </p>
                         <p className="text-gray-600 dark:text-gray-400 print:text-gray-600 max-w-xl text-justify leading-relaxed">
                            {profileData.bio}
                        </p>
                        
                        {/* Contact Info Grid */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                             {profileData.email && (
                                <a href={`mailto:${profileData.email}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 print:text-black hover:text-brand-green transition-colors">
                                    <MailIcon className="w-4 h-4 text-brand-green print:text-black" />
                                    <span className="font-medium">{profileData.email}</span>
                                </a>
                            )}
                            {profileData.phone && (
                                 <a href={`tel:${profileData.phone}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 print:text-black hover:text-brand-green transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-brand-green print:text-black" />
                                    <span className="font-medium">{profileData.phone}</span>
                                </a>
                            )}
                            {profileData.website && (
                                 <a href={`https://${profileData.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 print:text-black hover:text-brand-green transition-colors">
                                    <ExternalLinkIcon />
                                    <span className="font-medium">{profileData.website}</span>
                                </a>
                            )}
                             <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 print:text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 print:bg-gray-400"></span>
                                <span className="font-semibold uppercase text-[10px] tracking-widest">{profileData.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="order-1 md:order-2 flex-shrink-0">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-gray-100 dark:border-gray-800 print:border-gray-200 shadow-lg print:shadow-none relative">
                            <img 
                                src={profileData.avatar} 
                                alt={profileData.name} 
                                className="w-full h-full object-cover"
                            />
                            {/* Print border fix */}
                            <div className="absolute inset-0 border border-black/10 print:block hidden pointer-events-none rounded-2xl"></div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 print:gap-8">
                    
                    {/* Main Column (Experience) */}
                    <div className="md:col-span-8 space-y-10">
                        
                        {/* Experience Section */}
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white print:text-black border-l-4 border-brand-green pl-3 mb-6 flex items-center gap-2">
                                Professional Experience
                            </h3>
                            <div className="space-y-8">
                                {experienceData.map((exp) => (
                                    <div key={exp.id} className="relative break-inside-avoid">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white print:text-black">
                                                {exp.role}
                                            </h4>
                                            <span className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 print:text-gray-600 bg-gray-100 dark:bg-gray-800 print:bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <div className="text-brand-green print:text-gray-800 font-semibold text-sm mb-3">
                                            {exp.company}
                                        </div>
                                        <ul className="space-y-1.5">
                                            {exp.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-gray-600 dark:text-gray-300 print:text-gray-700 text-sm leading-relaxed">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 print:bg-gray-500 flex-shrink-0"></span>
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Side Column (Education, Skills, Startups) */}
                    <div className="md:col-span-4 space-y-10">
                        
                        {/* Skills */}
                         <section className="break-inside-avoid">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white print:text-black border-l-4 border-brand-green pl-3 mb-5">
                                Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillsData.sort((a,b) => b.value - a.value).slice(0, 16).map(skill => (
                                    <span key={skill.name} className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 print:bg-gray-100 text-gray-700 dark:text-gray-300 print:text-black rounded-md">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Startups */}
                        <section className="break-inside-avoid">
                             <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white print:text-black border-l-4 border-brand-green pl-3 mb-5">
                                Entrepreneurship
                            </h3>
                            <div className="space-y-6">
                                {startupsData.map(startup => (
                                    <div key={startup.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white print:text-black">{startup.name}</h4>
                                            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{startup.year.split(' - ')[0]}</span>
                                        </div>
                                        <p className="text-xs text-brand-green print:text-gray-800 font-semibold uppercase mb-1">{startup.role}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 print:text-gray-600 leading-snug">
                                            {startup.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="break-inside-avoid">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white print:text-black border-l-4 border-brand-green pl-3 mb-5">
                                Education
                            </h3>
                            <div className="space-y-4">
                                {educationData.map(edu => (
                                    <div key={edu.id}>
                                        <h4 className="font-bold text-gray-900 dark:text-white print:text-black text-sm">{edu.institution}</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 print:text-gray-700 font-medium">{edu.degree}</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 print:text-gray-500 font-mono mt-0.5">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-black/20 print:bg-transparent p-3 text-center border-t border-gray-100 dark:border-gray-800 print:border-gray-200 mt-auto w-full flex-shrink-0">
                <p className="text-[10px] text-gray-400 dark:text-gray-600 print:text-gray-500 uppercase tracking-widest font-medium">
                    CV • {profileData.name} • {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default ResumeTemplate;
