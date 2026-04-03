import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfilePanel from '../components/ProfilePanel';
import QuestionPanel from '../components/QuestionPanel';
import InstructionPanel from '../components/InstructionPanel';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #FAF7F2;
    --cream-dark: #F0EBE1;
    --sage: #4A7C6F;
    --sage-light: #6B9E91;
    --sage-pale: #E8F0EE;
    --navy: #1C2B3A;
    --navy-mid: #2D4055;
    --slate: #5A6A7A;
    --warm-white: #FDFCFA;
    --amber: #D4793A;
    --amber-pale: #FDF0E6;
    --text-body: #3D4E5C;
    --border: rgba(74, 124, 111, 0.15);
    --shadow-sm: 0 2px 12px rgba(28, 43, 58, 0.06);
    --shadow-md: 0 8px 32px rgba(28, 43, 58, 0.10);
    --shadow-lg: 0 20px 60px rgba(28, 43, 58, 0.14);
    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 36px;
    --font-display: 'DM Serif Display', serif;
    --font-body: 'DM Sans', sans-serif;
  }

  .hc-dashboard {
    min-height: 100vh;
    background: var(--cream);
    font-family: var(--font-body);
    color: var(--navy);
    overflow-x: hidden;
  }

  .hc-dashboard::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 60% 40% at 80% 10%, rgba(107,158,145,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 35% at 10% 85%, rgba(212,121,58,0.08) 0%, transparent 60%);
  }

  .dash-header {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 2.5rem 2.5rem 0;
    display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem;
    flex-wrap: wrap;
  }
  .dash-header-left {}
  .dash-greeting {
    font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--sage); margin-bottom: 0.35rem;
  }
  .dash-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    color: var(--navy); line-height: 1.1;
  }
  .dash-subtitle { margin-top: 0.5rem; color: var(--text-body); font-size: 0.95rem; line-height: 1.6; }

  .dash-status {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--warm-white); border: 1px solid var(--border);
    border-radius: 999px; padding: 0.5rem 1.1rem;
    font-size: 0.82rem; color: var(--text-body); white-space: nowrap;
    box-shadow: var(--shadow-sm);
  }
  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--sage); flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .dash-main {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 1.8rem 2.5rem 4rem;
    display: grid;
    grid-template-columns: minmax(300px, 1.1fr) minmax(300px, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 900px) {
    .dash-main { grid-template-columns: 1fr; }
    .dash-header { padding: 2rem 1.5rem 0; }
    .dash-main { padding: 1.5rem 1.5rem 3rem; }
  }

  .dash-left { display: flex; flex-direction: column; gap: 1.5rem; }
  .dash-right { display: flex; flex-direction: column; }

  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(28, 43, 58, 0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.25s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--warm-white);
    border-radius: var(--radius-xl);
    padding: 0;
    max-width: 560px; width: 100%;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    animation: slideUp 0.3s cubic-bezier(.22,.68,0,1.2);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-header {
    background: var(--navy);
    color: var(--warm-white);
    padding: 1.8rem 2rem 1.6rem;
    position: relative; overflow: hidden;
  }
  .modal-header::before {
    content: ''; position: absolute; top: -40px; right: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    background: radial-gradient(circle, rgba(107,158,145,0.2), transparent 70%);
  }
  .modal-check {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(107,158,145,0.2); border: 1px solid rgba(107,158,145,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 1rem; position: relative;
  }
  .modal-header h3 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.4rem; position: relative; }
  .modal-header p { color: #AAC0CF; font-size: 0.9rem; line-height: 1.6; position: relative; }

  .modal-body { padding: 1.8rem 2rem 2rem; }

  .mode-cards { display: grid; gap: 1rem; margin-bottom: 1.5rem; }

  .mode-card {
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.3rem 1.4rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
    background: var(--cream);
    display: flex; gap: 1rem; align-items: flex-start;
  }
  .mode-card:hover {
    border-color: var(--sage);
    background: var(--sage-pale);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .mode-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--warm-white); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; flex-shrink: 0;
  }

  .mode-card-content {}
  .mode-card-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem; }
  .mode-card-label { font-weight: 600; color: var(--navy); font-size: 1rem; }
  .mode-rec {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; background: var(--sage); color: #fff;
    border-radius: 6px; padding: 0.2rem 0.5rem;
  }
  .mode-card-desc { font-size: 0.87rem; color: var(--text-body); line-height: 1.6; }

  .modal-cancel {
    padding: 0.7rem 1.4rem; border-radius: var(--radius-sm);
    border: 1.5px solid var(--border); background: transparent;
    color: var(--slate); cursor: pointer; font-size: 0.88rem;
    font-family: var(--font-body); transition: background 0.2s, color 0.2s;
  }
  .modal-cancel:hover { background: var(--cream-dark); color: var(--navy); }
