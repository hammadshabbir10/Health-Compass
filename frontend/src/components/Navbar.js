import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const displayName = user?.name || user?.email || 'Guest';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(248, 247, 244, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.25)',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              background: 'linear-gradient(120deg, #111827 0%, #1f2937 100%)',
              color: '#fef3c7',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
            }}
          >
            Health Compass
          </div>
          <nav style={{ display: 'flex', gap: '1rem', color: '#1f2937', fontWeight: 600 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
              About
            </Link>
            <Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
              Services
            </Link>
            <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
              Dashboard
            </Link>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Hi, {displayName}</div>
          {user ? (
            <button
              type="button"
              onClick={onLogout}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid rgba(15, 23, 42, 0.2)',
                background: '#fff7ed',
                color: '#9a3412',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid rgba(15, 23, 42, 0.2)',
                background: '#111827',
                color: '#fef3c7',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
