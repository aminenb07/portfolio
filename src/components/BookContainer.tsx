import React from 'react';

const BookContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className="book-container"
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1440px', // Max width for the book spread
                margin: '0 auto',
                minHeight: '100vh',
            }}
        >
            {/* Decorative spine shadow for desktop spread (hidden on smaller screens via CSS later) */}
            <div
                className="book-spine hidden lg:block"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '100%',
                    boxShadow: 'inset 25px 0 25px -25px rgba(0,0,0,0.3), inset -25px 0 25px -25px rgba(0,0,0,0.3)',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            {/* 
        The content wrapper flex layout. 
        On desktop, children will flow to fill columns, or sections will take up 50% width.
      */}
            <div
                className="book-content"
                style={{
                    padding: 'var(--margin-page)',
                    paddingTop: 'calc(var(--margin-page) * 1.5)',
                    paddingBottom: 'calc(var(--margin-page) * 2)',
                }}
            >
                {children}
            </div>
        </main>
    );
};

export default BookContainer;
