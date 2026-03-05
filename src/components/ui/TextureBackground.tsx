"use client";

import Image from "next/image";

type TextureBackgroundProps = {
    reduceMotion: boolean;
};

const TextureBackground = ({ reduceMotion }: TextureBackgroundProps) => {
    return (
        <div className={`texture-background${reduceMotion ? " reduce-motion" : ""}`}>
            <div className="texture-layer">
                <Image src="/textures/paper-texture.svg" alt="" fill sizes="100vw" />
            </div>
            <div className="tint-layer" />
            <div className="vignette-layer" />
        </div>
    );
};

export default TextureBackground;
