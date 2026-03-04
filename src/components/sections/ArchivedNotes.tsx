"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "fig-i",
        title: "Project Alpha: E-Commerce",
        figure: "Figure I.",
        date: "A.D. 2023",
        description: "An archival study in fluid commerce dynamics. The architecture relies heavily on Next.js edge caching and a bespoke Three.js product viewer, mimicking the meticulous nature of a watchmaker's catalog.",
        link: "https://example.com/alpha",
        tags: ["Next.js", "Three.js", "Stripe"]
    },
    {
        id: "fig-ii",
        title: "Project Beta: The Reading Room",
        figure: "Figure II.",
        date: "A.D. 2023",
        description: "A spatial interface for consuming long-form literature. Typography was rigorously scaled to a golden ratio scale, and GSAP was employed to simulate the kinetic friction of turning a heavy manuscript page.",
        link: "https://example.com/beta",
        tags: ["React", "GSAP", "Typography"]
    },
    {
        id: "fig-iii",
        title: "Project Gamma: Data Visualizer",
        figure: "Figure III.",
        date: "A.D. 2024",
        description: "Translating raw telemetry into charting forms reminiscent of early 20th-century astronomical mapped data. D3.js paired with an SVG noise filter provided the necessary gravitas.",
        link: "https://example.com/gamma",
        tags: ["Vue", "D3.js", "SVG"]
    }
];

const ArchivedNotes = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            // Slight parallax and rotation on scroll
            gsap.fromTo(card,
                {
                    opacity: 0.5,
                    y: 50,
                    rotation: index % 2 === 0 ? -2 : 2, // Alternate slants like messy stacked papers
                },
                {
                    opacity: 1,
                    y: 0,
                    rotation: index % 2 === 0 ? -0.5 : 0.5, // Settle closer to straight
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1, // Smooth scrubbing
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            style={{
                paddingTop: '6rem',
                paddingBottom: '8rem',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <div
                className="small-caps"
                style={{
                    fontFamily: 'var(--font-fell), serif',
                    fontSize: '0.8rem',
                    color: 'var(--ink-faded)',
                    marginBottom: '6rem',
                    textAlign: 'center',
                    width: '100%',
                    borderBottom: '1px solid var(--paper-dark)',
                    paddingBottom: '1rem',
                }}
            >
                Caput III. &mdash; Archived Notes
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        ref={(el) => {
                            if (cardRefs.current) {
                                cardRefs.current[idx] = el;
                            }
                        }}
                        style={{
                            backgroundColor: 'var(--paper-base)',
                            padding: '3rem',
                            boxShadow: '2px 4px 15px rgba(0,0,0,0.05), border: 1px solid var(--paper-dark)',
                            position: 'relative',
                            borderRadius: '2px', // Slight imperfection
                        }}
                    >
                        {/* Vintage 'Paper Clip' or tape illusion via top border/shadow */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60px',
                                height: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                zIndex: 2,
                            }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                            <span
                                className="small-caps"
                                style={{
                                    fontFamily: 'var(--font-fell), serif',
                                    color: 'var(--ink-red)',
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.1em'
                                }}
                            >
                                {project.figure}
                            </span>
                            <span
                                style={{
                                    fontFamily: 'var(--font-fell), serif',
                                    color: 'var(--ink-faded)',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Date: {project.date}
                            </span>
                        </div>

                        <h3
                            style={{
                                fontFamily: 'var(--font-garamond), serif',
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                color: 'var(--ink-main)',
                            }}
                        >
                            {project.title}
                        </h3>

                        <p
                            style={{
                                fontFamily: 'var(--font-lora), serif',
                                lineHeight: '1.8',
                                color: 'var(--ink-main)',
                                marginBottom: '2rem',
                            }}
                        >
                            {project.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontFamily: 'var(--font-fell), serif',
                                            fontSize: '0.8rem',
                                            fontStyle: 'italic',
                                            color: 'var(--ink-faded)'
                                        }}
                                    >
                                        #{tag.toLowerCase()}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: 'var(--font-fell), serif',
                                    textTransform: 'uppercase',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.1em',
                                    color: 'var(--ink-red)',
                                    borderBottom: '1px solid transparent',
                                    transition: 'border-color 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--ink-red)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                            >
                                View Manifest <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ArchivedNotes;
