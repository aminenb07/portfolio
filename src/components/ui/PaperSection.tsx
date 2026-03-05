import React, { useEffect, useRef } from "react";
import PageMarker from "@/components/ui/PageMarker";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNotebookShell } from "@/components/layout/NotebookShell";

gsap.registerPlugin(ScrollTrigger);

type PaperSectionProps = {
    id: string;
    pageNumber: string;
    children: React.ReactNode;
};

const PaperSection = ({ id, pageNumber, children }: PaperSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { reduceMotion } = useNotebookShell();

    useEffect(() => {
        if (reduceMotion) return;

        const section = sectionRef.current;
        const content = contentRef.current;
        if (!section || !content) return;

        gsap.fromTo(content,
            {
                opacity: 0,
                y: 15,
                filter: "blur(4px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [reduceMotion]);

    return (
        <section ref={sectionRef} id={id} data-section={id} className="paper-section">
            <div className="paper-divider">
                <span className="paper-divider-line" />
                <PageMarker number={pageNumber} />
                <span className="paper-divider-line" />
            </div>
            <div ref={contentRef} className="paper-section-content">
                {children}
            </div>
            <div className="paper-divider paper-divider-bottom">
                <span className="paper-divider-line" />
                <span className="paper-divider-dot" />
                <span className="paper-divider-line" />
            </div>
        </section>
    );
};

export default PaperSection;
