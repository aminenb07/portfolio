"use client";

import { useNotebookShell } from "@/components/layout/NotebookShell";
import { useState, useEffect } from "react";

const BookCover = () => {
  const { isBookOpen, openBook, settings } = useNotebookShell();
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleOpen = () => {
    if (!isBookOpen) {
      openBook();
    }
  };

  return (
    <div
      className={`book-cover-container ${isBookOpen ? "open" : ""}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        perspective: '2000px',
        pointerEvents: isBookOpen ? 'none' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        transition: 'opacity 0.8s ease',
        opacity: isBookOpen ? 0 : 1
      }}
    >
      <div
        onClick={handleOpen}
        className={`book-cover ${isBookOpen ? "open" : ""}`}
        style={{
          width: 'min(90vw, 500px)',
          height: 'min(85vh, 700px)',
          backgroundColor: 'var(--theme-current)',
          borderRadius: '4px 12px 12px 4px',
          boxShadow: '20px 20px 60px rgba(0,0,0,0.5), inset 2px 0 10px rgba(255,255,255,0.1)',
          cursor: 'pointer',
          transformOrigin: 'left center',
          transition: 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), background-color 0.8s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          textAlign: 'center',
          borderLeft: '15px solid rgba(0,0,0,0.2)',
          position: 'relative'
        }}
      >
        {/* Ornament Border */}
        {settings.ornament === 'border' && (
          <div style={{
            position: 'absolute',
            inset: '20px',
            border: '2px solid var(--ink-red)',
            opacity: 0.3,
            pointerEvents: 'none'
          }} />
        )}

        <div className="embossed" style={{
          fontFamily: 'var(--font-uncial)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--ink-main)',
          marginBottom: '1rem',
          lineHeight: 1.1
        }}>
          {settings.coverTitle}
        </div>

        <div className="small-caps" style={{
          fontFamily: 'var(--font-fell)',
          fontSize: '1rem',
          color: 'var(--ink-faded)',
          letterSpacing: '0.1em',
          marginTop: '2rem'
        }}>
          {settings.coverSubtitle}
        </div>

        <div style={{
          marginTop: 'auto',
          fontFamily: 'var(--font-fell)',
          fontSize: '0.7rem',
          color: 'var(--ink-faded)',
          opacity: 0.6
        }}>
          VOLUME MMXXIV • SELECTED MANUSCRIPTS
        </div>

        {!isBookOpen && (
          <div className="small-caps" style={{
            position: 'absolute',
            bottom: '2rem',
            fontFamily: 'var(--font-fell)',
            fontSize: '0.8rem',
            color: 'var(--ink-red)',
            animation: 'pulse 2s infinite',
            letterSpacing: '0.2em'
          }}>
            Open the Book
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default BookCover;
