import { useEffect, useRef } from "react";

type UseActiveSectionOptions = {
    sectionIds: string[];
    setActiveSection?: (id: string) => void;
    onSectionEnter?: (id: string) => void;
};

export const useActiveSection = ({ sectionIds, setActiveSection, onSectionEnter }: UseActiveSectionOptions) => {
    const lastActiveId = useRef<string | null>(null);

    useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;
                const id = visible.target.id;
                if (id === lastActiveId.current) return;
                lastActiveId.current = id;
                setActiveSection?.(id);
                onSectionEnter?.(id);
            },
            {
                rootMargin: "-20% 0px -35% 0px",
                threshold: [0.2, 0.4, 0.6]
            }
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [onSectionEnter, sectionIds, setActiveSection]);
};
