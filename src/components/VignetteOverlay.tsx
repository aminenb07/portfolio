import React from 'react';

const VignetteOverlay = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
                zIndex: 10000,
                mixBlendMode: 'multiply',
                animation: 'vignette-pulse 10s ease-in-out infinite'
            }}
        />
    );
};

export default VignetteOverlay;
