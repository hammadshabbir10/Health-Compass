import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfilePanel from '../components/ProfilePanel';
import QuestionPanel from '../components/QuestionPanel';
import InstructionPanel from '../components/InstructionPanel';

const baseInstructions = [
  'Use clear, simple language suitable for caregivers and older adults.',
  'Prioritize safety: identify red flags and advise urgent care when needed.',
  'Avoid diagnostic claims; provide triage guidance only.',
  'Tailor prompts to the patient profile and baseline changes.',
];

function Dashboard({ user, onLogout }) {
  const displayName = user?.name || user?.email || 'Explorer';
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
    occupation: '',
  });
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [testError, setTestError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const instructions = useMemo(() => baseInstructions, []);

  const handleProfileChange = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!profile.name || !profile.age || !profile.gender || !profile.occupation) {
      setTestError('Please complete name, age, gender, and occupation before generating tests.');
      return;
    }

    setLoadingTests(true);
    setTestError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/ai/generate-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ profile }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to generate tests');
      }

      const nextTests = data.tests || [];
      setTests(nextTests);
      localStorage.setItem('healthCompassTests', JSON.stringify(nextTests));
      setShowModal(true);
    } catch (error) {
      setTestError(error.message || 'Unable to generate tests right now.');
    } finally {
      setLoadingTests(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #f7fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        color: '#0f172a',
        fontFamily: '"Manrope", "Segoe UI", sans-serif',
      }}
    >
      <Navbar user={user} onLogout={onLogout} />
      <header
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '2rem 2rem 0',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>Welcome, {displayName}</h1>
        <p style={{ margin: '0.5rem 0 0', color: '#475569' }}>
          Build an age-aware triage flow with a professional patient profile and tailored assessments.
        </p>
      </header>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
          gap: '1.5rem',
          padding: '1.5rem 2.5rem 2.5rem',
        }}
      >
        <section
          style={{
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          <ProfilePanel profile={profile} onChange={handleProfileChange} />
          <QuestionPanel
            tests={tests}
            loading={loadingTests}
            error={testError}
            onGenerate={handleGenerate}
          />
        </section>
        <InstructionPanel instructions={instructions} />
      </main>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '1.6rem',
              maxWidth: '520px',
              width: '100%',
              border: '1px solid #e2e8f0',
              boxShadow: '0 30px 60px -35px rgba(15, 23, 42, 0.45)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Tests Ready</h3>
            <p style={{ color: '#64748b' }}>
              Your personalized assessments are ready. Start with the global assessment and complete all sections.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  navigate('/tests/global');
                }}
                style={{
                  padding: '0.75rem 1.4rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Start Tests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
