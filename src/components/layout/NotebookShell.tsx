"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import TextureBackground from "@/components/ui/TextureBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import SoundToggle from "@/components/ui/SoundToggle";
import ReduceMotionToggle from "@/components/ui/ReduceMotionToggle";
import { createAudioEngine, AudioEngine } from "@/lib/audio";

type NotebookShellContextValue = {
    isSoundEnabled: boolean;
    isMuted: boolean;
    reduceMotion: boolean;
    enableSound: () => void;
    toggleMute: () => void;
    toggleReduceMotion: () => void;
    setSectionMood: (sectionId: string) => void;
    playRustle: () => void;
    playHover: () => void;
    playClick: () => void;
    startFriction: () => void;
    stopFriction: () => void;
};

const NotebookShellContext = createContext<NotebookShellContextValue | null>(null);

export const useNotebookShell = () => {
    const ctx = useContext(NotebookShellContext);
    if (!ctx) {
        throw new Error("NotebookShell context is missing");
    }
    return ctx;
};

const NotebookShell = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<AudioEngine | null>(null);
    const hoverCooldown = useRef(0);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [hasMotionOverride, setHasMotionOverride] = useState(false);
    const [tintColor, setTintColor] = useState("transparent");
    const [vignetteOpacity, setVignetteOpacity] = useState(0.12);

    const ensureAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = createAudioEngine();
        }
        return audioRef.current;
    }, []);

    const enableSound = useCallback(() => {
        setIsSoundEnabled(true);
        setIsMuted(false);
        const engine = ensureAudio();
        engine.enable();
        engine.setMuted(false);
    }, [ensureAudio]);

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const next = !prev;
            audioRef.current?.setMuted(next);
            return next;
        });
    }, []);

    const toggleReduceMotion = useCallback(() => {
        setHasMotionOverride(true);
        setReduceMotion((prev) => !prev);
    }, []);

    const playRustle = useCallback(() => {
        if (!isSoundEnabled || isMuted) return;
        ensureAudio().playRustle();
    }, [isMuted, isSoundEnabled, ensureAudio]);

    const playHover = useCallback(() => {
        if (!isSoundEnabled || isMuted) return;
        ensureAudio().playHover();
    }, [isMuted, isSoundEnabled, ensureAudio]);

    const playClick = useCallback(() => {
        if (!isSoundEnabled || isMuted) return;
        ensureAudio().playClick();
    }, [isMuted, isSoundEnabled, ensureAudio]);

    const startFriction = useCallback(() => {
        if (!isSoundEnabled || isMuted) return;
        ensureAudio().startFriction();
    }, [isMuted, isSoundEnabled, ensureAudio]);

    const stopFriction = useCallback(() => {
        audioRef.current?.stopFriction();
    }, []);

    const setSectionMood = useCallback((sectionId: string) => {
        let tint = "transparent";
        let vignette = 0.12;

        switch (sectionId) {
            case "cover":
                tint = "rgba(139, 115, 85, 0.02)";
                vignette = 0.1;
                break;
            case "foreword":
                tint = "rgba(44, 42, 40, 0.01)";
                vignette = 0.13;
                break;
            case "skills":
                tint = "rgba(139, 58, 58, 0.02)";
                vignette = 0.16;
                break;
            case "projects":
                tint = "rgba(44, 42, 40, 0.02)";
                vignette = 0.18;
                break;
            case "contact":
                tint = "rgba(139, 115, 85, 0.03)";
                vignette = 0.14;
                break;
            default:
                tint = "transparent";
                vignette = 0.12;
        }

        setTintColor(tint);
        setVignetteOpacity(vignette);
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncPreference = () => {
            if (!hasMotionOverride) {
                setReduceMotion(media.matches);
            }
        };
        syncPreference();
        media.addEventListener("change", syncPreference);
        return () => media.removeEventListener("change", syncPreference);
    }, [hasMotionOverride]);

    useEffect(() => {
        document.body.style.setProperty("--tint-color", tintColor);
        document.body.style.setProperty("--vignette-opacity", vignetteOpacity.toString());
    }, [tintColor, vignetteOpacity]);

    useEffect(() => {
        document.body.classList.toggle("reduce-motion", reduceMotion);
        if (reduceMotion) {
            stopFriction();
        }
    }, [reduceMotion, stopFriction]);

    useEffect(() => {
        if (!isSoundEnabled || isMuted) return;

        const onHover = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("[data-sound='hover']")) return;
            const now = Date.now();
            if (now - hoverCooldown.current < 300) return;
            hoverCooldown.current = now;
            playHover();
        };

        const onClick = (event: PointerEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("[data-sound-click='true'], button, a")) return;
            playClick();
        };

        window.addEventListener("mouseover", onHover);
        window.addEventListener("pointerdown", onClick);
        return () => {
            window.removeEventListener("mouseover", onHover);
            window.removeEventListener("pointerdown", onClick);
        };
    }, [isMuted, isSoundEnabled, playHover, playClick]);

    const value = useMemo(
        () => ({
            isSoundEnabled,
            isMuted,
            reduceMotion,
            enableSound,
            toggleMute,
            toggleReduceMotion,
            setSectionMood,
            playRustle,
            playHover,
            playClick,
            startFriction,
            stopFriction
        }),
        [
            isSoundEnabled,
            isMuted,
            reduceMotion,
            enableSound,
            toggleMute,
            toggleReduceMotion,
            setSectionMood,
            playRustle,
            playHover,
            playClick,
            startFriction,
            stopFriction
        ]
    );

    return (
        <NotebookShellContext.Provider value={value}>
            <TextureBackground reduceMotion={reduceMotion} />
            <CustomCursor reduceMotion={reduceMotion} />
            <div className="notebook-controls">
                <SoundToggle isEnabled={isSoundEnabled} isMuted={isMuted} onEnable={enableSound} onToggleMute={toggleMute} />
                <ReduceMotionToggle enabled={reduceMotion} onToggle={toggleReduceMotion} />
            </div>
            <main className="notebook-shell">
                {children}
            </main>
        </NotebookShellContext.Provider>
    );
};

export default NotebookShell;
