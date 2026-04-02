import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function MobilityTest({ user, onLogout }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('healthCompassAnswers') || '{}');
    return stored.mobility || {};
  });

  const test = useMemo(() => {
    const stored = localStorage.getItem('healthCompassTests');
    const list = stored ? JSON.parse(stored) : [];
    return list.find((item) => item.id === 'mobility');
  }, []);

  const questions = test?.questions || [];

  const handleAnswer = (id, value) => {
    setAnswers((current) => ({ ...current, [id]: value }));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('healthCompassAnswers') || '{}');
    stored.mobility = answers;
    localStorage.setItem('healthCompassAnswers', JSON.stringify(stored));
  }, [answers]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0b1736 0%, #1b2a52 55%, #1f2f5e 100%)',
        color: '#e2e8f0',
      }}
    >
      <Navbar user={user} onLogout={onLogout} />
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
        <div
          style={{
            background: '#111b3b',
            borderRadius: '18px',
            padding: '1.8rem',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            boxShadow: '0 24px 40px -30px rgba(15, 23, 42, 0.8)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'grid', gap: '1rem', alignItems: 'center', gridTemplateColumns: '1.4fr 1fr' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '2rem' }}>{test?.title || 'Mobility & Balance Test'}</h2>
              <p style={{ marginTop: '0.6rem', color: '#cbd5f5', lineHeight: 1.7 }}>
                This section measures stability, balance, and confidence in movement to detect mobility
                changes that can affect safety.
              </p>
            </div>
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                background: '#0f1a36',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
                alt="Mobility and balance"
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#0f1938',
            borderRadius: '16px',
            padding: '1.4rem',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            color: '#e2e8f0',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Why This Test Matters</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5f5', lineHeight: 1.7 }}>
            <li>Functional mobility checks reveal safety risks and fall concerns.</li>
            <li>Balance confidence links physical changes to daily independence.</li>
            <li>Activity impact highlights when clinical follow-up is needed.</li>
          </ul>
        </div>

        {!test && (
          <div
            style={{
              background: '#111b3b',
              borderRadius: '16px',
              padding: '1.6rem',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: '#e2e8f0',
              display: 'grid',
              gap: '1rem',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>Mobility test is not ready yet.</div>
            <div style={{ color: '#cbd5f5', lineHeight: 1.7 }}>
              Generate your assessment set from the dashboard to unlock this section.
            </div>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                width: 'fit-content',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {test && (
          <form style={{ display: 'grid', gap: '1.5rem' }}>
            {questions.map((question, index) => (
              <div
                key={question.id || index}
                style={{
                  background: '#f8fbff',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  border: '1px solid #dbeafe',
                  color: '#0f172a',
                  boxShadow: '0 20px 40px -30px rgba(15, 23, 42, 0.3)',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.6rem' }}>
                  {index + 1}. {question.question || question.prompt}
                </div>
                {question.type === 'text' ? (
                  <textarea
                    rows="4"
                    value={answers[question.id] || ''}
                    onChange={(event) => handleAnswer(question.id, event.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5f5',
                      background: '#ffffff',
                      resize: 'vertical',
                    }}
                  />
                ) : (
                  <div style={{ display: 'grid', gap: '0.6rem' }}>
                    {question.options?.map((option) => (
                      <label
                        key={option}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '10px',
                          border: '1px solid #dbeafe',
                          background: '#ffffff',
                        }}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleAnswer(question.id, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate('/tests/mood')}
                style={{
                  padding: '0.85rem 1.4rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(148, 163, 184, 0.4)',
                  background: 'transparent',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => navigate('/tests/functional')}
                style={{
                  padding: '0.85rem 1.7rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Submit and Continue
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default MobilityTest;
