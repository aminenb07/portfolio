import React from "react";

type PageMarkerProps = {
    number: string;
};

const PageMarker = ({ number }: PageMarkerProps) => {
    return (
        <div className="page-marker">
            p. {number}
        </div>
    );
};

export default PageMarker;
