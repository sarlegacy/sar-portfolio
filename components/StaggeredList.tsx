import React from 'react';

interface StaggeredListProps {
    // FIX: Changed type from `React.ReactNode[]` to `React.ReactNode` to allow a single child.
    // This resolves the type error in `ContactPage.tsx` where StaggeredList was used with a single child component.
    children: React.ReactNode;
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