"use client";

const skillsData = [
    {
        category: 'I. Languages',
        items: [
            { name: 'JavaScript / TypeScript', level: 'Expert' },
            { name: 'HTML5 & CSS3', level: 'Mastery' },
            { name: 'Python', level: 'Journeyman' }
        ]
    },
    {
        category: 'II. Arcana (Frameworks)',
        items: [
            { name: 'React & Next.js', level: 'Expert' },
            { name: 'Vue.js', level: 'Proficient' },
            { name: 'Node.js', level: 'Proficient' }
        ]
    },
    {
        category: 'III. Motion & Illusion',
        items: [
            { name: 'GSAP', level: 'Expert' },
            { name: 'Three.js / WebGL', level: 'Novice' },
            { name: 'Framer Motion', level: 'Proficient' }
        ]
    },
    {
        category: 'IV. Draftsmanship',
        items: [
            { name: 'Figma Prototyping', level: 'Expert' },
            { name: 'Interaction Design', level: 'Advanced' },
            { name: 'Typography & Layout', level: 'Mastery' }
        ]
    },
];

const SkillsIndex = () => {
    return (
        <div
            style={{
                minHeight: '70vh',
                padding: '4rem 0',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem 6rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}
            >
                {skillsData.map((section) => (
                    <div key={section.category}>
                        <h3
                            className="small-caps"
                            style={{
                                fontFamily: 'var(--font-fell), serif',
                                fontSize: '1.2rem',
                                borderBottom: '1px dotted var(--ink-faded)',
                                paddingBottom: '0.5rem',
                                marginBottom: '1.5rem',
                                color: 'var(--ink-main)',
                            }}
                        >
                            {section.category}
                        </h3>

                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                fontFamily: 'var(--font-lora), serif',
                                fontSize: '1rem',
                            }}
                        >
                            {section.items.map((item) => (
                                <li
                                    key={item.name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        marginBottom: '0.8rem',
                                        lineHeight: '1.4',
                                    }}
                                >
                                    <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
                                    {/* Dot Leader */}
                                    <span
                                        style={{
                                            flexGrow: 1,
                                            borderBottom: '2px dotted var(--ink-faded)',
                                            height: '1px',
                                            margin: '0 10px',
                                            opacity: 0.3,
                                            position: 'relative',
                                            top: '-4px'
                                        }}
                                    />
                                    <span
                                        className="small-caps"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'var(--font-fell), serif',
                                            color: 'var(--ink-faded)',
                                            fontSize: '0.9em'
                                        }}
                                    >
                                        {item.level}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsIndex;
