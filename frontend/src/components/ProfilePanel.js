import React, { useState } from 'react';

function ProfilePanel({ profile, onChange }) {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    clinical: false,
    medical: false,
    vitals: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  // Calculate profile completeness
  const calculateCompleteness = () => {
    const requiredFields = ['name', 'age', 'gender', 'education'];
    const filledRequired = requiredFields.filter(f => profile[f]).length;
    const optionalFields = ['ethnicity', 'bmi', 'smoking', 'alcohol', 'physical_activity', 'sleep_quality'];
    const filledOptional = optionalFields.filter(f => profile[f]).length;
    
    const total = requiredFields.length + optionalFields.length;
    const filled = filledRequired + filledOptional;
    return Math.round((filled / total) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(28, 43, 58, 0.08)',
      overflow: 'hidden',
      border: '1px solid rgba(74, 124, 111, 0.15)'
    }}>
      <div style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #1C2B3A 0%, #2D4055 100%)',
        color: '#fff'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Patient Details</h2>
        <p style={{ margin: '0.3rem 0 0', opacity: 0.8, fontSize: '0.85rem' }}>
          Complete profile for MoCA-standard personalised assessments.
        </p>
        <div style={{
          marginTop: '1rem',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '10px',
          padding: '0.5rem 1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>Profile completeness</span>
            <span>{completeness}%</span>
          </div>
          <div style={{
            marginTop: '0.3rem',
            height: '6px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${completeness}%`,
              height: '100%',
              background: '#6B9E91',
              borderRadius: '3px',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        {/* Section 1: Basic Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div 
            onClick={() => toggleSection('basic')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0.5rem 0',
              borderBottom: '2px solid #E8F0EE'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1C2B3A' }}>Core information</h3>
            <span style={{ fontSize: '1.2rem' }}>{expandedSections.basic ? '−' : '+'}</span>
          </div>
          
          {expandedSections.basic && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Patient Name *
                </label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Full name"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Age *
                </label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => handleChange('age', parseInt(e.target.value))}
                  placeholder="Years"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Gender *
                </label>
                <select
                  value={profile.gender || ''}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Ethnicity
                </label>
                <select
                  value={profile.ethnicity || ''}
                  onChange={(e) => handleChange('ethnicity', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select</option>
                  <option value="caucasian">Caucasian</option>
                  <option value="african-american">African American</option>
                  <option value="hispanic">Hispanic</option>
                  <option value="asian">Asian</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Education Level *
                </label>
                <select
                  value={profile.education || ''}
                  onChange={(e) => handleChange('education', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select highest level</option>
                  <option value="elementary">Elementary School</option>
                  <option value="high-school">High School</option>
                  <option value="some-college">Some College</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Occupation *
                </label>
                <input
                  type="text"
                  value={profile.occupation || ''}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  placeholder="e.g., Retired teacher, Software engineer"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Primary Language
                </label>
                <select
                  value={profile.language || 'english'}
                  onChange={(e) => handleChange('language', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="chinese">Chinese</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Dominant Hand
                </label>
                <select
                  value={profile.handedness || 'right'}
                  onChange={(e) => handleChange('handedness', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="right">Right-handed</option>
                  <option value="left">Left-handed</option>
                  <option value="ambidextrous">Ambidextrous</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Clinical Measurements */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div 
            onClick={() => toggleSection('clinical')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0.5rem 0',
              borderBottom: '2px solid #E8F0EE'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1C2B3A' }}>Health & Lifestyle</h3>
            <span style={{ fontSize: '1.2rem' }}>{expandedSections.clinical ? '−' : '+'}</span>
          </div>
          
          {expandedSections.clinical && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  BMI (Body Mass Index)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.bmi || ''}
                  onChange={(e) => handleChange('bmi', parseFloat(e.target.value))}
                  placeholder="e.g., 22.5"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Smoking Status
                </label>
                <select
                  value={profile.smoking || ''}
                  onChange={(e) => handleChange('smoking', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Alcohol Consumption
                </label>
                <select
                  value={profile.alcohol || ''}
                  onChange={(e) => handleChange('alcohol', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select</option>
                  <option value="none">None</option>
                  <option value="light">Light (1-3 drinks/week)</option>
                  <option value="moderate">Moderate (4-7 drinks/week)</option>
                  <option value="heavy">Heavy (8+ drinks/week)</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Physical Activity (0-10 scale)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="10"
                  value={profile.physical_activity || ''}
                  onChange={(e) => handleChange('physical_activity', parseInt(e.target.value))}
                  placeholder="0=sedentary, 10=very active"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Diet Quality (0-10 scale)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="10"
                  value={profile.diet_quality || ''}
                  onChange={(e) => handleChange('diet_quality', parseInt(e.target.value))}
                  placeholder="0=poor, 10=excellent"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Sleep Quality (1-10 scale)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="10"
                  value={profile.sleep_quality || ''}
                  onChange={(e) => handleChange('sleep_quality', parseInt(e.target.value))}
                  placeholder="1=poor, 10=excellent"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Medical History */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div 
            onClick={() => toggleSection('medical')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0.5rem 0',
              borderBottom: '2px solid #E8F0EE'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1C2B3A' }}>Medical History</h3>
            <span style={{ fontSize: '1.2rem' }}>{expandedSections.medical ? '−' : '+'}</span>
          </div>
          
          {expandedSections.medical && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.family_history || false}
                  onChange={(e) => handleChange('family_history', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Family history of Alzheimer's disease</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.cardiovascular_disease || false}
                  onChange={(e) => handleChange('cardiovascular_disease', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Cardiovascular disease</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.diabetes || false}
                  onChange={(e) => handleChange('diabetes', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Diabetes</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.depression || false}
                  onChange={(e) => handleChange('depression', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Depression</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.head_injury || false}
                  onChange={(e) => handleChange('head_injury', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>History of head injury</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={profile.hypertension || false}
                  onChange={(e) => handleChange('hypertension', e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Hypertension (high blood pressure)</span>
              </label>
            </div>
          )}
        </div>

        {/* Section 4: Vitals & Lab Results (Optional) */}
        <div>
          <div 
            onClick={() => toggleSection('vitals')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0.5rem 0',
              borderBottom: '2px solid #E8F0EE'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1C2B3A' }}>Vitals & Lab Results (Optional)</h3>
            <span style={{ fontSize: '1.2rem' }}>{expandedSections.vitals ? '−' : '+'}</span>
          </div>
          
          {expandedSections.vitals && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Systolic BP (mmHg)
                </label>
                <input
                  type="number"
                  value={profile.systolic_bp || ''}
                  onChange={(e) => handleChange('systolic_bp', parseInt(e.target.value))}
                  placeholder="e.g., 120"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Diastolic BP (mmHg)
                </label>
                <input
                  type="number"
                  value={profile.diastolic_bp || ''}
                  onChange={(e) => handleChange('diastolic_bp', parseInt(e.target.value))}
                  placeholder="e.g., 80"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Total Cholesterol (mg/dL)
                </label>
                <input
                  type="number"
                  value={profile.cholesterol_total || ''}
                  onChange={(e) => handleChange('cholesterol_total', parseFloat(e.target.value))}
                  placeholder="e.g., 190"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  LDL Cholesterol (mg/dL)
                </label>
                <input
                  type="number"
                  value={profile.cholesterol_ldl || ''}
                  onChange={(e) => handleChange('cholesterol_ldl', parseFloat(e.target.value))}
                  placeholder="e.g., 100"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  HDL Cholesterol (mg/dL)
                </label>
                <input
                  type="number"
                  value={profile.cholesterol_hdl || ''}
                  onChange={(e) => handleChange('cholesterol_hdl', parseFloat(e.target.value))}
                  placeholder="e.g., 55"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4A7C6F', marginBottom: '0.3rem' }}>
                  Triglycerides (mg/dL)
                </label>
                <input
                  type="number"
                  value={profile.cholesterol_triglycerides || ''}
                  onChange={(e) => handleChange('cholesterol_triglycerides', parseFloat(e.target.value))}
                  placeholder="e.g., 150"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>
          * Required fields for MoCA-standard assessment
        </div>
      </div>
    </div>
  );
}

export default ProfilePanel;