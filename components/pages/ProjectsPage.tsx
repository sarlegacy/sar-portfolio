
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projectsData } from '../../constants';
import { Project } from '../../types';
import ProjectCard from '../ProjectCard';
import { SearchOffIcon } from '../icons/Icons';
import ProjectCardSkeleton from '../ProjectCardSkeleton';
import ProjectModal from '../ProjectModal';

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);


const ProjectsPage = () => {
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(4); // Increased initial count for larger grids
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulate fetch
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

    useEffect(() => {
        setVisibleCount(4); // Reset on filter/search change
    }, [activeFilters, searchQuery]);

    const projectsToShow = useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

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

                <div className="flex-grow lg:overflow-y-auto overflow-visible">
                     {loading ? (
                        /* Responsive Grid with Breakpoints */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                            {[...Array(4)].map((_, index) => (
                                <ProjectCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <>
                             {/* Responsive Grid with Breakpoints: 1 col mobile, 2 cols tablet/desktop, 3 cols ultrawide */}
                            <div key={`${activeFilters.join('-')}-${searchQuery}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {projectsToShow.map((project, index) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        index={index} 
                                        onClick={setSelectedProject}
                                    />
                                ))}
                            </div>

                             {visibleCount < filteredProjects.length && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 2)}
                                        className="bg-gray-200 dark:bg-mono-mid text-gray-700 dark:text-mono-light font-semibold py-3 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-mono-mid/70 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md active:scale-95"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center py-10 animate-fade-in">
                            <div className="p-4 bg-gray-100 dark:bg-mono-mid rounded-full mb-4 text-gray-500 dark:text-mono-light">
                                <SearchOffIcon className="w-10 h-10" />
                            </div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-mono-white mb-1">No Projects Found</h4>
                            <p className="text-gray-500 dark:text-mono-light">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default ProjectsPage;
