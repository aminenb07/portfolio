"use client";

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import VintageControls from './VintageControls';

// Rename to avoid conflict with browser's AudioContext type
const GlobalAudioContext = createContext<{ playFlipSound: () => void }>({ playFlipSound: () => { } });

export default function AudioManager({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    // Use the native AudioContext type explicitly
    const audioContextRef = useRef<window.AudioContext | null>(null);
    const lastScrollPos = useRef(0);
    const scrollSoundNode = useRef<AudioBufferSourceNode | null>(null);
    const gainNode = useRef<GainNode | null>(null);

    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                audioContextRef.current = new AudioCtx();
            }
        }
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const playTick = (frequency: number = 800, duration: number = 0.05, volume: number = 0.05) => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency / 2, ctx.currentTime + duration);

        g.gain.setValueAtTime(volume, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    // Synthesize a "thud/rustle" for page flips
    const playFlipSound = useCallback(() => {
        if (isMuted) return;
        initAudio();
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;

        // Thump
        const osc = ctx.createOscillator();
        const gThump = ctx.createGain();
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
        gThump.gain.setValueAtTime(0.1, ctx.currentTime);
        gThump.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.connect(gThump);
        gThump.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);

        // Rustle (Noise)
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        const gRustle = ctx.createGain();
        gRustle.gain.setValueAtTime(0.05, ctx.currentTime);
        gRustle.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        source.connect(filter);
        filter.connect(gRustle);
        gRustle.connect(ctx.destination);
        source.start();
    }, [isMuted]);

    const createScrollSound = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, ctx.currentTime);
        source.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        source.start();
        scrollSoundNode.current = source;
        gainNode.current = g;
    };

    useEffect(() => {
        const handleInteraction = () => { initAudio(); };
        window.addEventListener('click', handleInteraction);
        return () => window.removeEventListener('click', handleInteraction);
    }, []);

    useEffect(() => {
        if (isMuted) {
            if (gainNode.current && audioContextRef.current) {
                gainNode.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
            }
            return;
        }
        if (!gainNode.current) createScrollSound();
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            if (isMuted || !gainNode.current || !audioContextRef.current) return;
            const velocity = Math.abs(window.scrollY - lastScrollPos.current);
            lastScrollPos.current = window.scrollY;
            const targetGain = Math.min(0.06, velocity / 1500);
            gainNode.current.gain.setTargetAtTime(targetGain, audioContextRef.current.currentTime, 0.05);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (gainNode.current && audioContextRef.current) {
                    gainNode.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.2);
                }
            }, 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMuted]);

    useEffect(() => {
        const handleSelectionChange = () => { if (!isMuted) playTick(400, 0.02, 0.02); };
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [isMuted]);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) playTick(1200, 0.03, 0.03);
        };
        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, [isMuted]);

    return (
        <GlobalAudioContext.Provider value={{ playFlipSound }}>
            <VintageControls isMuted={isMuted} toggleMute={() => setIsMuted(!isMuted)} />
            {children}
        </GlobalAudioContext.Provider>
    );
}

export const useAudioManager = () => useContext(GlobalAudioContext);
