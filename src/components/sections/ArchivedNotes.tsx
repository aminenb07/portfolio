"use client";

import { ExternalLink } from 'lucide-react';

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
    return (
        <div
            style={{
                paddingTop: '4rem',
                paddingBottom: '8rem',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        className="card-shadow"
                        data-cursor="active"
                        data-sound="hover"
                        style={{
                            backgroundColor: 'white',
                            padding: '4rem 3rem 3rem 3rem',
                            position: 'relative',
                            borderRadius: '1px',
                            transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)`,
                        }}
                    >
                        {/* Washi Tape / Paper Strip effect */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-15px',
                                left: idx % 2 === 0 ? '15%' : '75%',
                                width: '70px',
                                height: '28px',
                                background: 'rgba(232, 223, 209, 0.3)',
                                border: '1px solid rgba(0,0,0,0.03)',
                                backdropFilter: 'blur(1px)',
                                transform: `rotate(${idx % 2 === 0 ? 3 : -3}deg)`,
                                zIndex: 10,
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
                                marginBottom: '2.5rem',
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
                                            fontSize: '0.75rem',
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
                                className="ink-underline ligatures"
                                data-cursor="active"
                                data-sound="hover"
                                data-sound-click="true"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: 'var(--font-fell), serif',
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.1em',
                                    color: 'var(--ink-red)',
                                }}
                            >
                                View Manifest <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivedNotes;
