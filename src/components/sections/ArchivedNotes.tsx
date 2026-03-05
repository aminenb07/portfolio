"use client";

import { Github, ArrowUpRight } from 'lucide-react';
import { Repository } from '@/lib/github';

interface ArchivedNotesProps {
  repos: Repository[];
}

const ArchivedNotes = ({ repos }: ArchivedNotesProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {repos.map((repo, idx) => (
        <div
          key={repo.id}
          className="project-card"
          style={{
            transform: `rotate(${idx % 2 === 0 ? -0.3 : 0.3}deg)`
          }}
        >
          {repo.isFeatured && <div className="archive-stamp">Featured Exhibit</div>}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--paper-edge)',
            paddingBottom: '1rem'
          }}>
            <span className="font-editorial" style={{ fontSize: '0.7rem', color: 'var(--ink-faded)' }}>
              ENTRY NO. {String(idx + 1).padStart(3, '0')}
            </span>
            <span className="font-editorial" style={{ fontSize: '0.7rem', color: 'var(--ink-faded)' }}>
              UPDATED: {new Date(repo.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
            </span>
          </div>

          <h3 className="font-classic" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--ink-main)' }}>
            {repo.name}
          </h3>

          <p className="font-body" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--ink-main)', marginBottom: '2rem', minHeight: '3em' }}>
            {repo.description || "An undocumented digital artifact from the archives."}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {repo.language && (
                <span className="font-editorial small-caps" style={{ fontSize: '0.65rem', color: 'var(--ink-red)', opacity: 0.8 }}>
                  • {repo.language}
                </span>
              )}
              <span className="font-editorial small-caps" style={{ fontSize: '0.65rem', color: 'var(--ink-faded)', opacity: 0.8 }}>
                • {repo.stargazers_count} Stars
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="ink-underline font-editorial small-caps"
                style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-main)' }}
              >
                Source <Github size={14} />
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="ink-underline font-editorial small-caps"
                  style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-red)' }}
                >
                  Live <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Ribbon effect on hover - handled via CSS in globals */}
          <div className="bookmark-ribbon" style={{
            position: 'absolute',
            left: '2rem',
            top: '-10px',
            width: '12px',
            height: '40px',
            background: 'var(--ink-red)',
            opacity: 0,
            transition: 'all 0.4s ease',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)'
          }} />
        </div>
      ))}
    </div>
  );
};

export default ArchivedNotes;
