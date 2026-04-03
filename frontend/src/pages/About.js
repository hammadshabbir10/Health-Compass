import React, { useEffect } from 'react';
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

  .hc-about {
    min-height: 100vh;
    background: var(--cream);
    font-family: var(--font-body);
    color: var(--navy);
    overflow-x: hidden;
  }

  .bg-blob {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    opacity: 0.3;
  }
  .about-blob-1 {
    width: 460px; height: 460px;
    top: -100px; left: -100px;
    background: radial-gradient(circle, #B8D4CE, transparent 70%);
    animation: blobDrift 20s ease-in-out infinite alternate;
  }
  .about-blob-2 {
    width: 360px; height: 360px;
    bottom: 5%; right: -80px;
    background: radial-gradient(circle, rgba(212,121,58,0.35), transparent 70%);
    animation: blobDrift 24s ease-in-out infinite alternate-reverse;
  }
  @keyframes blobDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(24px, 16px) scale(1.05); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.72s cubic-bezier(.22,.68,0,1.2), transform 0.72s cubic-bezier(.22,.68,0,1.2);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

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

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    line-height: 1.12;
    color: var(--navy);
    margin-bottom: 1.2rem;
  }
  .hero-title em { font-style: italic; color: var(--sage); }

  .hero-desc {
    font-size: 1.05rem;
    color: var(--text-body);
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .hero-cta {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.85rem 1.8rem; border-radius: 999px;
    background: var(--navy); color: var(--cream);
    font-weight: 600; font-size: 0.95rem; text-decoration: none;
    transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(28, 43, 58, 0.22);
  }
  .btn-primary:hover { background: var(--navy-mid); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(28,43,58,0.28); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.85rem 1.8rem; border-radius: 999px;
    background: transparent; color: var(--navy);
    font-weight: 600; font-size: 0.95rem; text-decoration: none;
    border: 1.5px solid rgba(28, 43, 58, 0.18);
    transition: background 0.2s, border-color 0.2s, transform 0.18s;
  }
  .btn-secondary:hover { background: var(--cream-dark); border-color: rgba(28,43,58,0.28); transform: translateY(-2px); }

  .hero-visual {
    background: var(--warm-white);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }
  .hero-visual-img {
    width: 100%; height: 260px; object-fit: cover; display: block;
    transition: transform 0.6s ease;
  }
  .hero-visual:hover .hero-visual-img { transform: scale(1.03); }
  .hero-visual-body { padding: 1.6rem 1.8rem 1.8rem; color: var(--text-body); font-size: 0.93rem; line-height: 1.7; }

  /* ── Section helpers ── */
  .section { margin-top: 4.5rem; }
  .section-label {
    display: inline-block;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--sage); margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    color: var(--navy); line-height: 1.2; margin-bottom: 1.8rem;
  }

  /* ── Mission cards ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }
  .card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.6rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .card-icon {
    width: 40px; height: 40px;
    border-radius: 10px; background: var(--sage-pale);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem; margin-bottom: 0.9rem;
  }
  .card-title { font-weight: 600; color: var(--navy); margin-bottom: 0.45rem; font-size: 0.97rem; }
  .card-detail { font-size: 0.88rem; color: var(--text-body); line-height: 1.65; }

  /* ── Dark band ── */
  .dark-band {
    background: var(--navy);
    color: var(--warm-white);
    border-radius: var(--radius-xl);
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
    position: relative; overflow: hidden;
  }
  @media (max-width: 760px) { .dark-band { grid-template-columns: 1fr; gap: 1.8rem; padding: 2.2rem; } }
  .dark-band::before {
    content: '';
    position: absolute; top: -50px; right: -50px;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(107,158,145,0.2), transparent 70%);
  }
  .dark-band-title { font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2rem); margin-bottom: 0.9rem; position: relative; }
  .dark-band-text { color: #AAC0CF; line-height: 1.75; font-size: 0.93rem; margin-bottom: 1.2rem; }
  .dark-band-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .dark-band-list li {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.9rem; color: #C8D8E4;
  }
  .dark-band-list li::before {
    content: '✓';
    width: 20px; height: 20px; border-radius: 50%;
    background: rgba(107,158,145,0.25); color: #6B9E91;
    font-size: 0.7rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .impact-box {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg); padding: 1.8rem;
  }
  .impact-box h4 { font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 1rem; }
  .impact-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; padding: 0; }
  .impact-box ul li { color: #C8D8E4; font-size: 0.9rem; line-height: 1.65; padding-left: 1rem; position: relative; }
  .impact-box ul li::before { content: '—'; position: absolute; left: 0; color: #6B9E91; }

  /* ── Timeline ── */
  .timeline { display: grid; gap: 0; }
  .timeline-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1.4rem;
    align-items: start;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-year {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--sage);
    padding-top: 2px;
  }
  .timeline-content { }
  .timeline-title { font-weight: 600; color: var(--navy); margin-bottom: 0.3rem; }
  .timeline-detail { font-size: 0.9rem; color: var(--text-body); line-height: 1.65; }

  /* ── Ethics grid ── */
  .ethics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }

  /* ── CTA strip ── */
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
  @media (max-width: 640px) { .cta-strip { grid-template-columns: 1fr; padding: 2rem; } }
  .cta-strip-title { font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2rem); color: var(--navy); margin-bottom: 0.5rem; }
  .cta-strip-sub { color: #7A5230; font-size: 0.95rem; line-height: 1.65; }
  .cta-strip-actions { display: flex; gap: 0.9rem; flex-wrap: wrap; }
  .btn-amber {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.85rem 1.8rem; border-radius: 999px;
    background: var(--amber); color: #fff;
    font-weight: 600; font-size: 0.95rem; text-decoration: none;
    transition: background 0.2s, transform 0.18s;
    box-shadow: 0 4px 18px rgba(212, 121, 58, 0.3);
  }
  .btn-amber:hover { background: #C06A2F; transform: translateY(-2px); }
`;

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

const mission = [
  { icon: '🔍', title: 'Reduce uncertainty', detail: 'Guide caregivers through ambiguous symptoms with structured, clinician-informed prompts.' },
  { icon: '🛡️', title: 'Protect safety', detail: 'Elevate red flags quickly and clearly while avoiding unnecessary alarm.' },
  { icon: '💡', title: 'Build confidence', detail: 'Deliver clear, explainable summaries for family coordination and clinic handoffs.' },
];

const ethics = [
  { icon: '🔒', title: 'Data minimization', detail: 'We collect only what is needed for safe, accurate guidance — nothing more.' },
  { icon: '📋', title: 'Explainability first', detail: 'Every recommendation includes context, reasoning, and plain-language rationale.' },
  { icon: '🎛️', title: 'Caregiver control', detail: 'Families decide what to share, when to escalate, and who has access.' },
];

export default function About({ user, onLogout }) {
  useReveal();

  return (
    <div className="hc-about">
      <style>{STYLES}</style>
      <div className="bg-blob about-blob-1" />
      <div className="bg-blob about-blob-2" />

      <Navbar user={user} onLogout={onLogout} />

      <main className="hc-main">
        {/* ── Hero ── */}
        <section className="hero">
          <div>
            <div className="reveal hero-badge">About Health Compass</div>
            <h1 className="reveal reveal-delay-1 hero-title">
              Built for <em>clarity</em>, safety, and care
            </h1>
            <p className="reveal reveal-delay-2 hero-desc">
              Health Compass is a caregiver-first platform that converts confusing symptoms into structured next steps. We focus on safety, transparency, and clinical alignment to support older adults and the families who care for them.
            </p>
            <div className="reveal reveal-delay-3 hero-cta">
              <Link to="/services" className="btn-primary">Explore Services →</Link>
              <Link to="/dashboard" className="btn-secondary">Go to Dashboard</Link>
            </div>
          </div>

          <div className="reveal reveal-delay-2 hero-visual">
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=80"
              alt="Care team discussion"
              className="hero-visual-img"
            />
            <div className="hero-visual-body">
              Our assessments are grounded in geriatric care principles — prioritizing safety, early detection, and keeping caregivers both informed and empowered at every step.
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="section">
          <div className="reveal">
            <span className="section-label">Purpose</span>
            <h2 className="section-title">Our mission</h2>
          </div>
          <div className="cards-grid">
            {mission.map((m, i) => (
              <div key={m.title} className={`reveal reveal-delay-${i + 1} card`}>
                <div className="card-icon">{m.icon}</div>
                <div className="card-title">{m.title}</div>
                <p className="card-detail">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dark Band ── */}
        <section className="section">
          <div className="reveal dark-band">
            <div>
              <h2 className="dark-band-title">Clinical alignment</h2>
              <p className="dark-band-text">
                Our guardrails incorporate geriatric care workflows so caregivers can navigate uncertainty without missing urgent symptoms.
              </p>
              <ul className="dark-band-list">
                <li>Symptom escalation logic and red-flag alerts</li>
                <li>Age-aware baselines for memory and mobility changes</li>
                <li>Transparent summaries for clinician handoffs</li>
              </ul>
            </div>
            <div className="impact-box">
              <h4>Impact snapshot</h4>
              <ul>
                <li>Structured intake reduces uncertainty in early symptom changes.</li>
                <li>Clear triage steps help caregivers respond consistently.</li>
                <li>Summaries support coordinated, multi-party care plans.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Milestones ── */}
        <section className="section">
          <div className="reveal">
            <span className="section-label">Journey</span>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="timeline">
            {[
              { year: '2024', title: 'Research & Discovery', detail: 'Caregiver interviews, symptom mapping, and clinical workflow analysis.' },
              { year: '2025', title: 'Prototype Testing', detail: 'Initial tests for memory, mobility, and mood assessments with real families.' },
              { year: '2026', title: 'Platform Launch', detail: 'Full launch of Health Compass with guardrail-driven triage and adaptive assessments.' },
            ].map((item, i) => (
              <div key={item.year} className={`reveal reveal-delay-${i + 1} timeline-item`}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <div className="timeline-title">{item.title}</div>
                  <p className="timeline-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ethics ── */}
        <section className="section">
          <div className="reveal">
            <span className="section-label">Values</span>
            <h2 className="section-title">Ethics & privacy</h2>
          </div>
          <div className="ethics-grid">
            {ethics.map((e, i) => (
              <div key={e.title} className={`reveal reveal-delay-${i + 1} card`}>
                <div className="card-icon">{e.icon}</div>
                <div className="card-title">{e.title}</div>
                <p className="card-detail">{e.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="reveal cta-strip">
          <div>
            <h2 className="cta-strip-title">Join the care community</h2>
            <p className="cta-strip-sub">Start your caregiver journey with structured guidance and clear next steps.</p>
          </div>
          <div className="cta-strip-actions">
            <Link to="/signup" className="btn-amber">Create Account</Link>
            <Link to="/services" className="btn-secondary">See Services</Link>
          </div>
        </div>
      </main>
    </div>
  );
}