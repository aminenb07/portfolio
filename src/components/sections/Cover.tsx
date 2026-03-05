"use client";

const Cover = () => {
    return (
        <div
            style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                padding: '4rem 0',
            }}
        >
            <h1
                className="ligatures font-display embossed"
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    letterSpacing: '-0.02em',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    color: 'var(--ink-main)',
                }}
            >
                Amine Nabou
            </h1>

            <p
                className="small-caps font-editorial"
                style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    color: 'var(--ink-faded)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    letterSpacing: '0.15em'
                }}
            >
                Creative Front-End Engineer & Designer
            </p>

            <div
                style={{
                    width: '40px',
                    height: '1px',
                    backgroundColor: 'var(--ink-faded)',
                    margin: '4rem auto 0 auto',
                    opacity: 0.3
                }}
            />
        </div>
    );
};

export default Cover;
