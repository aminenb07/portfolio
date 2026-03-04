"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BookContainer from '@/components/BookContainer';
import Cover from '@/components/sections/Cover';
import Foreword from '@/components/sections/Foreword';
import SkillsIndex from '@/components/sections/SkillsIndex';
import ArchivedNotes from '@/components/sections/ArchivedNotes';
import Epilogue from '@/components/sections/Epilogue';
import PageTurner from '@/components/PageTurner';
import { useAudioManager } from '@/components/AudioManager';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { playFlipSound } = useAudioManager();

    useEffect(() => {
        // Initial fade in of the entire book container
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            });
        }
    }, []);

    // Simple visual separator mimicking a blank area between chapters
    const ChapterSeparator = () => (
        <div style={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--ink-faded)',
                opacity: 0.3,
                boxShadow: '-20px 0 0 var(--ink-faded), 20px 0 0 var(--ink-faded)'
            }} />
        </div>
    );

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            <BookContainer>
                <PageTurner onPageFlip={playFlipSound}>
                    <Cover />
                    <Foreword />
                    <SkillsIndex />
                    <ArchivedNotes />
                    <Epilogue />
                </PageTurner>
            </BookContainer>
        </div>
    );
}
