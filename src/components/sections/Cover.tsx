"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cover = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Media query check to prevent GSAP animations if reduced motion is requested
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        if (!containerRef.current || !titleRef.current || !subtitleRef.current) return;

        // Ink reveal mask effect on load
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Set initial clip path for ink reveal (hidden)
        gsap.set([titleRef.current, subtitleRef.current], {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            opacity: 0,
            filter: 'blur(4px)'
        });

        // Reveal animation
        tl.to(titleRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            delay: 0.5
        })
            .to(subtitleRef.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5
            }, "-=1.2");

        // Scroll fade out
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(containerRef.current, {
                opacity: 0,
                y: -50,
            })
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <h1
                ref={titleRef}
                className="ligatures"
                style={{
                    fontFamily: 'var(--font-garamond), serif',
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    letterSpacing: '-0.02em',
                    marginBottom: '2rem',
                    lineHeight: 1.1,
                    color: 'var(--ink-main)',
                }}
            >
                Amine Nabou
            </h1>

            <p
                ref={subtitleRef}
                className="small-caps"
                style={{
                    fontFamily: 'var(--font-fell), serif',
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    color: 'var(--ink-faded)',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                Creative Front-End Engineer & Designer
                <br />
                <span style={{ fontSize: '0.8em', marginTop: '1rem', display: 'block' }}>
                    MMXXIV
                </span>
            </p>

            {/* Subtle decorative divider line */}
            <div
                style={{
                    width: '60px',
                    height: '1px',
                    backgroundColor: 'var(--ink-faded)',
                    margin: '3rem auto 0 auto',
                    opacity: 0.5
                }}
            />
        </section>
    );
};

export default Cover;
