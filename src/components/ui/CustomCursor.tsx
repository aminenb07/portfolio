"use client";

import { useEffect, useRef } from "react";

type CustomCursorProps = {
    reduceMotion: boolean;
};

const CustomCursor = ({ reduceMotion }: CustomCursorProps) => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef(false);

    useEffect(() => {
        if (reduceMotion) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.body.classList.add("cursor-enabled");

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { x: target.x, y: target.y };
        let frame = 0;

        const render = () => {
            ringPos.x += (target.x - ringPos.x) * 0.14;
            ringPos.y += (target.y - ringPos.y) * 0.14;
            const scale = activeRef.current ? 1.12 : 1;
            dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
            frame = requestAnimationFrame(render);
        };

        const onMove = (event: MouseEvent) => {
            target.x = event.clientX;
            target.y = event.clientY;
        };

        const onHover = (event: MouseEvent) => {
            const targetEl = event.target as HTMLElement;
            const isActive = Boolean(targetEl.closest("[data-cursor='active']"));
            if (isActive !== activeRef.current) {
                activeRef.current = isActive;
                if (isActive) {
                    ring.classList.add("cursor-ring-active");
                    dot.classList.add("cursor-dot-active");
                } else {
                    ring.classList.remove("cursor-ring-active");
                    dot.classList.remove("cursor-dot-active");
                }
            }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onHover, { passive: true });
        frame = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onHover);
            cancelAnimationFrame(frame);
            document.body.classList.remove("cursor-enabled");
        };
    }, [reduceMotion]);

    if (reduceMotion) return null;

    return (
        <>
            <div ref={dotRef} className="custom-cursor-dot" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
};

export default CustomCursor;
