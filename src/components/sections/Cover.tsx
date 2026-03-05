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
                className="ligatures"
                style={{
                    fontFamily: 'var(--font-garamond), serif',
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
                className="small-caps"
                style={{
                    fontFamily: 'var(--font-fell), serif',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    color: 'var(--ink-faded)',
                    maxWidth: '600px',
                    margin: '0 auto',
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
