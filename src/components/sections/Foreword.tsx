"use client";

const Foreword = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '70vh',
                position: 'relative',
                padding: '4rem 0',
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-lora), serif',
                    maxWidth: 'var(--max-width-text)',
                    width: '100%',
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    position: 'relative',
                }}
            >
                <p>
                    <span
                        className="ligatures"
                        style={{
                            fontFamily: 'var(--font-garamond), serif',
                            float: 'left',
                            fontSize: '4.5rem',
                            lineHeight: '0.8',
                            marginRight: '0.5rem',
                            color: 'var(--ink-red)',
                        }}
                    >
                        I
                    </span>
                    n an era defined by fleeting illuminated pixels and ephemeral interfaces, there remains an enduring power in the tactile, the deliberate, and the crafted. My work exists at the intersection of modern engineering precision and the timeless aesthetic principles of classical print.
                </p>

                <p>
                    I am a specialized front-end engineer and designer, focusing on constructing digital experiences that do not merely present information, but embed it within a narrative atmosphere. I believe that code can be as expressive as ink, and that performance and accessibility are the binding threads of any robust composition.
                </p>
            </div>
        </div>
    );
};

export default Foreword;
