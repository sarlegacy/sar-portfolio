import React from 'react';

interface StaggeredListProps {
    children: React.ReactNode[];
    className?: string;
}

const StaggeredList: React.FC<StaggeredListProps> = ({ children, className = "flex flex-col gap-8" }) => {
    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => (
                <div 
                    className="animate-stagger-in"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default StaggeredList;