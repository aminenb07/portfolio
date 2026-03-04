import React from 'react';
import { Volume2, VolumeX, Bookmark } from 'lucide-react';

interface VintageControlsProps {
    isMuted: boolean;
    toggleMute: () => void;
}

const VintageControls: React.FC<VintageControlsProps> = ({ isMuted, toggleMute }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: "2rem",
                right: "2rem",
                zIndex: 100,
                display: "flex",
                gap: "1.5rem",
                alignItems: "center"
            }}
        >
            <button
                onClick={toggleMute}
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
                aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--ink-main)",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.7,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    cursor: "none" // Rely on custom cursor
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                    e.currentTarget.style.transform = "scale(1)";
                }}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <button
                title="Skip to Index"
                aria-label="Skip to Index"
                onClick={() => {
                    window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }); // Rough jump to middle for now
                }}
                style={{
                    background: "var(--ink-red)",
                    color: "var(--paper-base)",
                    border: "none",
                    padding: "0.4rem 0.8rem",
                    fontFamily: "var(--font-fell), serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "transform 0.2s ease",
                    position: "relative",
                    cursor: "none" // Rely on custom cursor
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                }}
            >
                <Bookmark size={14} />
                Index
            </button>
        </div>
    );
}

export default VintageControls;
