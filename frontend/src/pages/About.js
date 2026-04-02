import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function About({ user, onLogout }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f4f8f6 0%, #eef3f5 45%, #f8fafc 100%)',
        color: '#0f172a',
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .hc-page { animation: pageReveal 0.8s ease 0.12s both; }
        .hc-rise { animation: riseIn 0.95s ease both; }
        @keyframes pageReveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        style={{
          position: 'absolute',
          top: '-160px',
          left: '-120px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.18) 0%, rgba(14, 116, 144, 0.04) 70%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          right: '-140px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0.03) 70%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
      />
      <Navbar user={user} onLogout={onLogout} />
      <main className="hc-page" style={{ maxWidth: '1120px', margin: '0 auto', padding: '3.5rem 2rem 6rem' }}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.6rem', alignItems: 'center' }}>
          <div className="hc-rise">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                background: '#0f172a',
                color: '#fef3c7',
                fontWeight: 600,
                letterSpacing: '0.06em',
                fontSize: '0.85rem',
              }}
            >
              About Health Compass
            </div>
            <h1 style={{ margin: '1rem 0 0', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontFamily: '"Playfair Display", serif' }}>
              Built for clarity, safety, and care
            </h1>
            <p style={{ marginTop: '0.9rem', color: '#475569', lineHeight: 1.75 }}>
              Health Compass is a caregiver-first platform that converts confusing symptoms into structured
              next steps. We focus on safety, transparency, and clinical alignment to support older adults
              and the families who care for them.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.6rem', flexWrap: 'wrap' }}>
              <Link
                to="/services"
                style={{
                  padding: '0.7rem 1.6rem',
                  borderRadius: '999px',
                  background: '#0f172a',
                  color: '#fef3c7',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Explore Services
              </Link>
              <Link
                to="/dashboard"
                style={{
                  padding: '0.7rem 1.6rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(15, 23, 42, 0.2)',
                  color: '#0f172a',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#ffffff',
                }}
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '1.8rem',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              boxShadow: '0 26px 55px -45px rgba(15, 23, 42, 0.4)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
              alt="Care team discussion"
              style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '18px', display: 'block' }}
            />
            <div style={{ marginTop: '1rem', color: '#475569', lineHeight: 1.65 }}>
              Our assessments are grounded in geriatric care principles, prioritizing safety and early
              detection while keeping caregivers informed and empowered.
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>Our Mission</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            {[
              {
                title: 'Reduce uncertainty',
                detail: 'Guide caregivers through ambiguous symptoms with structured prompts.',
              },
              {
                title: 'Protect safety',
                detail: 'Elevate red flags quickly while avoiding unnecessary panic.',
              },
              {
                title: 'Build confidence',
                detail: 'Deliver clear, explainable summaries for family coordination.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.3rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                }}
              >
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: '0.6rem 0 0', color: '#6b7280', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <div
            style={{
              background: 'linear-gradient(120deg, #0f172a 0%, #1f2937 100%)',
              color: '#f8fafc',
              borderRadius: '24px',
              padding: '2.2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              boxShadow: '0 28px 58px -45px rgba(15, 23, 42, 0.6)',
            }}
          >
            <div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '0.8rem' }}>Clinical alignment</h2>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>
                Our guardrails incorporate geriatric care workflows so caregivers can navigate uncertainty
                without missing urgent symptoms.
              </p>
              <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem', color: '#e2e8f0' }}>
                <div>Symptom escalation logic and red-flag alerts.</div>
                <div>Age-aware baselines for memory and mobility changes.</div>
                <div>Transparent summaries for clinician handoffs.</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '1.4rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <h4 style={{ marginTop: 0 }}>Impact snapshot</h4>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5f5', lineHeight: 1.7 }}>
                <li>Structured intake reduces uncertainty in early symptom changes.</li>
                <li>Clear triage steps help caregivers respond consistently.</li>
                <li>Summaries support coordinated family care plans.</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>Milestones</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { year: '2024', detail: 'Caregiver interviews and symptom mapping research.' },
              { year: '2025', detail: 'Prototype tests for memory, mobility, and mood assessments.' },
              { year: '2026', detail: 'Launch of Health Compass with guardrail-driven triage.' },
            ].map((item) => (
              <div
                key={item.year}
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '1rem 1.2rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0f172a', minWidth: '64px' }}>{item.year}</div>
                <div style={{ color: '#6b7280' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>Ethics and Privacy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {[
              {
                title: 'Data minimization',
                detail: 'Collect only what we need for safe, accurate guidance.',
              },
              {
                title: 'Explainability first',
                detail: 'Every recommendation includes context and reasoning.',
              },
              {
                title: 'Caregiver control',
                detail: 'Families decide what to share and when to escalate.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.3rem',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                }}
              >
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: '0.6rem 0 0', color: '#6b7280', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <div
            style={{
              background: 'linear-gradient(120deg, #fff7ed 0%, #fffbeb 100%)',
              borderRadius: '24px',
              padding: '2.1rem',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '0.5rem' }}>
                Join the care community
              </h2>
              <p style={{ margin: 0, color: '#92400e', lineHeight: 1.7 }}>
                Start your caregiver journey with structured guidance and clear next steps.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/signup"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  background: '#0f172a',
                  color: '#fef3c7',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Create Account
              </Link>
              <Link
                to="/services"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(15, 23, 42, 0.2)',
                  color: '#0f172a',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#ffffff',
                }}
              >
                See Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
