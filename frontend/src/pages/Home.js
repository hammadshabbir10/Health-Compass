import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home({ user, onLogout }) {
  const displayName = user?.name || user?.email || 'Caregiver';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9f5f1 0%, #f3efe9 45%, #eef2f6 100%)',
        color: '#0f172a',
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .hc-fade { animation: fadeIn 0.9s ease both; }
        .hc-rise { animation: riseIn 1.05s ease both; }
        .hc-stagger { animation: riseIn 0.95s ease both; }
        .hc-page { animation: pageReveal 0.75s ease both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pageReveal { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        style={{
          position: 'absolute',
          top: '-160px',
          right: '-180px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.25) 0%, rgba(249, 115, 22, 0.06) 70%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '-140px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.18) 0%, rgba(14, 116, 144, 0.02) 70%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
      />
      <Navbar user={user} onLogout={onLogout} />
      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '3.5rem 2rem 6rem' }}>
        <section
          className="hc-page"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.8rem',
            alignItems: 'center',
          }}
        >
          <div className="hc-rise">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                background: '#111827',
                color: '#fef3c7',
                fontWeight: 600,
                fontSize: '0.85rem',
                marginBottom: '1rem',
                letterSpacing: '0.06em',
              }}
            >
              AI Product Development
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.35rem)',
                margin: 0,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Health Compass
            </h1>
            <p style={{ margin: '0.9rem 0 0', color: '#475569', fontSize: '1.05rem', lineHeight: 1.75 }}>
              A caregiver-first triage platform that translates uncertainty into clear, safe next steps.
              Health Compass combines age-aware assessments, guided intake, and explainable recommendations
              so families can act with confidence.
            </p>
            <div
              style={{
                marginTop: '1.6rem',
                padding: '1.1rem 1.3rem',
                background: 'rgba(255, 255, 255, 0.92)',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.35)',
                boxShadow: '0 22px 45px -35px rgba(15, 23, 42, 0.45)',
              }}
            >
              <strong>Welcome {displayName},</strong> build a profile once and receive tailored memory,
              mobility, and mood check-ins that adapt as your loved one changes.
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.6rem', flexWrap: 'wrap' }}>
              <Link
                to="/dashboard"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(110deg, #111827 0%, #1f2937 100%)',
                  color: '#fef3c7',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 18px 30px -22px rgba(15, 23, 42, 0.55)',
                }}
              >
                Go to Dashboard
              </Link>
              <Link
                to="/services"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(15, 23, 42, 0.2)',
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#fff7ed',
                }}
              >
                View Services
              </Link>
            </div>
          </div>
          <div
            className="hc-fade"
            style={{
              background: 'linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              boxShadow: '0 26px 60px -45px rgba(15, 23, 42, 0.45)',
            }}
          >
            <div
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                marginBottom: '1.3rem',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
                alt="Care consultation"
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif' }}>Clarity at Every Step</h3>
            <p style={{ margin: '0.7rem 0 0', color: '#475569', lineHeight: 1.7 }}>
              We translate symptoms into structured, clinician-informed check-ins and prioritize safety
              signals so families know when to monitor, schedule a visit, or seek urgent care.
            </p>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1.1rem', color: '#1f2937' }}>
              <div>Personalized test plans and follow-ups.</div>
              <div>Clear caregiver guidance with safety guardrails.</div>
              <div>Progress summaries that build confidence over time.</div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3.5rem' }}>
          <div
            className="hc-rise"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {[
              { label: 'Assessments Delivered', value: '2.4k+' },
              { label: 'Caregiver Confidence Score', value: '91%' },
              { label: 'Average Triage Time', value: '6 min' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  boxShadow: '0 18px 40px -32px rgba(15, 23, 42, 0.35)',
                }}
              >
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                <div style={{ color: '#6b7280' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>How It Works</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'Guided Intake',
                detail: 'Capture baseline context, medications, and daily routines in a few minutes.',
              },
              {
                title: 'Adaptive Test Flow',
                detail: 'Receive memory, mood, and mobility prompts tuned to the profile.',
              },
              {
                title: 'Safety-First Triage',
                detail: 'Red-flag signals trigger immediate guidance and escalation paths.',
              },
              {
                title: 'Care Plan Summary',
                detail: 'Share clear next steps with family members and clinicians.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="hc-stagger"
                style={{
                  animationDelay: `${0.08 * index}s`,
                  background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
                  borderRadius: '18px',
                  padding: '1.4rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  boxShadow: '0 20px 45px -35px rgba(15, 23, 42, 0.25)',
                }}
              >
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: '0.6rem 0 0', color: '#6b7280', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <div
            className="hc-fade"
            style={{
              background: 'linear-gradient(120deg, #0f172a 0%, #1f2937 100%)',
              color: '#f8fafc',
              borderRadius: '24px',
              padding: '2.4rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
              boxShadow: '0 30px 60px -45px rgba(15, 23, 42, 0.65)',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '0.8rem', fontFamily: '"Playfair Display", serif' }}>
                Designed for Safe Decisions
              </h2>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>
                Every flow is built with clinician feedback, covering red flags, daily function, and
                caregiver burden. We keep each recommendation transparent so you can explain it easily.
              </p>
              <div style={{ marginTop: '1.2rem', display: 'grid', gap: '0.6rem' }}>
                <div>Safety guardrails and escalation prompts.</div>
                <div>Explainable rationale for each next step.</div>
                <div>Clear language for non-clinical caregivers.</div>
              </div>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '1.4rem',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Caregiver Snapshot
              </div>
              <div style={{ color: '#cbd5f5', lineHeight: 1.7 }}>
                "The checklist kept us calm and organized. We knew which symptoms were urgent and which
                could wait for a regular appointment."
              </div>
              <div style={{ marginTop: '0.8rem', color: '#fef3c7', fontWeight: 600 }}>- Family caregiver</div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>Assessments We Run</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'Memory and Orientation',
                detail: 'Recall, sequencing, and attention prompts calibrated by age and baseline.',
              },
              {
                title: 'Mood and Wellbeing',
                detail: 'Track anxiety, sleep, and daily outlook with short, supportive check-ins.',
              },
              {
                title: 'Mobility and Balance',
                detail: 'Functional mobility prompts to detect subtle strength changes.',
              },
              {
                title: 'Daily Living Skills',
                detail: 'Monitor tasks like cooking, medication, and appointment management.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="hc-stagger"
                style={{
                  animationDelay: `${0.1 * index}s`,
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '1.4rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                }}
              >
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: '0.6rem 0 0', color: '#6b7280', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>Frequently Asked</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                q: 'Is this a diagnostic tool?',
                a: 'No. Health Compass provides decision support and structured triage only.',
              },
              {
                q: 'Who should use the tests?',
                a: 'Primary caregivers and older adults who want to track changes safely.',
              },
              {
                q: 'How are recommendations generated?',
                a: 'The platform uses profile context, symptom intake, and guardrail rules.',
              },
            ].map((item) => (
              <div
                key={item.q}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '1rem 1.2rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                }}
              >
                <strong>{item.q}</strong>
                <p style={{ margin: '0.4rem 0 0', color: '#6b7280', lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <div
            className="hc-rise"
            style={{
              background: 'linear-gradient(120deg, #fff7ed 0%, #fffbeb 100%)',
              borderRadius: '24px',
              padding: '2.2rem',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.6rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '0.6rem', fontFamily: '"Playfair Display", serif' }}>
                Ready to build a safer care plan?
              </h2>
              <p style={{ margin: 0, color: '#92400e', lineHeight: 1.7 }}>
                Start with a guided profile and let Health Compass handle the rest.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/signup"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '999px',
                  background: '#111827',
                  color: '#fef3c7',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Create Account
              </Link>
              <Link
                to="/about"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(15, 23, 42, 0.2)',
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#ffffff',
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
