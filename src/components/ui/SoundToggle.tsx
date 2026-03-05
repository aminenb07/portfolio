import React from "react";

type SoundToggleProps = {
    isEnabled: boolean;
    isMuted: boolean;
    onEnable: () => void;
    onToggleMute: () => void;
};

const SoundToggle = ({ isEnabled, isMuted, onEnable, onToggleMute }: SoundToggleProps) => {
    if (!isEnabled) {
        return (
            <button
                type="button"
                className="control-button"
                onClick={onEnable}
                aria-label="Enable sound"
                data-cursor="active"
                data-sound-click="true"
            >
                Enable Sound
            </button>
        );
    }

    return (
        <button
            type="button"
            className="control-button"
            onClick={onToggleMute}
            aria-pressed={!isMuted}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            data-cursor="active"
            data-sound-click="true"
        >
            {isMuted ? "Unmute" : "Mute"}
        </button>
    );
};

export default SoundToggle;
