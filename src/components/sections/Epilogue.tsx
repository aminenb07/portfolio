"use client";

const Epilogue = () => {
    return (
        <div
            style={{
                minHeight: '70vh',
                padding: '4rem 0 12rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                className="font-body"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    position: 'relative',
                }}
            >
                <p>
                    Should you wish to commission a new volume of work, discuss the minutiae of interaction engineering, or simply correspond regarding the craft, let it be known that my inkwell remains open.
                </p>

                <p>
                    Direct all formal inquiries and missives to the following address:
                </p>

                <div
                    style={{
                        margin: '4rem 0',
                        textAlign: 'center',
                    }}
                >
                    <a
                        href="mailto:hello@example.com"
                        className="ink-underline ligatures font-editorial small-caps"
                        style={{
                            fontSize: '2rem',
                            color: 'var(--ink-red)',
                            padding: '0.5rem 1rem',
                            display: 'inline-block',
                            position: 'relative',
                        }}
                    >
                        hello@example.com
                        {/* Fake wax stamp/postmark overlay */}
                        <div
                            className="font-editorial"
                            style={{
                                position: 'absolute',
                                top: '-25px',
                                right: '-40px',
                                width: '70px',
                                height: '70px',
                                border: '2px solid rgba(139, 58, 58, 0.15)',
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                transform: 'rotate(-15deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.55rem',
                                color: 'rgba(139, 58, 58, 0.3)',
                                textAlign: 'center',
                                lineHeight: '1.1',
                            }}
                        >
                            POST<br />APPROVED
                        </div>
                    </a>
                </div>

                <p style={{ textAlign: 'right', marginTop: '4rem', fontStyle: 'italic', opacity: 0.8 }}>
                    Yours faithfully,
                </p>

                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <svg width="200" height="60" viewBox="0 0 200 60" style={{ display: 'inline-block', fill: 'none', stroke: 'var(--ink-main)', strokeWidth: '1.2', strokeLinecap: 'round', opacity: 0.8 }}>
                        <path d="M 20 40 Q 30 10 40 40 T 60 40 Q 80 50 90 20 T 110 40 Q 130 50 140 30 T 160 40 Q 180 20 190 40" strokeDasharray="300" strokeDashoffset="0">
                            <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.5s" fill="freeze" />
                        </path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Epilogue;
