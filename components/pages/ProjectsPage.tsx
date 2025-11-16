import React, { useState, useMemo } from 'react';
import { projectsData } from '../../constants';
import ProjectCard from '../ProjectCard';
import StaggeredList from '../StaggeredList';

const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projectsData.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') {
            return projectsData;
        }
        return projectsData.filter(p => p.tags.includes(activeFilter));
    }, [activeFilter]);

    return (
        <section id="projects" className="h-full snap-start flex flex-col p-2 section-container">
            <div className="flex-grow flex flex-col overflow-y-auto py-4 pr-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex-shrink-0 section-title transition-colors duration-500">Projects</h2>
                
                <div className="flex flex-wrap gap-2 mb-8 flex-shrink-0">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                                activeFilter === tag 
                                ? 'bg-gray-800 text-white dark:bg-mono-white dark:text-mono-black shadow-md' 
                                : 'bg-gray-200 text-gray-600 dark:bg-mono-mid dark:text-mono-light hover:bg-gray-300 dark:hover:bg-mono-mid/70 hover:text-gray-900 dark:hover:text-mono-white'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="flex-grow overflow-y-auto">
                    <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </StaggeredList>
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;