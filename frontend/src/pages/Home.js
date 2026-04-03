import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

  .hc-home {
    min-height: 100vh;
    background: var(--cream);
    font-family: var(--font-body);
    color: var(--navy);
    overflow-x: hidden;
  }

  /* ── Animated background blobs ── */
  .bg-blob {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    opacity: 0.35;
  }
  .bg-blob-1 {
    width: 520px; height: 520px;
    top: -120px; right: -80px;
    background: radial-gradient(circle, #B8D4CE, #6B9E9100);
    animation: blobDrift 18s ease-in-out infinite alternate;
  }
  .bg-blob-2 {
    width: 400px; height: 400px;
    bottom: 10%; left: -100px;
    background: radial-gradient(circle, #D4793A44, #D4793A00);
    animation: blobDrift 22s ease-in-out infinite alternate-reverse;
  }
  @keyframes blobDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 20px) scale(1.06); }
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.72s cubic-bezier(.22,.68,0,1.2), transform 0.72s cubic-bezier(.22,.68,0,1.2);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* ── Layout ── */
  .hc-main {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 2rem 6rem;
  }

  /* ── Hero ── */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 5rem 0 4rem;
  }
  @media (max-width: 860px) {
    .hero { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 0 2.5rem; }
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    background: var(--sage-pale);
    color: var(--sage);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.4rem;
    border: 1px solid rgba(74, 124, 111, 0.2);
  }
  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sage);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 5vw, 3.8rem);
    line-height: 1.12;
    color: var(--navy);
    margin-bottom: 1.2rem;
  }
  .hero-title em {
    font-style: italic;
    color: var(--sage);
  }

  .hero-desc {
    font-size: 1.05rem;
    color: var(--text-body);
    line-height: 1.8;
    margin-bottom: 2rem;
    max-width: 480px;
  }

  .hero-cta {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.8rem;
    border-radius: 999px;
    background: var(--navy);
    color: var(--cream);
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(28, 43, 58, 0.22);
  }
  .btn-primary:hover {
    background: var(--navy-mid);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(28, 43, 58, 0.28);
  }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.8rem;
    border-radius: 999px;
    background: transparent;
    color: var(--navy);
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    border: 1.5px solid rgba(28, 43, 58, 0.18);
    transition: background 0.2s, border-color 0.2s, transform 0.18s;
  }
  .btn-secondary:hover {
    background: var(--cream-dark);
    border-color: rgba(28, 43, 58, 0.28);
    transform: translateY(-2px);
  }

  /* ── Hero visual card ── */
  .hero-card {
    background: var(--warm-white);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    position: relative;
  }
  .hero-card-img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }
  .hero-card:hover .hero-card-img { transform: scale(1.03); }
  .hero-card-body {
    padding: 1.6rem 1.8rem 1.8rem;
  }
  .hero-card-title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    margin-bottom: 0.6rem;
    color: var(--navy);
  }
  .hero-card-text {
    color: var(--text-body);
    font-size: 0.93rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  .hero-card-features {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.88rem;
    color: var(--text-body);
  }
  .feature-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--sage);
    flex-shrink: 0;
  }

  /* ── Welcome banner ── */
  .welcome-banner {
    background: linear-gradient(135deg, var(--sage-pale) 0%, #D6E9E5 100%);
    border: 1px solid rgba(74, 124, 111, 0.22);
    border-radius: var(--radius-lg);
    padding: 1.4rem 1.8rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .welcome-icon {
    font-size: 1.6rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .welcome-text strong { color: var(--navy); font-weight: 600; }
  .welcome-text p { margin-top: 0.2rem; font-size: 0.9rem; color: var(--text-body); line-height: 1.6; }

  /* ── Stats row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin: 3.5rem 0;
  }
  @media (max-width: 600px) { .stats-row { grid-template-columns: 1fr; } }

  .stat-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.6rem;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .stat-value {
    font-family: var(--font-display);
    font-size: 2.4rem;
    color: var(--navy);
    line-height: 1;
    margin-bottom: 0.4rem;
  }
  .stat-label { font-size: 0.85rem; color: var(--slate); font-weight: 500; }

  /* ── Section headers ── */
  .section-header {
    margin-bottom: 2rem;
  }
  .section-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    color: var(--navy);
    line-height: 1.2;
  }

  /* ── How it works ── */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }
  .step-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.6rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }
  .step-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .step-num {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--navy);
    color: var(--cream);
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .step-title { font-weight: 600; color: var(--navy); margin-bottom: 0.5rem; font-size: 0.98rem; }
  .step-detail { font-size: 0.88rem; color: var(--text-body); line-height: 1.65; }

  /* ── Dark CTA band ── */
  .dark-band {
    background: var(--navy);
    color: var(--warm-white);
    border-radius: var(--radius-xl);
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: center;
    margin: 3.5rem 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 760px) {
    .dark-band { grid-template-columns: 1fr; gap: 1.8rem; padding: 2.2rem; }
  }
  .dark-band::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(107,158,145,0.18), transparent 70%);
  }
  .dark-band-title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 2.5vw, 2.1rem);
    margin-bottom: 1rem;
    position: relative;
  }
  .dark-band-text {
    color: #AAC0CF;
    line-height: 1.75;
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
  .dark-band-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .dark-band-list li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    color: #C8D8E4;
  }
  .dark-band-list li::before {
    content: '✓';
    width: 20px; height: 20px;
    border-radius: 50%;
    background: rgba(107,158,145,0.25);
    color: #6B9E91;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .testimonial-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg);
    padding: 1.8rem;
  }
  .testimonial-card p { color: #C8D8E4; line-height: 1.75; font-size: 0.95rem; font-style: italic; margin-bottom: 1rem; }
  .testimonial-card cite { color: #6B9E91; font-weight: 600; font-style: normal; font-size: 0.9rem; }

  /* ── Assessments grid ── */
  .assessments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }
  .assessment-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.6rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .assessment-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .assessment-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    background: var(--sage-pale);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .assessment-title { font-weight: 600; color: var(--navy); margin-bottom: 0.4rem; }
  .assessment-detail { font-size: 0.88rem; color: var(--text-body); line-height: 1.65; }

  /* ── FAQ ── */
  .faq-list { display: grid; gap: 0.8rem; }
  .faq-item {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.3rem 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  .faq-q { font-weight: 600; color: var(--navy); margin-bottom: 0.5rem; font-size: 0.97rem; }
  .faq-a { color: var(--text-body); font-size: 0.9rem; line-height: 1.65; }

  /* ── CTA bottom strip ── */
  .cta-strip {
    background: linear-gradient(135deg, var(--amber-pale) 0%, #FEF9F0 100%);
    border: 1px solid rgba(212, 121, 58, 0.22);
    border-radius: var(--radius-xl);
    padding: 2.8rem 3rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
    margin-top: 3.5rem;
  }
  @media (max-width: 640px) {
    .cta-strip { grid-template-columns: 1fr; padding: 2rem; }
  }
  .cta-strip-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  .cta-strip-sub { color: #7A5230; font-size: 0.95rem; line-height: 1.65; }
  .cta-strip-actions { display: flex; gap: 0.9rem; flex-wrap: wrap; }

  .btn-amber {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.85rem 1.8rem;
    border-radius: 999px;
    background: var(--amber);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background 0.2s, transform 0.18s;
    box-shadow: 0 4px 18px rgba(212, 121, 58, 0.3);
  }
  .btn-amber:hover { background: #C06A2F; transform: translateY(-2px); }

  /* ── Divider ── */
  .section { margin-top: 4.5rem; }
`;

const assessments = [
  { icon: '🧠', title: 'Memory & Orientation', detail: 'Recall, sequencing, and attention prompts calibrated by age and baseline.' },
  { icon: '💬', title: 'Mood & Wellbeing', detail: 'Track anxiety, sleep quality, and daily outlook with supportive check-ins.' },
  { icon: '🚶', title: 'Mobility & Balance', detail: 'Functional mobility prompts to detect subtle strength or coordination changes.' },
  { icon: '🏡', title: 'Daily Living Skills', detail: 'Monitor tasks like cooking, medication adherence, and appointment management.' },
];

const steps = [
  { num: '01', title: 'Guided Intake', detail: 'Capture baseline context, medications, and daily routines in a few minutes.' },
  { num: '02', title: 'Adaptive Test Flow', detail: 'Receive memory, mood, and mobility prompts tuned to the individual profile.' },
  { num: '03', title: 'Safety-First Triage', detail: 'Red-flag signals trigger immediate guidance and escalation paths.' },
  { num: '04', title: 'Care Plan Summary', detail: 'Share clear next steps with family members and clinicians.' },
];

const faqs = [
  { q: 'Is this a diagnostic tool?', a: 'No. Health Compass provides decision support and structured triage only. Always consult a qualified clinician for diagnosis.' },
  { q: 'Who should use the tests?', a: 'Primary caregivers and older adults who want to track cognitive and functional changes safely over time.' },
  { q: 'How are recommendations generated?', a: 'The platform uses profile context, symptom intake, and clinician-informed guardrail rules to surface clear next steps.' },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home({ user, onLogout }) {
  useReveal();
  const displayName = user?.name || user?.email || 'Caregiver';

  return (
    <div className="hc-home">
      <style>{STYLES}</style>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />

      <Navbar user={user} onLogout={onLogout} />

      <main className="hc-main">
        {/* ── Hero ── */}
        <section className="hero">
          <div>
            <div className="reveal welcome-banner" style={{ marginBottom: '1.8rem' }}>
              <span className="welcome-icon">👋</span>
              <div className="welcome-text">
                <strong>Welcome back, {displayName}</strong>
                <p>Build a profile once and receive tailored memory, mobility, and mood check-ins that adapt as your loved one's needs change.</p>
              </div>
            </div>

            <div className="reveal reveal-delay-1 hero-badge">Caregiver-First Platform</div>

            <h1 className="reveal reveal-delay-2 hero-title">
              Navigate care with <em>clarity</em> and confidence
            </h1>

            <p className="reveal reveal-delay-3 hero-desc">
              Health Compass translates uncertain symptoms into structured, safe next steps — combining age-aware assessments, guided intake, and explainable recommendations so families can act decisively.
            </p>

            <div className="reveal reveal-delay-4 hero-cta">
              <Link to="/dashboard" className="btn-primary">Go to Dashboard →</Link>
              <Link to="/services" className="btn-secondary">View Services</Link>
            </div>
          </div>

          <div className="reveal reveal-delay-2 hero-card">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80"
              alt="Care consultation"
              className="hero-card-img"
            />
            <div className="hero-card-body">
              <div className="hero-card-title">Clarity at Every Step</div>
              <p className="hero-card-text">
                We translate symptoms into clinician-informed check-ins and prioritize safety signals — so families always know whether to monitor, schedule a visit, or seek urgent care.
              </p>
              <div className="hero-card-features">
                {['Personalized test plans with adaptive follow-ups', 'Clear caregiver guidance with safety guardrails', 'Progress summaries that build confidence over time'].map((f) => (
                  <div key={f} className="feature-item">
                    <span className="feature-dot" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="stats-row">
          {[
            { value: '2.4k+', label: 'Assessments Delivered' },
            { value: '91%', label: 'Caregiver Confidence Score' },
            { value: '6 min', label: 'Average Triage Time' },
          ].map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1} stat-card`}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── How It Works ── */}
        <section className="section">
          <div className="reveal section-header">
            <span className="section-label">Process</span>
            <h2 className="section-title">How it works</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.title} className={`reveal reveal-delay-${i + 1} step-card`}>
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-detail">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dark Band ── */}
        <div className="reveal dark-band">
          <div>
            <h2 className="dark-band-title">Designed for safe decisions</h2>
            <p className="dark-band-text">
              Every flow is built with clinician feedback, covering red flags, daily function, and caregiver burden. We keep each recommendation transparent so you can explain it easily.
            </p>
            <ul className="dark-band-list">
              <li>Safety guardrails and escalation prompts built in</li>
              <li>Explainable rationale for every next step</li>
              <li>Plain language designed for non-clinical caregivers</li>
            </ul>
          </div>
          <div className="testimonial-card">
            <p>"The checklist kept us calm and organized. We knew which symptoms were urgent and which could wait for a regular appointment."</p>
            <cite>— Family caregiver</cite>
          </div>
        </div>

        {/* ── Assessments ── */}
        <section className="section">
          <div className="reveal section-header">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">Assessments we run</h2>
          </div>
          <div className="assessments-grid">
            {assessments.map((a, i) => (
              <div key={a.title} className={`reveal reveal-delay-${i + 1} assessment-card`}>
                <div className="assessment-icon">{a.icon}</div>
                <div className="assessment-title">{a.title}</div>
                <p className="assessment-detail">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section">
          <div className="reveal section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently asked</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={f.q} className={`reveal reveal-delay-${i + 1} faq-item`}>
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <div className="reveal cta-strip">
          <div>
            <h2 className="cta-strip-title">Ready to build a safer care plan?</h2>
            <p className="cta-strip-sub">Start with a guided profile and let Health Compass handle the rest.</p>
          </div>
          <div className="cta-strip-actions">
            <Link to="/signup" className="btn-amber">Create Account</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </main>
    </div>
  );
}