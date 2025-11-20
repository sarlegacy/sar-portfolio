import React from 'react';

const ProjectCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-mono-dark rounded-2xl border border-gray-200 dark:border-mono-mid overflow-hidden flex flex-col relative h-full shadow-sm">
            {/* Skeleton structure matching ProjectCard dimensions */}
            <div className="aspect-[4/3] md:aspect-video bg-gray-100 dark:bg-mono-mid/50 relative overflow-hidden">
            </div>
            
            <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
                {/* Title placeholder */}
                <div className="h-7 w-3/4 bg-gray-200 dark:bg-mono-mid rounded-md mb-4"></div>
                
                {/* Description placeholder - 3 lines to match typical description */}
                <div className="space-y-3 mb-6 flex-grow">
                    <div className="h-4 w-full bg-gray-100 dark:bg-mono-mid/60 rounded-md"></div>
                    <div className="h-4 w-11/12 bg-gray-100 dark:bg-mono-mid/60 rounded-md"></div>
                    <div className="h-4 w-4/5 bg-gray-100 dark:bg-mono-mid/60 rounded-md"></div>
                </div>

                {/* Tags placeholder */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-mono-mid rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-mono-mid rounded-full"></div>
                    <div className="h-6 w-14 bg-gray-200 dark:bg-mono-mid rounded-full"></div>
                </div>

                {/* Links placeholder (Live Demo / Source Code) */}
                <div className="flex items-center gap-4 mt-auto">
                    <div className="h-5 w-24 bg-gray-200 dark:bg-mono-mid rounded-md"></div>
                    <div className="h-5 w-24 bg-gray-200 dark:bg-mono-mid rounded-md"></div>
                </div>
            </div>

            {/* Shimmer effect overlay - Adjusted for better visibility in both themes */}
            <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
            ></div>
        </div>
    );
};

export default ProjectCardSkeleton;