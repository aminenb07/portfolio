"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        category: 'I. Languages',
        items: [
            { name: 'JavaScript / TypeScript', level: 'Expert' },
            { name: 'HTML5 & CSS3', level: 'Mastery' },
            { name: 'Python', level: 'Journeyman' }
        ]
    },
    {
        category: 'II. Arcana (Frameworks)',
        items: [
            { name: 'React & Next.js', level: 'Expert' },
            { name: 'Vue.js', level: 'Proficient' },
            { name: 'Node.js', level: 'Proficient' }
        ]
    },
    {
        category: 'III. Motion & Illusion',
        items: [
            { name: 'GSAP', level: 'Expert' },
            { name: 'Three.js / WebGL', level: 'Novice' },
            { name: 'Framer Motion', level: 'Proficient' }
        ]
    },
    {
        category: 'IV. Draftsmanship',
        items: [
            { name: 'Figma Prototyping', level: 'Expert' },
            { name: 'Interaction Design', level: 'Advanced' },
            { name: 'Typography & Layout', level: 'Mastery' }
        ]
    },
];

const SkillsIndex = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRefs = useRef<(HTMLUListElement | null)[]>([]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        if (!containerRef.current) return;

        listRefs.current.forEach((list, index) => {
            if (!list) return;

            gsap.fromTo(list.children,
                {
                    opacity: 0,
                    x: -15
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: list,
                        start: "top 85%",
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
                minHeight: '80vh',
                paddingTop: '6rem',
                paddingBottom: '4rem',
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                }}
            >
                <span>Caput II. &mdash; Index of Skills</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>p. 02</span>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem 6rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}
            >
                {skillsData.map((section, sectionIdx) => (
                    <div key={section.category}>
                        <h3
                            className="small-caps"
                            style={{
                                fontFamily: 'var(--font-fell), serif',
                                fontSize: '1.2rem',
                                borderBottom: '1px dotted var(--ink-faded)',
                                paddingBottom: '0.5rem',
                                marginBottom: '1.5rem',
                                color: 'var(--ink-main)',
                            }}
                        >
                            {section.category}
                        </h3>

                        <ul
                            ref={(el) => {
                                if (listRefs.current) {
                                    listRefs.current[sectionIdx] = el;
                                }
                            }}
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                fontFamily: 'var(--font-lora), serif',
                                fontSize: '1rem',
                            }}
                        >
                            {section.items.map((item, itemIdx) => (
                                <li
                                    key={item.name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        marginBottom: '0.8rem',
                                        lineHeight: '1.4',
                                    }}
                                >
                                    <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
                                    {/* Dot Leader */}
                                    <span
                                        style={{
                                            flexGrow: 1,
                                            borderBottom: '2px dotted var(--ink-faded)',
                                            height: '1px',
                                            margin: '0 10px',
                                            opacity: 0.3,
                                            position: 'relative',
                                            top: '-4px'
                                        }}
                                    />
                                    <span
                                        className="small-caps"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'var(--font-fell), serif',
                                            color: 'var(--ink-faded)',
                                            fontSize: '0.9em'
                                        }}
                                    >
                                        {item.level}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsIndex;
