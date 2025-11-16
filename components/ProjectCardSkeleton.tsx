import React from 'react';

const ProjectCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-mono-dark rounded-2xl border border-gray-200 dark:border-mono-mid overflow-hidden flex flex-col relative">
            {/* Skeleton structure */}
            <div className="aspect-video bg-gray-200 dark:bg-mono-mid"></div>
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-mono-mid rounded-md mb-3"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-mono-mid rounded-md mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-mono-mid rounded-md mb-4"></div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-mono-mid rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-mono-mid rounded-full"></div>
                </div>
            </div>

            {/* Shimmer effect overlay */}
            <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/10 dark:via-mono-black/10 to-transparent animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
            ></div>
        </div>
    );
};

export default ProjectCardSkeleton;