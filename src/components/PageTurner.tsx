"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface PageTurnerProps {
    children: React.ReactNode;
    onPageFlip?: () => void;
}

const PageTurner: React.FC<PageTurnerProps> = ({ children, onPageFlip }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const pages = pagesRef.current.filter((p): p is HTMLDivElement => p !== null);
        if (pages.length === 0 || !containerRef.current) return;

        console.log("Initializing PageTurner with", pages.length, "pages");

        // Clear existing triggers to avoid duplicates on fast-refresh
        ScrollTrigger.getAll().forEach(t => t.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${pages.length * 150}%`, // Longer scroll for slower, more natural feeling
                pin: true,
                scrub: 0.5, // Smoother scrub
                onUpdate: (self) => {
                    // Debug scroll progress
                    if (self.progress > 0 && self.progress < 1) {
                        // console.log("Scroll Progress:", self.progress.toFixed(2));
                    }
                }
            }
        });

        pages.forEach((page, i) => {
            if (i === 0) return; // Page 0 spans beneath the others

            // Initial hide: folded over on the right
            gsap.set(page, {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: i + 1,
                transformOrigin: "left center",
                // Physical reveal state
                clipPath: 'inset(0 0 0 100%)', // Fully hidden on the right
            });

            // Page Reveal Animation
            tl.to(page, {
                clipPath: 'inset(0 0 0 0%)',
                duration: 1,
                ease: "power1.inOut",
                onStart: () => {
                    console.log("Page Turn Sound triggered for page", i);
                    if (onPageFlip) onPageFlip();
                }
            });

            // Shadow on the page being covered
            tl.to(pages[i - 1], {
                filter: 'brightness(0.6)',
                duration: 0.5,
            }, `-=1`);
        });

        // Ensure everything is calculated correctly after a short delay for Next.js hydration
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [children, onPageFlip]);

    const childrenArray = React.Children.toArray(children);

    return (
        <div
            ref={containerRef}
            className="page-turner-container"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: 'var(--paper-base)'
            }}
        >
            {childrenArray.map((child, i) => (
                <div
                    key={i}
                    ref={el => { pagesRef.current[i] = el; }}
                    className={`book-page page-${i}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--paper-base)',
                        zIndex: i + 1,
                        visibility: 'visible',
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default PageTurner;
