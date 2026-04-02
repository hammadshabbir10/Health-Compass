import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const ANSWER_KEY = 'healthCompassAnswers';
const TEST_KEY = 'healthCompassTests';

function Results({ user, onLogout }) {
  const summary = useMemo(() => {
    const storedTests = JSON.parse(localStorage.getItem(TEST_KEY) || '[]');
    const storedAnswers = JSON.parse(localStorage.getItem(ANSWER_KEY) || '{}');

    const normalizeValue = (value) => String(value || '').trim().toLowerCase();

    const rows = storedTests.map((test) => {
      const answers = storedAnswers[test.id] || {};
      const questions = test.questions || [];
      const total = questions.length;
      const correctCount = questions.reduce((sum, question) => {
        const key = question.id;
        const value = key ? answers[key] : undefined;
        if (value === undefined || value === '' || value === null) {
          return sum;
        }

        const normalizedValue = normalizeValue(value);
        const correctAnswer = normalizeValue(question.correctAnswer);
        const acceptableAnswers = Array.isArray(question.acceptableAnswers)
          ? question.acceptableAnswers.map(normalizeValue)
          : [];
        const isCorrect = normalizedValue !== '' && (
          normalizedValue === correctAnswer || acceptableAnswers.includes(normalizedValue)
        );

        return sum + (isCorrect ? 1 : 0);
      }, 0);
      const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      return {
        id: test.id,
        title: test.title || test.id,
        correctCount,
        total,
        percent,
      };
    });

    const overallCorrect = rows.reduce((sum, row) => sum + row.correctCount, 0);
    const overallTotal = rows.reduce((sum, row) => sum + row.total, 0);
    const overallPercent = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;

    return { rows, overallCorrect, overallTotal, overallPercent };
  }, []);

  const abilityOrder = [
    { id: 'global', label: 'Global' },
    { id: 'episodic-memory', label: 'Episodic' },
    { id: 'executive', label: 'Executive' },
    { id: 'language', label: 'Language' },
    { id: 'functional', label: 'Functional' },
  ];

  const abilityScores = useMemo(() => {
    const rowMap = new Map(summary.rows.map((row) => [row.id, row]));
    return abilityOrder.map((domain) => ({
      ...domain,
      percent: rowMap.get(domain.id)?.percent ?? 0,
    }));
  }, [summary.rows]);

  const radar = useMemo(() => {
    const size = 320;
    const center = size / 2;
    const radius = 110;
    const rings = 4;
    const angleStep = (Math.PI * 2) / abilityScores.length;

    const polarToPoint = (value, index) => {
      const angle = -Math.PI / 2 + angleStep * index;
      const r = (value / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    };

    const axisPoints = abilityScores.map((_, index) => polarToPoint(100, index));
    const scorePoints = abilityScores.map((score, index) => polarToPoint(score.percent, index));

    return {
      size,
      center,
      radius,
      rings,
      axisPoints,
      scorePoints,
    };
  }, [abilityScores]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0b1736 0%, #1b2a52 55%, #1f2f5e 100%)',
        color: '#e2e8f0',
      }}
    >
      <Navbar user={user} onLogout={onLogout} />
      <main
        style={{
          maxWidth: '980px',
          margin: '0 auto',
          padding: '2.5rem 2rem 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>
          {`@keyframes glowPulse { 0% { opacity: 0.65; } 50% { opacity: 1; } 100% { opacity: 0.65; } }
            @keyframes sweepIn { 0% { transform: translateX(-8px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }`}
        </style>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35), rgba(15, 23, 42, 0))',
              top: '-120px',
              right: '-120px',
              filter: 'blur(2px)',
              animation: 'glowPulse 6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '520px',
              height: '520px',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25), rgba(15, 23, 42, 0))',
              bottom: '-220px',
              left: '-200px',
              filter: 'blur(6px)',
            }}
          />
        </div>
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
          <h2 style={{ margin: 0, fontSize: '2rem' }}>Assessment Summary</h2>
          <p style={{ marginTop: '0.6rem', color: '#cbd5f5', lineHeight: 1.7 }}>
            Scores reflect correct answers. Each question is worth 1 mark. It is not a medical diagnosis.
          </p>
          <div style={{ marginTop: '1rem', color: '#f8fafc' }}>
            Overall score: <strong>{summary.overallPercent}%</strong> ({summary.overallCorrect}/
            {summary.overallTotal} correct)
          </div>
        </div>

        {summary.rows.length === 0 ? (
          <div
            style={{
              background: '#111b3b',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: '#e2e8f0',
            }}
          >
            No test data yet. Generate your tests from the dashboard to see results.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                background: '#111b3b',
                borderRadius: '18px',
                padding: '1.6rem',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                boxShadow: '0 24px 40px -30px rgba(15, 23, 42, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '360px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '1.4rem' }}>Ability & Processing Profile</h3>
                  <p style={{ color: '#cbd5f5', lineHeight: 1.7, marginBottom: '1rem' }}>
                    Visual summary of strength areas across the five domains. Higher coverage indicates stronger
                    response accuracy for that domain.
                  </p>
                  <div style={{ display: 'grid', gap: '0.4rem', color: '#e2e8f0' }}>
                    {abilityScores.map((score) => (
                      <div
                        key={score.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '0.35rem 0.5rem',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.35)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                        }}
                      >
                        <span>{score.label}</span>
                        <span style={{ color: '#cbd5f5' }}>{score.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    background: '#0f1938',
                    borderRadius: '16px',
                    padding: '1rem',
                    border: '1px solid rgba(148, 163, 184, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 30px rgba(56, 189, 248, 0.12)',
                  }}
                >
                  <svg width={radar.size} height={radar.size} viewBox={`0 0 ${radar.size} ${radar.size}`}>
                    <defs>
                      <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.55)" />
                        <stop offset="100%" stopColor="rgba(37, 99, 235, 0.2)" />
                      </radialGradient>
                    </defs>
                    {[...Array(radar.rings)].map((_, index) => {
                      const ringRadius = ((index + 1) / radar.rings) * radar.radius;
                      return (
                        <circle
                          key={`ring-${ringRadius}`}
                          cx={radar.center}
                          cy={radar.center}
                          r={ringRadius}
                          fill="none"
                          stroke="rgba(148, 163, 184, 0.25)"
                          strokeDasharray="4 4"
                        />
                      );
                    })}
                    {radar.axisPoints.map((point, index) => (
                      <line
                        key={`axis-${abilityScores[index].id}`}
                        x1={radar.center}
                        y1={radar.center}
                        x2={point.x}
                        y2={point.y}
                        stroke="rgba(148, 163, 184, 0.35)"
                      />
                    ))}
                    <polygon
                      points={radar.axisPoints.map((point) => `${point.x},${point.y}`).join(' ')}
                      fill="rgba(37, 99, 235, 0.08)"
                      stroke="rgba(148, 163, 184, 0.35)"
                    />
                    <polygon
                      points={radar.scorePoints.map((point) => `${point.x},${point.y}`).join(' ')}
                      fill="url(#radarFill)"
                      stroke="url(#radarStroke)"
                      strokeWidth="2"
                    />
                    {radar.axisPoints.map((point, index) => (
                      <text
                        key={`label-${abilityScores[index].id}`}
                        x={point.x}
                        y={point.y}
                        fill="#e2e8f0"
                        fontSize="12"
                        textAnchor={point.x < radar.center - 10 ? 'end' : point.x > radar.center + 10 ? 'start' : 'middle'}
                        dominantBaseline={point.y < radar.center ? 'auto' : 'hanging'}
                      >
                        {abilityScores[index].label}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
            {summary.rows.map((row) => (
              <div
                key={row.id}
                style={{
                  background: 'linear-gradient(135deg, #f8fbff 0%, #eef6ff 100%)',
                  borderRadius: '16px',
                  padding: '1.2rem 1.4rem',
                  border: '1px solid #dbeafe',
                  color: '#0f172a',
                  boxShadow: '0 18px 40px -30px rgba(37, 99, 235, 0.5)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{row.title}</div>
                  <div style={{ color: '#475569' }}>{row.correctCount}/{row.total}</div>
                </div>
                <div
                  style={{
                    marginTop: '0.75rem',
                    height: '10px',
                    borderRadius: '999px',
                    background: '#e2e8f0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${row.percent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 60%, #1d4ed8 100%)',
                      animation: 'sweepIn 0.6s ease-out',
                    }}
                  />
                </div>
                <div style={{ marginTop: '0.5rem', color: '#475569' }}>Score: {row.percent}%</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link
            to="/dashboard"
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Back to Dashboard
          </Link>
          <Link
            to="/home"
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '12px',
              border: '1px solid rgba(148, 163, 184, 0.4)',
              color: '#e2e8f0',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Results;
