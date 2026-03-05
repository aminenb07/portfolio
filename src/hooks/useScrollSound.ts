import { useEffect, useRef } from "react";

type UseScrollSoundOptions = {
    enabled: boolean;
    startFriction: () => void;
    stopFriction: () => void;
};

export const useScrollSound = ({ enabled, startFriction, stopFriction }: UseScrollSoundOptions) => {
    const enabledRef = useRef(enabled);

    useEffect(() => {
        enabledRef.current = enabled;
        if (!enabled) {
            stopFriction();
        }
    }, [enabled, stopFriction]);

    useEffect(() => {
        let stopTimer: ReturnType<typeof setTimeout> | null = null;

        const onScroll = () => {
            if (!enabledRef.current) return;
            startFriction();

            if (stopTimer) clearTimeout(stopTimer);
            stopTimer = setTimeout(() => {
                stopFriction();
            }, 150);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (stopTimer) clearTimeout(stopTimer);
        };
    }, [startFriction, stopFriction]);
};
