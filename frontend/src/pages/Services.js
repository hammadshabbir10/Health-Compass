import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Services({ user, onLogout }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fffaf3 0%, #fef6e8 45%, #f8fafc 100%)',
        color: '#0f172a',
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .hc-page { animation: pageReveal 0.8s ease 0.15s both; }
        .hc-rise { animation: riseIn 0.95s ease both; }
        @keyframes pageReveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-130px',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(251, 191, 36, 0.04) 70%)',
          filter: 'blur(16px)',
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
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.2) 0%, rgba(14, 116, 144, 0.03) 70%)',
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
              Services
            </div>
            <h1 style={{ margin: '1rem 0 0', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontFamily: '"Playfair Display", serif' }}>
              Caregiver tools that scale with need
            </h1>
            <p style={{ marginTop: '0.9rem', color: '#475569', lineHeight: 1.75 }}>
              From onboarding to ongoing monitoring, Health Compass delivers structured assessments,
              proactive safety checks, and clear next steps for every stage of care.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.6rem', flexWrap: 'wrap' }}>
              <Link
                to="/signup"
                style={{
                  padding: '0.7rem 1.6rem',
                  borderRadius: '999px',
                  background: '#0f172a',
                  color: '#fef3c7',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Get Started
              </Link>
              <Link
                to="/about"
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
                Learn About Us
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
              alt="Care planning session"
              style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '18px', display: 'block' }}
            />
            <div style={{ marginTop: '1rem', color: '#475569', lineHeight: 1.65 }}>
              Each service tier emphasizes safety, clarity, and consistent follow-through for caregivers.
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>Service Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            {[
              {
                title: 'Profile-driven triage',
                detail: 'Capture baseline context and adapt every test to the individual.',
              },
              {
                title: 'Adaptive assessments',
                detail: 'Memory, mood, and mobility checks adjust as symptoms evolve.',
              },
              {
                title: 'Safety guardrails',
                detail: 'Red-flag alerts and escalation steps keep families protected.',
              },
              {
                title: 'Care summaries',
                detail: 'Clear reports for caregivers, clinicians, and family members.',
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
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>How We Deliver Value</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.3rem' }}>
            {[
              {
                title: 'Intake and baseline',
                detail: 'Short onboarding flow captures baseline behaviors and medical history.',
              },
              {
                title: 'Guided check-ins',
                detail: 'Weekly or monthly prompts adjust based on past responses.',
              },
              {
                title: 'Escalation guidance',
                detail: 'Clear next steps when symptoms indicate clinical attention.',
              },
              {
                title: 'Progress visibility',
                detail: 'Timeline summaries make changes easy to spot and share.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
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
              <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '0.8rem' }}>Program options</h2>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>
                Choose a care plan that fits your stage of caregiving and scale up when you need more help.
              </p>
              <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem', color: '#e2e8f0' }}>
                <div>Baseline: monthly check-ins and summary reports.</div>
                <div>Active care: weekly assessments and safety alerts.</div>
                <div>Family sync: shared dashboards and caregiver notes.</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '1.4rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <h4 style={{ marginTop: 0 }}>Includes</h4>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5f5', lineHeight: 1.7 }}>
                <li>Automated symptom triage and next-step guidance.</li>
                <li>Progress dashboards for caregivers and clinicians.</li>
                <li>Exportable summaries for clinic visits.</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3.8rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>FAQ</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                q: 'How often should we run assessments?',
                a: 'Most caregivers start with monthly check-ins and move to weekly during changes.',
              },
              {
                q: 'Can clinicians view summaries?',
                a: 'Yes. Reports are designed to be shared during appointments.',
              },
              {
                q: 'Does Health Compass replace medical care?',
                a: 'No. We provide structured guidance to support, not replace, clinical care.',
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
                Start your care journey
              </h2>
              <p style={{ margin: 0, color: '#92400e', lineHeight: 1.7 }}>
                Bring structure and confidence to daily caregiving with Health Compass.
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
                to="/home"
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
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Services;
