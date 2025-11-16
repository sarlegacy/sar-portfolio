import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

// Hook to observe a single element
export const useIntersectionObserver = (
    elementRef: RefObject<Element>,
    {
        threshold = 0.1,
        root = null,
        rootMargin = '0%',
        triggerOnce = false,
    }: IntersectionObserverOptions
): IntersectionObserverEntry | undefined => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || !node) return;

        const observer = new IntersectionObserver(updateEntry, { threshold, root, rootMargin });

        observer.observe(node);

        if (entry?.isIntersecting && triggerOnce) {
            observer.unobserve(node);
        }

        return () => observer.disconnect();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef, JSON.stringify(threshold), root, rootMargin, triggerOnce]);

    return entry;
};

// Hook to observe multiple elements (like sections on a page)
export const useMultiIntersectionObserver = (
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit,
    containerRef: RefObject<HTMLElement>
) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => callback(entry));
        }, options);

        const elements = container.querySelectorAll('section');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, [callback, options, containerRef]);
};