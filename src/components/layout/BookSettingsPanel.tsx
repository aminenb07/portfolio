"use client";

import { useState, useEffect } from "react";
import { useNotebookShell } from "@/components/layout/NotebookShell";

const BookSettingsPanel = () => {
  const { settings, updateSettings } = useNotebookShell();
  const [open, setOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  // Sync local state when shell settings change (e.g. from localStorage load)
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(() => localSettings);
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setOpen(false);
  };

  return (
    <div className="settings-panel">
      <button
        type="button"
        className="small-caps"
        onClick={() => setOpen(!open)}
        style={{
          background: 'var(--ink-red)',
          color: '#f4efe6',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          zIndex: 1001,
          position: 'relative'
        }}
        data-cursor="active"
      >
        {open ? "Close Settings" : "Book Settings"}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '1rem',
          width: '320px',
          maxHeight: '70vh',
          overflowY: 'auto',
          background: '#f4efe6',
          border: '1px solid #d6c9b3',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 1000
        }}>
          <h3 className="small-caps" style={{ borderBottom: '1px solid #d6c9b3', paddingBottom: '0.5rem', fontSize: '0.9rem', color: '#2c2a28' }}>
            Cover Workshop
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="small-caps" style={{ fontSize: '0.7rem', color: '#5c5853' }}>Cover Title</span>
            <input
              type="text"
              value={localSettings.coverTitle}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, coverTitle: e.target.value }))}
              style={{ padding: '0.5rem', border: '1px solid #d6c9b3', borderRadius: '4px', fontFamily: 'var(--font-garamond)', color: '#2c2a28', background: '#f9f3e8' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="small-caps" style={{ fontSize: '0.7rem', color: '#5c5853' }}>Subtitle</span>
            <input
              type="text"
              value={localSettings.coverSubtitle}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, coverSubtitle: e.target.value }))}
              style={{ padding: '0.5rem', border: '1px solid #d6c9b3', borderRadius: '4px', fontFamily: 'var(--font-garamond)', color: '#2c2a28', background: '#f9f3e8' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="small-caps" style={{ fontSize: '0.7rem', color: '#5c5853' }}>Cover Theme</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {(['parchment', 'sepia', 'midnight-ink', 'library-green', 'burgundy'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setLocalSettings(prev => ({ ...prev, theme: t }))}
                  style={{
                    padding: '0.4rem',
                    fontSize: '0.6rem',
                    border: localSettings.theme === t ? '1px solid var(--ink-red)' : '1px solid #d6c9b3',
                    background: localSettings.theme === t ? '#e6d7b8' : 'transparent',
                    color: '#2c2a28',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  data-cursor="active"
                >
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="small-caps" style={{ fontSize: '0.7rem', color: '#5c5853' }}>Ornament</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['none', 'border', 'emblem'] as const).map(o => (
                <button
                  key={o}
                  onClick={() => setLocalSettings(prev => ({ ...prev, ornament: o }))}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.6rem',
                    border: localSettings.ornament === o ? '1px solid var(--ink-red)' : '1px solid #d6c9b3',
                    background: localSettings.ornament === o ? '#e6d7b8' : 'transparent',
                    color: '#2c2a28',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  data-cursor="active"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="small-caps" style={{ fontSize: '0.7rem', color: '#5c5853' }}>Paper Texture</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['low', 'medium'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setLocalSettings(prev => ({ ...prev, paperTexture: p }))}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.6rem',
                    border: localSettings.paperTexture === p ? '1px solid var(--ink-red)' : '1px solid #d6c9b3',
                    background: localSettings.paperTexture === p ? '#e6d7b8' : 'transparent',
                    color: '#2c2a28',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  data-cursor="active"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #d6c9b3', paddingTop: '1.5rem' }}>
            <button
              onClick={handleCancel}
              className="small-caps"
              style={{
                flex: 1,
                padding: '0.6rem',
                fontSize: '0.7rem',
                border: '1px solid var(--paper-edge)',
                background: 'transparent',
                color: '#5c5853',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              data-cursor="active"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="small-caps"
              style={{
                flex: 1,
                padding: '0.6rem',
                fontSize: '0.7rem',
                border: 'none',
                background: 'var(--ink-red)',
                color: '#f4efe6',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              data-cursor="active"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSettingsPanel;
