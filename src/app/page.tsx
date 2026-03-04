"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BookContainer from '@/components/BookContainer';
import Cover from '@/components/sections/Cover';
import Foreword from '@/components/sections/Foreword';
import SkillsIndex from '@/components/sections/SkillsIndex';
import ArchivedNotes from '@/components/sections/ArchivedNotes';
import Epilogue from '@/components/sections/Epilogue';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

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
    const ChapterSeparator = ({ num }: { num: string }) => (
        <div style={{ height: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{
                fontFamily: 'var(--font-fell), serif',
                fontSize: '0.7rem',
                color: 'var(--ink-faded)',
                opacity: 0.4,
                marginBottom: '1rem'
            }}>
                &mdash; p. {num} &mdash;
            </div>
            <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--ink-faded)',
                opacity: 0.2,
                boxShadow: '-20px 0 0 var(--ink-faded), 20px 0 0 var(--ink-faded)'
            }} />
        </div>
    );

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            <BookContainer>
                <Cover />
                <ChapterSeparator num="01" />
                <Foreword />
                <ChapterSeparator num="02" />
                <SkillsIndex />
                <ChapterSeparator num="03" />
                <ArchivedNotes />
                <ChapterSeparator num="04" />
                <Epilogue />
            </BookContainer>
        </div>
    );
}
