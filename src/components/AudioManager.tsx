"use client";

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import VintageControls from './VintageControls';

const GlobalAudioContext = createContext<{ playRustle: () => void }>({ playRustle: () => { } });

export default function AudioManager({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<any>(null);
    const lastScrollPos = useRef(0);
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

    const playDryTick = (frequency: number = 800, duration: number = 0.02, volume: number = 0.02) => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency / 4, ctx.currentTime + duration);

        g.gain.setValueAtTime(volume, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    // Subtle page rustle for section entries
    const playRustle = useCallback(() => {
        if (isMuted) return;
        initAudio();
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, ctx.currentTime);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.03, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

        source.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        source.start();
    }, [isMuted]);

    // Very subtle friction sound
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
        filter.frequency.setValueAtTime(600, ctx.currentTime);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, ctx.currentTime);

        source.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        source.start();
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
            const targetGain = Math.min(0.04, velocity / 2000);
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
        const handleSelectionChange = () => { if (!isMuted) playDryTick(400, 0.015, 0.015); };
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [isMuted]);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) playDryTick(1000, 0.02, 0.02);
        };
        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, [isMuted]);

    return (
        <GlobalAudioContext.Provider value={{ playRustle }}>
            <VintageControls isMuted={isMuted} toggleMute={() => setIsMuted(!isMuted)} />
            {children}
        </GlobalAudioContext.Provider>
    );
}

export const useAudioManager = () => useContext(GlobalAudioContext);
