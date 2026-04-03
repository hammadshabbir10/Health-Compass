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
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 36px;
    --font-display: 'DM Serif Display', serif;
    --font-body: 'DM Sans', sans-serif;
  }

  .hc-services {
    min-height: 100vh;
    background: var(--cream);
    font-family: var(--font-body);
    color: var(--navy);
    overflow-x: hidden;
  }

  .bg-blob {
    position: fixed; border-radius: 50%; pointer-events: none;
    z-index: 0; filter: blur(80px); opacity: 0.3;
  }
  .svc-blob-1 {
    width: 500px; height: 500px; top: -100px; right: -120px;
    background: radial-gradient(circle, rgba(212,121,58,0.3), transparent 70%);
    animation: blobDrift 19s ease-in-out infinite alternate;
  }
  .svc-blob-2 {
    width: 400px; height: 400px; bottom: 10%; left: -80px;
    background: radial-gradient(circle, #B8D4CE, transparent 70%);
    animation: blobDrift 23s ease-in-out infinite alternate-reverse;
  }
  @keyframes blobDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(28px, 18px) scale(1.05); }
  }

  .reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.72s cubic-bezier(.22,.68,0,1.2), transform 0.72s cubic-bezier(.22,.68,0,1.2);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  .hc-main { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; padding: 0 2rem 6rem; }

  /* ── Hero ── */
  .hero {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center; padding: 5rem 0 4rem;
  }
  @media (max-width: 860px) { .hero { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 0 2.5rem; } }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem; border-radius: 999px;
    background: var(--sage-pale); color: var(--sage);
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 1.4rem;
    border: 1px solid rgba(74, 124, 111, 0.2);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    line-height: 1.12; color: var(--navy); margin-bottom: 1.2rem;
  }
  .hero-title em { font-style: italic; color: var(--sage); }

  .hero-desc { font-size: 1.05rem; color: var(--text-body); line-height: 1.8; margin-bottom: 2rem; }

  .hero-cta { display: flex; gap: 0.9rem; flex-wrap: wrap; }

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
    background: var(--warm-white); border-radius: var(--radius-xl);
    border: 1px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden;
  }
  .hero-visual-img { width: 100%; height: 260px; object-fit: cover; display: block; transition: transform 0.6s ease; }
  .hero-visual:hover .hero-visual-img { transform: scale(1.03); }
  .hero-visual-body { padding: 1.6rem 1.8rem 1.8rem; color: var(--text-body); font-size: 0.93rem; line-height: 1.7; }

  /* ── Section helpers ── */
  .section { margin-top: 4.5rem; }
  .section-label { display: inline-block; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.6rem; }
  .section-title { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 2.3rem); color: var(--navy); line-height: 1.2; margin-bottom: 1.8rem; }

  /* ── Pillars ── */
  .pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; }
  .pillar-card {
    background: var(--warm-white); border: 1px solid var(--border);
    border-radius: var(--radius-md); padding: 1.6rem;
    box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s;
  }
  .pillar-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .pillar-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--sage-pale); display: flex; align-items: center; justify-content: center; font-size: 1.15rem; margin-bottom: 0.9rem; }
  .pillar-title { font-weight: 600; color: var(--navy); margin-bottom: 0.4rem; font-size: 0.97rem; }
  .pillar-detail { font-size: 0.88rem; color: var(--text-body); line-height: 1.65; }

  /* ── Value delivery ── */
  .delivery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; }
  .delivery-card {
    background: linear-gradient(160deg, var(--warm-white) 0%, #F4F8F6 100%);
    border: 1px solid var(--border); border-radius: var(--radius-md);
    padding: 1.6rem; box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }
  .delivery-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .delivery-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--sage), var(--sage-light));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .delivery-card:hover::after { transform: scaleX(1); }
  .delivery-num { font-family: var(--font-display); font-size: 2rem; color: rgba(74,124,111,0.2); line-height: 1; margin-bottom: 0.6rem; }
  .delivery-title { font-weight: 600; color: var(--navy); margin-bottom: 0.4rem; font-size: 0.97rem; }
  .delivery-detail { font-size: 0.88rem; color: var(--text-body); line-height: 1.65; }

  /* ── Dark band ── */
  .dark-band {
    background: var(--navy); color: var(--warm-white);
    border-radius: var(--radius-xl); padding: 3rem;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2.5rem; align-items: start; position: relative; overflow: hidden;
  }
  @media (max-width: 760px) { .dark-band { grid-template-columns: 1fr; gap: 1.8rem; padding: 2.2rem; } }
  .dark-band::before {
    content: ''; position: absolute; top: -50px; right: -50px;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(212,121,58,0.15), transparent 70%);
  }
  .dark-band-title { font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2rem); margin-bottom: 0.9rem; position: relative; }
  .dark-band-text { color: #AAC0CF; line-height: 1.75; font-size: 0.93rem; margin-bottom: 1.2rem; }
  .plan-list { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .plan-item {
    display: flex; align-items: flex-start; gap: 0.8rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm); padding: 0.9rem 1rem;
  }
  .plan-badge {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: #6B9E91;
    background: rgba(107,158,145,0.15); border-radius: 6px;
    padding: 0.25rem 0.55rem; white-space: nowrap; margin-top: 1px;
  }
  .plan-item p { color: #C8D8E4; font-size: 0.88rem; line-height: 1.55; margin: 0; }
  .includes-box {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg); padding: 1.8rem;
  }
  .includes-box h4 { font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 1rem; }
  .includes-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; padding: 0; }
  .includes-list li { color: #C8D8E4; font-size: 0.9rem; line-height: 1.65; padding-left: 1.2rem; position: relative; }
  .includes-list li::before { content: '→'; position: absolute; left: 0; color: #6B9E91; font-size: 0.8rem; }

  /* ── FAQ ── */
  .faq-list { display: grid; gap: 0.8rem; }
  .faq-item {
    background: var(--warm-white); border: 1px solid var(--border);
    border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);
  }
  .faq-q { font-weight: 600; color: var(--navy); margin-bottom: 0.5rem; font-size: 0.97rem; }
  .faq-a { color: var(--text-body); font-size: 0.9rem; line-height: 1.65; }

  /* ── CTA strip ── */
  .cta-strip {
    background: linear-gradient(135deg, var(--amber-pale) 0%, #FEF9F0 100%);
    border: 1px solid rgba(212, 121, 58, 0.22); border-radius: var(--radius-xl);
    padding: 2.8rem 3rem; display: grid;
    grid-template-columns: 1fr auto; gap: 2rem; align-items: center; margin-top: 3.5rem;
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

const pillars = [
  { icon: '👤', title: 'Profile-driven triage', detail: 'Capture baseline context and adapt every test to the individual.' },
  { icon: '🎯', title: 'Adaptive assessments', detail: 'Memory, mood, and mobility checks adjust as symptoms evolve.' },
  { icon: '🛡️', title: 'Safety guardrails', detail: 'Red-flag alerts and escalation steps keep families protected.' },
  { icon: '📄', title: 'Care summaries', detail: 'Clear reports for caregivers, clinicians, and family members.' },
];

const delivery = [
  { num: '01', title: 'Intake & baseline', detail: 'Short onboarding captures baseline behaviors and relevant medical history.' },
  { num: '02', title: 'Guided check-ins', detail: 'Weekly or monthly prompts adjust based on past responses and changes.' },
  { num: '03', title: 'Escalation guidance', detail: 'Clear next steps surface automatically when symptoms require clinical attention.' },
  { num: '04', title: 'Progress visibility', detail: 'Timeline summaries make changes easy to spot, discuss, and share.' },
];

const faqs = [
  { q: 'How often should we run assessments?', a: 'Most caregivers start with monthly check-ins and move to weekly during periods of change or concern.' },
  { q: 'Can clinicians view summaries?', a: 'Yes. Reports are designed to be exported and shared at clinic appointments.' },
  { q: 'Does Health Compass replace medical care?', a: 'No. We provide structured decision support to complement, not replace, clinical care.' },
];

export default function Services({ user, onLogout }) {
  useReveal();

  return (
    <div className="hc-services">
      <style>{STYLES}</style>
      <div className="bg-blob svc-blob-1" />
      <div className="bg-blob svc-blob-2" />

      <Navbar user={user} onLogout={onLogout} />

      <main className="hc-main">
        {/* ── Hero ── */}
        <section className="hero">
          <div>
            <div className="reveal hero-badge">Services</div>
            <h1 className="reveal reveal-delay-1 hero-title">
              Caregiver tools that <em>scale</em> with need
            </h1>
            <p className="reveal reveal-delay-2 hero-desc">
              From onboarding to ongoing monitoring, Health Compass delivers structured assessments, proactive safety checks, and clear next steps for every stage of care.
            </p>
            <div className="reveal reveal-delay-3 hero-cta">
              <Link to="/signup" className="btn-primary">Get Started →</Link>
              <Link to="/about" className="btn-secondary">Learn About Us</Link>
            </div>
          </div>

          <div className="reveal reveal-delay-2 hero-visual">
            <img
              src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700&q=80"
              alt="Care planning session"
              className="hero-visual-img"
            />
            <div className="hero-visual-body">
              Each service tier emphasizes safety, clarity, and consistent follow-through — designed for caregivers at every stage of the journey.
            </div>
          </div>
        </section>

        {/* ── Pillars ── */}
        <section className="section">
          <div className="reveal">
            <span className="section-label">Core Services</span>
            <h2 className="section-title">Service pillars</h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={p.title} className={`reveal reveal-delay-${i + 1} pillar-card`}>
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-detail">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Delivery ── */}
        <section className="section">
          <div className="reveal">
            <span className="section-label">How We Help</span>
            <h2 className="section-title">How we deliver value</h2>
          </div>
          <div className="delivery-grid">
            {delivery.map((d, i) => (
              <div key={d.title} className={`reveal reveal-delay-${i + 1} delivery-card`}>
                <div className="delivery-num">{d.num}</div>
                <div className="delivery-title">{d.title}</div>
                <p className="delivery-detail">{d.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dark Band ── */}
        <section className="section">
          <div className="reveal dark-band">
            <div>
              <h2 className="dark-band-title">Program options</h2>
              <p className="dark-band-text">Choose a care plan that fits your caregiving stage and scale up whenever you need more support.</p>
              <ul className="plan-list">
                {[
                  { badge: 'Baseline', text: 'Monthly check-ins, progress tracking, and summary reports.' },
                  { badge: 'Active Care', text: 'Weekly assessments, safety alerts, and escalation guidance.' },
                  { badge: 'Family Sync', text: 'Shared dashboards, caregiver notes, and coordinated updates.' },
                ].map((plan) => (
                  <li key={plan.badge} className="plan-item">
                    <span className="plan-badge">{plan.badge}</span>
                    <p>{plan.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="includes-box">
              <h4>What's included</h4>
              <ul className="includes-list">
                <li>Automated symptom triage and next-step guidance</li>
                <li>Progress dashboards for caregivers and clinicians</li>
                <li>Exportable summaries formatted for clinic visits</li>
                <li>Red-flag alerts with clear escalation paths</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section">
          <div className="reveal">
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

        {/* ── CTA ── */}
        <div className="reveal cta-strip">
          <div>
            <h2 className="cta-strip-title">Start your care journey</h2>
            <p className="cta-strip-sub">Bring structure and confidence to daily caregiving with Health Compass.</p>
          </div>
          <div className="cta-strip-actions">
            <Link to="/signup" className="btn-amber">Create Account</Link>
            <Link to="/" className="btn-secondary">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}