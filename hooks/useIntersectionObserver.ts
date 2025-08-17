import { useState, useEffect, useRef } from 'react';

interface ObserverOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useIntersectionObserver = (options?: ObserverOptions): [React.RefObject<any>, boolean] => {
    const containerRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Destructure options to create stable dependencies for useEffect.
    // This prevents the effect from re-running if a new options object is passed on every render.
    const { threshold = 0.1, triggerOnce = true } = options || {};

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state when element's intersection status changes.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // If triggerOnce is true, unobserve the element after it becomes visible.
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                }
            },
            { threshold }
        );

        observer.observe(element);

        // Cleanup function to disconnect the observer when the component unmounts.
        return () => {
            if (element) {
                observer.disconnect();
            }
        };
    // Use the destructured, stable primitives as dependencies.
    }, [containerRef, threshold, triggerOnce]);

    return [containerRef, isVisible];
};
