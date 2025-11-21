import React from 'react';
import { useTilt } from './hooks/useTilt';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const { ref, style } = useTilt();
    return (
        <div ref={ref} style={style} className={className} tabIndex={0}>
            {children}
        </div>
    );
};

export default TiltCard;
