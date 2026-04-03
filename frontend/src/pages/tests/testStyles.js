// ── Shared Test Page Styles ──
// Import this constant in each test file

export const TEST_STYLES = `
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

  /* ── Root ── */
  .tp-root {
    min-height: 100vh;
    background: var(--cream);
    font-family: var(--font-body);
    color: var(--navy);
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background blobs ── */
  .tp-blob {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    opacity: 0.28;
  }
  .tp-blob-1 {
    width: 500px; height: 500px;
    top: -120px; right: -80px;
    background: radial-gradient(circle, #B8D4CE, #6B9E9100);
    animation: tpBlobDrift 18s ease-in-out infinite alternate;
  }
  .tp-blob-2 {
    width: 380px; height: 380px;
    bottom: 5%; left: -100px;
    background: radial-gradient(circle, #D4793A44, #D4793A00);
    animation: tpBlobDrift 22s ease-in-out infinite alternate-reverse;
  }
  @keyframes tpBlobDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 20px) scale(1.06); }
  }

  /* ── Main content ── */
  .tp-main {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 2rem 5rem;
  }

  /* ── Animations ── */
  @keyframes tpRise {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tpBarSweep {
    from { width: 0; }
  }

  /* ── Hero card (test header) ── */
  .tp-hero {
    background: var(--navy);
    border-radius: var(--radius-xl);
    padding: 2rem;
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 1.5rem;
    align-items: center;
    position: relative;
    overflow: hidden;
    animation: tpRise 0.6s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 600px) { .tp-hero { grid-template-columns: 1fr; } }

  .tp-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(107,158,145,0.2), transparent 70%);
    pointer-events: none;
  }

  .tp-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: rgba(107,158,145,0.18);
    color: var(--sage-light);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    margin-bottom: 0.7rem;
    border: 1px solid rgba(107,158,145,0.3);
  }

  .tp-hero-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--cream);
    margin-bottom: 0.5rem;
    line-height: 1.15;
    position: relative;
  }

  .tp-hero-desc {
    font-size: 0.9rem;
    color: rgba(250,247,242,0.62);
    line-height: 1.7;
    position: relative;
  }

  .tp-hero-img-wrap {
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    position: relative;
  }
  .tp-hero-img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    display: block;
    filter: saturate(0.85) brightness(0.8);
  }
  .tp-hero-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(28,43,58,0.6) 100%);
  }

  /* ── Info panel (Why This Matters) ── */
  .tp-info {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.4rem 1.6rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-sm);
    animation: tpRise 0.6s 0.05s cubic-bezier(.22,.68,0,1.2) both;
  }
  .tp-info-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--navy);
    margin-bottom: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .tp-info-title::before {
    content: '';
    width: 3px; height: 18px;
    border-radius: 2px;
    background: var(--sage);
    flex-shrink: 0;
  }

  /* table variant */
  .tp-info-table { width: 100%; border-collapse: collapse; }
  .tp-info-table tr { border-bottom: 1px solid var(--border); }
  .tp-info-table tr:last-child { border-bottom: none; }
  .tp-info-table td { padding: 0.6rem 0.5rem; font-size: 0.875rem; color: var(--text-body); vertical-align: top; }
  .tp-info-table td:first-child { font-weight: 600; color: var(--navy); white-space: nowrap; padding-right: 1rem; }
  .tp-info-table td:nth-child(2) { color: var(--sage); }

  /* list variant */
  .tp-info-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
  .tp-info-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    font-size: 0.875rem;
    color: var(--text-body);
    line-height: 1.6;
  }
  .tp-info-list li::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sage);
    flex-shrink: 0;
    margin-top: 6px;
  }

  /* ── Not ready state ── */
  .tp-not-ready {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    animation: tpRise 0.6s 0.08s cubic-bezier(.22,.68,0,1.2) both;
  }
  .tp-not-ready-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  .tp-not-ready-text {
    font-size: 0.9rem;
    color: var(--slate);
    line-height: 1.65;
    margin-bottom: 1.2rem;
  }

  /* ── Question form ── */
  .tp-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    animation: tpRise 0.6s 0.08s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* ── Question card ── */
  .tp-q-card {
    background: var(--warm-white);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.3rem 1.4rem;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .tp-q-card:hover { border-color: rgba(74,124,111,0.28); box-shadow: var(--shadow-md); }

  .tp-q-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px; height: 26px;
    border-radius: 8px;
    background: var(--navy);
    color: var(--cream);
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
  }

  .tp-q-text {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--navy);
    line-height: 1.55;
    margin-bottom: 1rem;
  }

  /* ── Radio options ── */
  .tp-options { display: flex; flex-direction: column; gap: 0.5rem; }

  .tp-option {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.65rem 0.9rem;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    background: var(--cream);
    cursor: pointer;
    font-size: 0.88rem;
    color: var(--text-body);
    transition: border-color 0.2s, background 0.2s, color 0.2s;
    user-select: none;
  }
  .tp-option:hover { border-color: rgba(74,124,111,0.3); background: var(--sage-pale); }
  .tp-option.selected {
    border-color: var(--sage);
    background: var(--sage-pale);
    color: var(--navy);
    font-weight: 500;
  }

  /* Hidden native radio */
  .tp-option input[type="radio"] { display: none; }

  /* Custom radio dot */
  .tp-option-dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s;
  }
  .tp-option.selected .tp-option-dot {
    background: var(--sage);
    border-color: var(--sage);
  }
  .tp-option-dot-inner {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .tp-option.selected .tp-option-dot-inner { opacity: 1; }

  /* ── Textarea ── */
  .tp-textarea {
    width: 100%;
    padding: 0.8rem 0.95rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    background: var(--cream);
    color: var(--navy);
    outline: none;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .tp-textarea:focus {
    border-color: var(--sage);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(74,124,111,0.11);
  }

  /* ── Action bar ── */
  .tp-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .tp-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.85rem 1.7rem;
    border-radius: 999px;
    background: var(--navy);
    color: var(--cream);
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(28,43,58,0.2);
    text-decoration: none;
  }
  .tp-btn-primary:hover { background: var(--navy-mid); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,43,58,0.25); }
  .tp-btn-primary:active { transform: translateY(0); }

  .tp-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    background: transparent;
    color: var(--navy);
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 600;
    border: 1.5px solid rgba(28,43,58,0.18);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.18s;
    text-decoration: none;
  }
  .tp-btn-secondary:hover { background: var(--cream-dark); border-color: rgba(28,43,58,0.28); transform: translateY(-2px); }

  .tp-btn-sage {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.85rem 1.7rem;
    border-radius: 999px;
    background: var(--sage);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(74,124,111,0.25);
    text-decoration: none;
  }
  .tp-btn-sage:hover { background: var(--sage-light); transform: translateY(-2px); }
`;