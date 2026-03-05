"use client";

import { useMemo, useState, useEffect } from "react";
import Cover from "@/components/sections/Cover";
import Foreword from "@/components/sections/Foreword";
import SkillsIndex from "@/components/sections/SkillsIndex";
import ArchivedNotes from "@/components/sections/ArchivedNotes";
import Epilogue from "@/components/sections/Epilogue";
import NotebookShell, { useNotebookShell } from "@/components/layout/NotebookShell";
import { getRepositories, Repository } from "@/lib/github";

function PortfolioContent() {
    const { isBookOpen } = useNotebookShell();
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        getRepositories().then(setRepos);
    }, []);

    return (
        <div className={`book-pages ${isBookOpen ? "visible" : ""}`}>
            <section id="chapter-1" className="chapter">
                <span className="chapter-number">Chapter I</span>
                <Cover />
            </section>

            <div className="chapter-divider" />

            <section id="chapter-2" className="chapter">
                <span className="chapter-number">Chapter II</span>
                <h2 className="font-display embossed" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>The Foreword</h2>
                <Foreword />
            </section>

            <div className="chapter-divider" />

            <section id="chapter-3" className="chapter">
                <span className="chapter-number">Chapter III</span>
                <h2 className="font-display embossed" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Index of Skills</h2>
                <SkillsIndex />
            </section>

            <div className="chapter-divider" />

            <section id="chapter-4" className="chapter">
                <span className="chapter-number">Chapter IV</span>
                <h2 className="font-display embossed" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Archived Works</h2>
                <ArchivedNotes repos={repos} />
            </section>

            <div className="chapter-divider" />

            <section id="chapter-5" className="chapter">
                <span className="chapter-number">Chapter V</span>
                <h2 className="font-display embossed" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>The Epilogue</h2>
                <Epilogue />
            </section>
            
            <footer style={{ textAlign: 'center', padding: '4rem', opacity: 0.4 }} className="font-editorial">
                FINIS • MMXXIV
            </footer>
        </div>
    );
}

export default function Home() {
    return (
        <NotebookShell>
            <PortfolioContent />
        </NotebookShell>
    );
}
