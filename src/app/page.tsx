"use client";

import { useMemo, useState } from 'react';
import Cover from '@/components/sections/Cover';
import Foreword from '@/components/sections/Foreword';
import SkillsIndex from '@/components/sections/SkillsIndex';
import ArchivedNotes from '@/components/sections/ArchivedNotes';
import Epilogue from '@/components/sections/Epilogue';
import PaperSection from '@/components/ui/PaperSection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollSound } from '@/hooks/useScrollSound';
import { useNotebookShell } from '@/components/layout/NotebookShell';

export default function Home() {
    const { setSectionMood, playRustle, startFriction, stopFriction, isSoundEnabled, isMuted, reduceMotion } = useNotebookShell();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionIds = useMemo(() => ['cover', 'foreword', 'skills', 'projects', 'contact'], []);

    useActiveSection({
        sectionIds,
        setActiveSection,
        onSectionEnter: (id) => {
            setSectionMood(id);
            if (isSoundEnabled && !isMuted) {
                playRustle();
            }
        }
    });

    useScrollSound({
        enabled: isSoundEnabled && !isMuted && !reduceMotion,
        startFriction,
        stopFriction
    });

    return (
        <div className="notebook-content" data-active-section={activeSection ?? undefined}>
            <PaperSection id="cover" pageNumber="01">
                <Cover />
            </PaperSection>
            <PaperSection id="foreword" pageNumber="02">
                <Foreword />
            </PaperSection>
            <PaperSection id="skills" pageNumber="03">
                <SkillsIndex />
            </PaperSection>
            <PaperSection id="projects" pageNumber="04">
                <ArchivedNotes />
            </PaperSection>
            <PaperSection id="contact" pageNumber="05">
                <Epilogue />
            </PaperSection>
        </div>
    );
}
