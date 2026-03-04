"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Foreword = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        if (!containerRef.current || !textRef.current) return;

        // Ink settling effect: slighly blurry and transparent resolving to sharp
        gsap.fromTo(textRef.current,
            {
                opacity: 0,
                filter: 'blur(2px)',
                y: 20
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%", // Triggers when the top of the foreword hits 75% down the viewport
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                position: 'relative',
                paddingTop: '4rem',
            }}
        >
            {/* Chapter Number / Meta */}
            <div
                className="small-caps"
                style={{
                    fontFamily: 'var(--font-fell), serif',
                    fontSize: '0.8rem',
                    color: 'var(--ink-faded)',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    width: '100%',
                    borderBottom: '1px solid var(--paper-dark)',
                    paddingBottom: '1rem',
                }}
            >
                Caput I. &mdash; Foreword
            </div>

            <div
                ref={textRef}
                style={{
                    fontFamily: 'var(--font-lora), serif',
                    maxWidth: 'var(--max-width-text)',
                    width: '100%',
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                }}
            >
                <p>
                    <span
                        className="ligatures"
                        style={{
                            fontFamily: 'var(--font-garamond), serif',
                            float: 'left',
                            fontSize: '4.5rem',
                            lineHeight: '0.8',
                            marginRight: '0.5rem',
                            color: 'var(--ink-red)',
                        }}
                    >
                        I
                    </span>
                    n an era defined by fleeting illuminated pixels and ephemeral interfaces, there remains an enduring power in the tactile, the deliberate, and the crafted. My work exists at the intersection of modern engineering precision and the timeless aesthetic principles of classical print.
                </p>

                <p>
                    I am a specialized front-end engineer and designer, focusing on constructing digital experiences that do not merely present information, but embed it within a narrative atmosphere. I believe that code can be as expressive as ink, and that performance and accessibility are the binding threads of any robust composition.
                </p>

                <p>
                    This archive serves as a repository of selected works, experiments in motion, and reflections on the craft. Proceed with the understanding that every detail—every margin, shadow, and ligature—has been set with intent.
                </p>

                {/* Marginalia Note Container (absolute positioned on larger screens) */}
                <aside
                    className="small-caps hidden md:block"
                    style={{
                        position: 'absolute',
                        right: '-12vw',
                        top: '30%',
                        width: '10vw',
                        fontFamily: 'var(--font-fell), serif',
                        fontSize: '0.8rem',
                        color: 'var(--ink-red)',
                        textAlign: 'left',
                        lineHeight: 1.4,
                        opacity: 0.8,
                        borderLeft: '1px solid var(--ink-red)',
                        paddingLeft: '0.5rem',
                    }}
                >
                    * A note on intent: the medium shapes the message.
                </aside>
            </div>
        </section>
    );
};

export default Foreword;
