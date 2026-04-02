import React from 'react';

function QuestionPanel({ tests, loading, error, onGenerate }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        padding: '1.5rem',
        display: 'grid',
        gap: '1rem',
        boxShadow: '0 22px 50px -40px rgba(15, 23, 42, 0.35)',
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>Assessment Questions</h2>
        <p style={{ margin: '0.4rem 0 0', color: '#64748b', fontSize: '0.95rem' }}>
          Generate 5 tests based on the patient profile.
        </p>
      </div>
      {loading && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px dashed #cbd5f5',
            color: '#64748b',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            background: '#f8fbff',
          }}
        >
          Generating your personalized test set...
        </div>
      )}
      {!loading && error && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            background: '#fef2f2',
          }}
        >
          {error}
        </div>
      )}
      {!loading && !error && tests.length === 0 ? (
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px dashed #cbd5f5',
            color: '#64748b',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            background: '#f8fbff',
          }}
        >
          No questions yet. Fill the profile and generate an assessment set.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {tests.map((test) => (
            <div
              key={test.id || test.title}
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fbff',
              }}
            >
              <div style={{ fontWeight: 600, color: '#0f172a' }}>{test.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                {test.description}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onGenerate}
        style={{
          width: 'fit-content',
          padding: '0.75rem 1.4rem',
          borderRadius: '10px',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
          color: '#ffffff',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 12px 24px -16px rgba(37, 99, 235, 0.6)',
        }}
      >
        Generate Tests
      </button>
    </div>
  );
}

export default QuestionPanel;
