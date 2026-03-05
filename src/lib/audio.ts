export type AudioEngine = ReturnType<typeof createAudioEngine>;

type NoiseOptions = {
    duration: number;
    gain: number;
    highpass?: number;
    lowpass?: number;
};

const createNoiseBuffer = (ctx: AudioContext, { duration, gain, highpass, lowpass }: NoiseOptions) => {
    const frameCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i += 1) {
        data[i] = (Math.random() * 2 - 1) * gain;
    }
    return { buffer, highpass, lowpass };
};

export const createAudioEngine = () => {
    let audioContext: AudioContext | null = null;
    let masterGain: GainNode | null = null;
    let muted = true;
    let rustle: ReturnType<typeof createNoiseBuffer> | null = null;
    let hoverTick: ReturnType<typeof createNoiseBuffer> | null = null;
    let clickTap: ReturnType<typeof createNoiseBuffer> | null = null;
    let frictionLoop: AudioBufferSourceNode | null = null;
    let frictionGain: GainNode | null = null;

    const ensureContext = () => {
        if (!audioContext) {
            const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            audioContext = new AudioCtx();
            masterGain = audioContext.createGain();
            masterGain.gain.value = 0.3;
            masterGain.connect(audioContext.destination);
        }
        return audioContext;
    };

    const ensureBuffers = () => {
        if (!audioContext) return;
        if (!rustle) {
            rustle = createNoiseBuffer(audioContext, { duration: 0.18, gain: 0.25, highpass: 1800, lowpass: 5200 });
        }
        if (!hoverTick) {
            hoverTick = createNoiseBuffer(audioContext, { duration: 0.04, gain: 0.2, highpass: 2200, lowpass: 5200 });
        }
        if (!clickTap) {
            clickTap = createNoiseBuffer(audioContext, { duration: 0.06, gain: 0.25, highpass: 900, lowpass: 3200 });
        }
    };

    const applyFilterChain = (input: AudioNode, lowpass?: number, highpass?: number) => {
        if (!audioContext) return input;
        let current: AudioNode = input;
        if (highpass) {
            const hp = audioContext.createBiquadFilter();
            hp.type = "highpass";
            hp.frequency.value = highpass;
            current.connect(hp);
            current = hp;
        }
        if (lowpass) {
            const lp = audioContext.createBiquadFilter();
            lp.type = "lowpass";
            lp.frequency.value = lowpass;
            current.connect(lp);
            current = lp;
        }
        return current;
    };

    const playNoise = (sound: ReturnType<typeof createNoiseBuffer> | null, volume: number) => {
        if (!audioContext || !sound || !masterGain || muted) return;
        const source = audioContext.createBufferSource();
        source.buffer = sound.buffer;
        const gain = audioContext.createGain();
        gain.gain.value = volume;
        const filtered = applyFilterChain(source, sound.lowpass, sound.highpass);
        filtered.connect(gain);
        gain.connect(masterGain);
        source.start();
    };

    const ensureFriction = () => {
        if (!audioContext || !masterGain || frictionLoop) return;
        const noise = createNoiseBuffer(audioContext, { duration: 1.4, gain: 0.15, highpass: 600, lowpass: 1800 });
        const source = audioContext.createBufferSource();
        source.buffer = noise.buffer;
        source.loop = true;
        const gain = audioContext.createGain();
        gain.gain.value = 0;
        const filtered = applyFilterChain(source, noise.lowpass, noise.highpass);
        filtered.connect(gain);
        gain.connect(masterGain);
        source.start();
        frictionLoop = source;
        frictionGain = gain;
    };

    const enable = async () => {
        const ctx = ensureContext();
        if (ctx.state === "suspended") {
            await ctx.resume();
        }
        ensureBuffers();
    };

    const setMuted = (nextMuted: boolean) => {
        muted = nextMuted;
        if (!audioContext || !masterGain) return;
        masterGain.gain.setTargetAtTime(nextMuted ? 0 : 0.3, audioContext.currentTime, 0.05);
    };

    const playRustle = () => {
        playNoise(rustle, 0.15);
    };

    const playHover = () => {
        playNoise(hoverTick, 0.08);
    };

    const playClick = () => {
        playNoise(clickTap, 0.12);
    };

    const startFriction = () => {
        if (!audioContext || muted) return;
        ensureFriction();
        if (!frictionGain || !audioContext) return;
        frictionGain.gain.setTargetAtTime(0.06, audioContext.currentTime, 0.08);
    };

    const stopFriction = () => {
        if (!frictionGain || !audioContext) return;
        frictionGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.12);
    };

    return {
        enable,
        setMuted,
        playRustle,
        playHover,
        playClick,
        startFriction,
        stopFriction
    };
};
