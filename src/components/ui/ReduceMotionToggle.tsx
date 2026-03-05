import React from "react";

type ReduceMotionToggleProps = {
    enabled: boolean;
    onToggle: () => void;
};

const ReduceMotionToggle = ({ enabled, onToggle }: ReduceMotionToggleProps) => {
    return (
        <button
            type="button"
            className="control-button"
            onClick={onToggle}
            aria-pressed={enabled}
            aria-label={enabled ? "Disable reduce motion" : "Enable reduce motion"}
            data-cursor="active"
            data-sound-click="true"
        >
            {enabled ? "Motion Reduced" : "Reduce Motion"}
        </button>
    );
};

export default ReduceMotionToggle;
