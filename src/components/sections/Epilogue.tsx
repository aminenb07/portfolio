"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Epilogue = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        if (!containerRef.current || !letterRef.current) return;

        // Ink settle effect for the letter
        gsap.fromTo(letterRef.current,
            {
                opacity: 0,
                filter: 'blur(3px)',
                scale: 0.98,
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '80vh',
                paddingTop: '6rem',
                paddingBottom: '10rem', // Extra space at bottom of book
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                className="small-caps"
                style={{
                    fontFamily: 'var(--font-fell), serif',
                    fontSize: '0.8rem',
                    color: 'var(--ink-faded)',
                    marginBottom: '4rem',
                    textAlign: 'center',
                    width: '100%',
                    borderBottom: '1px solid var(--paper-dark)',
                    paddingBottom: '1rem',
                }}
            >
                Caput IV. &mdash; The Epilogue
            </div>

            <div
                ref={letterRef}
                style={{
                    fontFamily: 'var(--font-lora), serif',
                    maxWidth: '600px',
                    width: '100%',
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    position: 'relative',
                }}
            >
                <p>
                    Should you wish to commission a new volume of work, discuss the minutiae of interaction engineering, or simply correspond regarding the craft, let it be known that my inkwell remains open.
                </p>

                <p>
                    Direct all formal inquiries and missives to the following address:
                </p>

                <div
                    style={{
                        margin: '4rem 0',
                        textAlign: 'center',
                    }}
                >
                    <a
                        href="mailto:hello@example.com"
                        className="ligatures small-caps"
                        style={{
                            fontFamily: 'var(--font-garamond), serif',
                            fontSize: '2rem',
                            color: 'var(--ink-red)',
                            textDecoration: 'none',
                            borderBottom: '1px solid transparent',
                            transition: 'border-color 0.3s ease',
                            padding: '0.5rem 2rem',
                            display: 'inline-block',
                            position: 'relative',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderBottomColor = 'var(--ink-red)';
                            // Simulate a wax stamp press or ink blot scaling
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottomColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        hello@example.com
                        {/* Fake wax stamp/postmark overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-30px',
                                width: '60px',
                                height: '60px',
                                border: '2px solid rgba(139, 58, 58, 0.2)', // Faded red
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                transform: 'rotate(-15deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-fell), serif',
                                fontSize: '0.5rem',
                                color: 'rgba(139, 58, 58, 0.4)',
                                textAlign: 'center',
                                lineHeight: '1',
                            }}
                        >
                            POST<br />APPROVED
                        </div>
                    </a>
                </div>

                <p style={{ textAlign: 'right', marginTop: '4rem' }}>
                    Yours faithfully,
                </p>

                {/* Synthetic Signature */}
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <svg width="200" height="60" viewBox="0 0 200 60" style={{ display: 'inline-block', fill: 'none', stroke: 'var(--ink-main)', strokeWidth: '1.5', strokeLinecap: 'round' }}>
                        <path d="M 20 40 Q 30 10 40 40 T 60 40 Q 80 50 90 20 T 110 40 Q 130 50 140 30 T 160 40 Q 180 20 190 40" strokeDasharray="300" strokeDashoffset="0">
                            <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" fill="freeze" />
                        </path>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Epilogue;
