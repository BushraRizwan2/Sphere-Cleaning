
import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedCardProps {
    children: React.ReactNode;
    animation: string;
    className?: string;
    delay?: number;
    hasHoverLight?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, animation, className = '', delay = 0, hasHoverLight = false }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
    
    // The animation class is now just 'animate-card' if an animation is desired.
    // The specific type of animation is handled globally by CSS to be bottom-to-top.
    const animationClass = animation && animation !== 'none' ? 'animate-card' : '';
    const visibleClass = isVisible ? 'is-visible' : '';
    const hoverClass = hasHoverLight ? 'card-light-hover' : '';

    return (
        <div
            ref={ref}
            className={`${className} ${animationClass} ${visibleClass} ${hoverClass}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default AnimatedCard;
