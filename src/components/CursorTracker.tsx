"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CursorTracker() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return; // Do not render custom cursor if reduced motion is preferred

        // Also disable on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Set initial GSAP positions
        gsap.set(dot, { xPercent: -50, yPercent: -50 });
        gsap.set(ring, { xPercent: -50, yPercent: -50 });

        const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

        const xToRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
        const yToRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToRing(e.clientX);
            yToRing(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Basic styling for the cursor parts
    const dotStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '4px',
        height: '4px',
        backgroundColor: 'var(--ink-main)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
    };

    const ringStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--ink-faded)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'transform 0.2s ease, border-radius 0.2s ease, width 0.2s ease, height 0.2s ease',
        ...(isHovering && {
            transform: 'scale(1.5)',
            borderRadius: '2px', // Flattens slightly to look more like an underline or block
            borderColor: 'var(--ink-main)',
            backgroundColor: 'rgba(44, 42, 40, 0.05)'
        })
    };

    // Hide the default cursor in globals.css instead of inline to prevent SSR flicker if preferred,
    // but for simplicity we'll just add it to body when component mounts via global style injection.
    return (
        <>
            <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button { cursor: none; }
        }
      `}</style>
            <div ref={dotRef} style={dotStyle} className="hidden md:block" />
            <div ref={ringRef} style={ringStyle} className="hidden md:block" />
        </>
    );
}
