
import { useState, useRef, useMemo, useEffect } from 'react';

export const useTilt = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1, translateY: 0, brightness: 1 });
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Disable tilt on touch devices to avoid interfering with scrolling
        setIsDisabled(window.matchMedia('(hover: none)').matches);
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current || isDisabled) return;
        
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateX = ((y / height) - 0.5) * -15; // Max 7.5deg rotation
        const rotateY = ((x / width) - 0.5) * 15; // Max 7.5deg rotation
        
        setTransform({ rotateX, rotateY, scale: 1.05, translateY: -5, brightness: 1.1 });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1, translateY: 0, brightness: 1 });
    };

    useEffect(() => {
        const currentRef = ref.current;
        if (currentRef && !isDisabled) {
            currentRef.addEventListener('mousemove', handleMouseMove);
            currentRef.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousemove', handleMouseMove);
                currentRef.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isDisabled]);


    const style = useMemo(() => ({
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale}) translateY(${transform.translateY}px)`,
        filter: `brightness(${transform.brightness})`,
        transition: 'transform 0.2s ease-out, filter 0.2s ease-out',
    }), [transform]);

    return { ref, style };
};
