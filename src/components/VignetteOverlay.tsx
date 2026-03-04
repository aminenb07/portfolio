import React from 'react';

const VignetteOverlay = () => {
    return (
        <div
            className="vignette"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 50,
                background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.06) 100%)',
            }}
        />
    );
};

export default VignetteOverlay;
