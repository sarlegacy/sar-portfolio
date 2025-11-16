import React from 'react';
import { experienceData } from '../../constants';
import StaggeredList from '../StaggeredList';
import ExperienceItem from '../ExperienceItem';

const ExperiencePage = () => {
    return (
        <section id="experience" className="h-full snap-start flex flex-col p-2 section-container">
             <div className="flex-grow flex flex-col overflow-y-auto py-4 pr-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex-shrink-0 section-title transition-colors duration-500">Work Experience</h2>
                <div className="flex-grow overflow-y-auto">
                    <div className="relative pl-8">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-mono-mid rounded-full transition-colors duration-500">
                        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-gray-400 to-gray-200 dark:from-mono-white dark:to-mono-mid rounded-full animate-shimmer opacity-30"></div>
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