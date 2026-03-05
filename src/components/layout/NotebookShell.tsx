"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import BookCover from "@/components/layout/BookCover";
import BookSettingsPanel from "@/components/layout/BookSettingsPanel";

type BookSettings = {
    coverTitle: string;
    coverSubtitle: string;
    theme: "parchment" | "sepia" | "midnight-ink" | "library-green" | "burgundy";
    ornament: "none" | "border" | "emblem";
    paperTexture: "low" | "medium";
    fontPairing: "A" | "B";
};

type NotebookShellContextValue = {
    reduceMotion: boolean;
    isBookOpen: boolean;
    openBook: () => void;
    settings: BookSettings;
    updateSettings: (updater: (prev: BookSettings) => BookSettings) => void;
};

const DEFAULT_SETTINGS: BookSettings = {
    coverTitle: "Amine Nabou",
    coverSubtitle: "Creative Front-End Engineer & Designer",
    theme: "parchment",
    ornament: "border",
    paperTexture: "low",
    fontPairing: "A"
};

const STORAGE_KEY = "book-settings-v1";

const NotebookShellContext = createContext<NotebookShellContextValue | null>(null);

export const useNotebookShell = () => {
    const ctx = useContext(NotebookShellContext);
    if (!ctx) {
        throw new Error("NotebookShell context is missing");
    }
    return ctx;
};

const NotebookShell = ({ children }: { children: React.ReactNode }) => {
    const [reduceMotion, setReduceMotion] = useState(false);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [settings, setSettings] = useState<BookSettings>(DEFAULT_SETTINGS);

    // Sync reduced-motion with system preference
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncPreference = () => {
            setReduceMotion(media.matches);
        };
        syncPreference();
        media.addEventListener("change", syncPreference);
        return () => media.removeEventListener("change", syncPreference);
    }, []);

    // Apply reduced-motion class for global CSS
    useEffect(() => {
        document.body.classList.toggle("reduce-motion", reduceMotion);
    }, [reduceMotion]);

    // Load settings from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as Partial<BookSettings>;
            setSettings((prev) => ({ ...prev, ...parsed }));
        } catch {
            // ignore corrupted storage
        }
    }, []);

    // Persist settings
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            // ignore quota errors
        }
    }, [settings]);

    // Map theme + paper texture to CSS variables for surfaces and ink
    useEffect(() => {
        const root = document.documentElement;

        let themeColor = "#f4efe6";
        let paperSurface = "#f7f2e9";
        let paperEdge = "rgba(44, 42, 40, 0.08)";
        let inkColor = "#2c2a28";
        let inkFaded = "#5c5853";

        switch (settings.theme) {
            case "parchment":
                themeColor = "#f4efe6";
                paperSurface = "#f7f2e9";
                paperEdge = "rgba(44, 42, 40, 0.08)";
                inkColor = "#2c2a28";
                inkFaded = "#5c5853";
                break;
            case "sepia":
                themeColor = "#e8dfd1";
                paperSurface = "#f3e4cb";
                paperEdge = "rgba(44, 42, 40, 0.16)";
                inkColor = "#3b2a1a";
                inkFaded = "#7a6a58";
                break;
            case "midnight-ink":
                themeColor = "#1a1b1e";
                paperSurface = "#23262b";
                paperEdge = "rgba(249, 245, 233, 0.22)";
                inkColor = "#f4efe6";
                inkFaded = "#a19d99";
                break;
            case "library-green":
                themeColor = "#2d3e34";
                paperSurface = "#33493c";
                paperEdge = "rgba(244, 239, 230, 0.24)";
                inkColor = "#f4efe6";
                inkFaded = "#c8c1b8";
                break;
            case "burgundy":
                themeColor = "#4a1c1c";
                paperSurface = "#5c2730";
                paperEdge = "rgba(244, 239, 230, 0.24)";
                inkColor = "#f4efe6";
                inkFaded = "#d9c7c0";
                break;
        }

        root.style.setProperty("--theme-current", themeColor);
        root.style.setProperty("--paper-surface", paperSurface);
        root.style.setProperty("--paper-edge", paperEdge);
        root.style.setProperty("--ink-main", inkColor);
        root.style.setProperty("--ink-faded", inkFaded);

        const textureOpacity = settings.paperTexture === "low" ? "0.05" : "0.1";
        root.style.setProperty("--texture-opacity", textureOpacity);
    }, [settings.theme, settings.paperTexture]);

    const openBook = useCallback(() => {
        setIsBookOpen(true);
    }, []);

    const updateSettings = useCallback((updater: (prev: BookSettings) => BookSettings) => {
        setSettings((prev) => updater(prev));
    }, []);

    const value = useMemo(
        () => ({
            reduceMotion,
            isBookOpen,
            openBook,
            settings,
            updateSettings
        }),
        [reduceMotion, isBookOpen, settings, openBook, updateSettings]
    );

    return (
        <NotebookShellContext.Provider value={value}>
            <CustomCursor reduceMotion={reduceMotion} />
            <BookCover />
            <BookSettingsPanel />
            <main className={`notebook-shell ${isBookOpen ? "open" : ""}`} style={{
                opacity: isBookOpen ? 1 : 0,
                transition: 'opacity 0.8s ease 0.4s',
                pointerEvents: isBookOpen ? 'auto' : 'none'
            }}>
                {children}
            </main>
        </NotebookShellContext.Provider>
    );
};

export default NotebookShell;
