import React from 'react';

function ProfilePanel({ profile, onChange }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        padding: '1.5rem',
        display: 'grid',
        gap: '1rem',
        boxShadow: '0 22px 50px -40px rgba(15, 23, 42, 0.35)',
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0f172a' }}>Professional Profile</h2>
        <p style={{ margin: '0.4rem 0 0', color: '#64748b', fontSize: '0.95rem' }}>
          Provide patient details for personalized Health Compass assessments.
        </p>
      </div>
      <div style={{ display: 'grid', gap: '0.9rem' }}>
        <div style={{ maxWidth: '420px' }}>
          <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '0.35rem' }}>
            Name
          </label>
          <input
            type="text"
            value={profile.name}
            placeholder="Patient full name"
            onChange={(event) => onChange('name', event.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.95rem',
              borderRadius: '12px',
              border: '1px solid #cbd5f5',
              background: '#f8fbff',
              color: '#0f172a',
              fontSize: '0.95rem',
              boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
            }}
          />
        </div>
        <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '260px' }}>
          <div>
            <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '0.35rem' }}>
              Age
            </label>
            <input
              type="number"
              value={profile.age}
              placeholder="62"
              onChange={(event) => onChange('age', event.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.95rem',
                borderRadius: '12px',
                border: '1px solid #cbd5f5',
                background: '#f8fbff',
                color: '#0f172a',
                fontSize: '0.95rem',
                boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '0.35rem' }}>
              Gender
            </label>
            <select
              value={profile.gender}
              onChange={(event) => onChange('gender', event.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.95rem',
                borderRadius: '12px',
                border: '1px solid #cbd5f5',
                background: '#f8fbff',
                color: '#0f172a',
                fontSize: '0.95rem',
                boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
              }}
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>
        </div>
        <div style={{ maxWidth: '420px' }}>
          <label style={{ display: 'block', color: '#334155', fontWeight: 600, marginBottom: '0.35rem' }}>
            Occupation
          </label>
          <input
            type="text"
            value={profile.occupation}
            placeholder="Retired teacher, engineer"
            onChange={(event) => onChange('occupation', event.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.95rem',
              borderRadius: '12px',
              border: '1px solid #cbd5f5',
              background: '#f8fbff',
              color: '#0f172a',
              fontSize: '0.95rem',
              boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePanel;