`;

const baseInstructions = [
  'Complete patient profile including education level for accurate MoCA-norm scoring.',
  'Assessment follows MoCA/MMSE clinical standards adapted to MCQ format.',
  'Questions are tailored to patient age, education, and occupation.',
  'Results provide MoCA-equivalent scores with clinical interpretation guidelines.',
  'Choose between Standard Mode (all questions) or Adaptive Mode (GRE-style).',
];

export default function Dashboard({ user, onLogout }) {
  const displayName = user?.name || user?.email || 'Explorer';
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    // Basic Info
    name: user?.name || '',
    age: '',
    gender: '',
    ethnicity: '',
    occupation: '',
    education: '',
    language: 'english',
    handedness: 'right',
    
    // Clinical Measurements
    bmi: '',
    smoking: '',
    alcohol: '',
    physical_activity: '',
    diet_quality: '',
    sleep_quality: '',
    
    // Medical History (Yes/No)
    family_history: false,
    cardiovascular_disease: false,
    diabetes: false,
    depression: false,
    head_injury: false,
    hypertension: false,
    
    // Vital Signs (Optional - can be collected if available)
    systolic_bp: '',
    diastolic_bp: '',
    cholesterol_total: '',
    cholesterol_ldl: '',
    cholesterol_hdl: '',
    cholesterol_triglycerides: '',
    
    medicalFlags: [],
  });
  
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [testError, setTestError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const instructions = useMemo(() => baseInstructions, []);

  const handleProfileChange = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  // Load saved profile on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('healthCompassProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (e) {
        console.error('Error loading saved profile:', e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    const requiredFields = ['name', 'age', 'gender', 'occupation', 'education'];
    const missingFields = requiredFields.filter((field) => !profile[field]);
    if (missingFields.length > 0) {
      setTestError(`Please complete: ${missingFields.join(', ')} before generating tests.`);
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
      if (!data.success) throw new Error(data.message || 'Failed to generate tests');
      const nextTests = data.tests || [];
      setTests(nextTests);
      localStorage.setItem('healthCompassTests', JSON.stringify(nextTests));
      localStorage.setItem('healthCompassProfile', JSON.stringify(profile));
      localStorage.setItem('healthCompassMetadata', JSON.stringify(data.metadata || {}));
      localStorage.removeItem('healthCompassAnswers');
      localStorage.removeItem('healthCompassAdaptiveState');
      setShowModal(true);
    } catch (error) {
      setTestError(error.message || 'Unable to generate tests right now.');
    } finally {
      setLoadingTests(false);
    }
  };

  const startTest = (mode) => {
    setShowModal(false);
    if (mode === 'adaptive') {
      navigate('/tests/adaptive');
    } else {
      navigate('/tests/global');
    }
  };

  return (
    <div className="hc-dashboard">
      <style>{STYLES}</style>

      <Navbar user={user} onLogout={onLogout} />

      <header className="dash-header">
        <div className="dash-header-left">
          <div className="dash-greeting">Caregiver Dashboard</div>
          <h1 className="dash-title">Welcome, {displayName}</h1>
          <p className="dash-subtitle">MoCA-standard cognitive assessment with adaptive testing capabilities.</p>
        </div>
        <div className="dash-status">
          <span className="status-dot" />
          System ready
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-left">
          <ProfilePanel profile={profile} onChange={handleProfileChange} />
          <QuestionPanel
            tests={tests}
            loading={loadingTests}
            error={testError}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="dash-right">
          <InstructionPanel instructions={instructions} />
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-check">✓</div>
              <h3>Assessment Ready</h3>
              <p>Your personalized MoCA-standard cognitive assessment has been generated. Choose your testing mode below.</p>
            </div>

            <div className="modal-body">
              <div className="mode-cards">
                <div className="mode-card" onClick={() => startTest('standard')}>
                  <div className="mode-card-icon">📋</div>
                  <div className="mode-card-content">
                    <div className="mode-card-head">
                      <span className="mode-card-label">Standard Mode</span>
                    </div>
                    <p className="mode-card-desc">
                      Complete all 60 questions across 5 cognitive domains. Traditional assessment format with all questions visible per section.
                    </p>
                  </div>
                </div>

                <div className="mode-card" onClick={() => startTest('adaptive')}>
                  <div className="mode-card-icon">🎯</div>
                  <div className="mode-card-content">
                    <div className="mode-card-head">
                      <span className="mode-card-label">Adaptive Mode</span>
                      <span className="mode-rec">Recommended</span>
                    </div>
                    <p className="mode-card-desc">
                      GRE-style adaptive testing. One question at a time with difficulty adjusting based on performance. More accurate in less time.
                    </p>
                  </div>
                </div>
              </div>

              <button type="button" className="modal-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}