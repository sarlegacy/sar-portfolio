import React from 'react';
import TiltCard from './TiltCard';

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const SectionCard: React.FC<SectionCardProps> = React.memo(({ title, children, className = '' }) => (
    <TiltCard>
        <div className={`bg-gray-50 dark:bg-mono-dark p-8 rounded-2xl border border-gray-200/50 dark:border-mono-mid h-full transition-all duration-500 flex flex-col hover:border-brand-green/30 dark:hover:border-brand-green/20 hover:shadow-xl hover:shadow-brand-green/5 hover:-translate-y-1 group/section ${className}`}>
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500 group-hover/section:text-brand-green/80 dark:group-hover/section:text-brand-green">
                {title}
            </h3>
            {children}
        </div>
    </TiltCard>
));

export default SectionCard;