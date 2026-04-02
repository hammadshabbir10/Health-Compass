import React from 'react';

function InstructionPanel({ instructions }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        padding: '1.5rem',
        display: 'grid',
        gap: '1rem',
        minHeight: '360px',
        boxShadow: '0 22px 50px -40px rgba(15, 23, 42, 0.35)',
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>Assessment Instructions</h2>
        <p style={{ margin: '0.4rem 0 0', color: '#64748b', fontSize: '0.95rem' }}>
          Guidance for safe, age-aware triage prompts.
        </p>
      </div>
      <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#0f172a', display: 'grid', gap: '0.7rem' }}>
        {instructions.map((item) => (
          <li key={item} style={{ lineHeight: 1.6 }}>
            {item}
          </li>
        ))}
      </ul>
      <div
        style={{
          padding: '0.9rem 1rem',
          borderRadius: '12px',
          background: '#e0f2ff',
          color: '#1d4ed8',
          fontSize: '0.95rem',
        }}
      >
        Connect this panel to your backend prompt template once the assessment engine is ready.
      </div>
    </div>
  );
}

export default InstructionPanel;
