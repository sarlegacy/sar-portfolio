
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projectsData, freelanceData } from '../../constants';
import { Project } from '../../types';
import { SearchOffIcon, SearchIcon } from '../icons/Icons';
import ProjectCardSkeleton from '../ProjectCardSkeleton';
import ProjectModal from '../ProjectModal';
import TiltCard from '../TiltCard';
import ProjectCarousel from '../ProjectCarousel';

const ProjectsPage = () => {
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projectsData.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
    }, []);

    const filteredProjects = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return projectsData.filter(p => {
            const matchesTags = activeFilters.length === 0 || activeFilters.every(filter => p.tags.includes(filter));
            const matchesSearch = searchQuery.trim() === '' ||
                p.title.toLowerCase().includes(lowercasedQuery) ||
                p.description.toLowerCase().includes(lowercasedQuery);
            return matchesTags && matchesSearch;
        });
    }, [activeFilters, searchQuery]);

    const handleFilterClick = useCallback((tag: string) => {
        if (tag === 'All') {
            setActiveFilters([]);
            return;
        }
        setActiveFilters(prevFilters => {
            if (prevFilters.includes(tag)) {
                return prevFilters.filter(f => f !== tag);
            } else {
                return [...prevFilters, tag];
            }
        });
    }, []);

    return (
        <section id="projects" className="min-h-screen lg:h-full snap-start flex flex-col p-2 section-container">
            <div className="flex-grow flex flex-col lg:overflow-y-auto overflow-visible py-4 pr-2">
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4 flex-shrink-0 section-title transition-colors duration-500">Projects</h2>
                
                {/* Search and Filter Controls */}
                <div className="mb-6 relative flex-shrink-0 group">
                    <input
                        type="text"
                        placeholder="Search by keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-full bg-white/80 dark:bg-mono-mid/80 backdrop-blur-sm border border-gray-200 dark:border-mono-mid focus:outline-none focus:ring-2 focus:ring-brand-green/50 dark:focus:ring-brand-green/50 focus:border-brand-green text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-mono-light transition-all duration-300 font-sans shadow-sm hover:shadow-md"
                        aria-label="Search projects"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-mono-light transition-colors duration-300 group-focus-within:text-brand-green">
                        <SearchIcon />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 flex-shrink-0">
                    {allTags.map(tag => {
                        const isActive = (tag === 'All' && activeFilters.length === 0) || (tag !== 'All' && activeFilters.includes(tag));
                        return (
                            <button
                                key={tag}
                                onClick={() => handleFilterClick(tag)}
                                className={`font-sans px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green dark:focus-visible:ring-brand-green focus-visible:ring-offset-white dark:focus-visible:ring-offset-mono-dark ${
                                    isActive
                                    ? 'bg-brand-green text-mono-black shadow-lg scale-105' 
                                    : 'bg-gray-200 text-gray-600 dark:bg-mono-mid dark:text-mono-light hover:bg-gray-300 dark:hover:bg-mono-mid/70 hover:text-gray-900 dark:hover:text-mono-white hover:shadow-md hover:scale-105 hover:-translate-y-0.5'
                                }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>

                {/* Main Project Carousel */}
                <div className="mb-12">
                     {loading ? (
                        <div className="flex gap-6 overflow-x-hidden pb-8 px-2">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="shrink-0 w-[85vw] sm:w-[400px]">
                                    <ProjectCardSkeleton />
                                </div>
                            ))}
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <ProjectCarousel 
                            projects={filteredProjects} 
                            onProjectClick={setSelectedProject} 
                        />
                    ) : (
                         <div className="flex flex-col items-center justify-center h-64 text-center py-10 animate-fade-in">
                            <div className="p-4 bg-gray-100 dark:bg-mono-mid rounded-full mb-4 text-gray-500 dark:text-mono-light">
                                <SearchOffIcon className="w-10 h-10" />
                            </div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-mono-white mb-1">No Projects Found</h4>
                            <p className="text-gray-500 dark:text-mono-light">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>

                {/* Freelance & Services Section */}
                {!loading && (
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Freelance & Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {freelanceData.map((freelance) => (
                                <TiltCard key={freelance.id}>
                                    <div className="bg-white dark:bg-mono-mid p-6 rounded-xl border border-gray-200 dark:border-white/5 h-full hover:border-brand-green/30 transition-all hover:shadow-lg flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded uppercase">{freelance.serviceType}</span>
                                            <span className="text-xs font-mono text-gray-400">{freelance.year}</span>
                                        </div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{freelance.title}</h4>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Client: {freelance.client}</p>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{freelance.outcome}"</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default ProjectsPage;
