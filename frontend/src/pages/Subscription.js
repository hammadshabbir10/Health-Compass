import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Check } from 'lucide-react';

const STYLES = `
  .sub-root { min-height: 100vh; background: #FAF7F2; font-family: 'DM Sans', sans-serif; }
  .sub-main { max-width: 1000px; margin: 0 auto; padding: 4rem 2rem; text-align: center; }
  .sub-title { font-family: 'DM Serif Display', serif; font-size: 3rem; color: #1C2B3A; margin-bottom: 1rem; }
  .sub-desc { color: #5A6A7A; font-size: 1.1rem; max-width: 600px; margin: 0 auto 4rem; line-height: 1.6; }
  
  .sub-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; text-align: left; }
  
  .plan-card {
    background: white;
    border: 1px solid rgba(74, 124, 111, 0.15);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    box-shadow: 0 4px 20px rgba(28, 43, 58, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .plan-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(28, 43, 58, 0.08); }
  
  .plan-pro { border-color: #4A7C6F; border-width: 2px; }
  .pro-badge { 
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: #4A7C6F; color: white; padding: 0.3rem 1rem; border-radius: 999px;
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
  }
  
  .plan-name { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #1C2B3A; margin-bottom: 0.5rem; text-transform: capitalize; }
  .plan-price { font-size: 2.5rem; font-weight: 700; color: #1C2B3A; margin-bottom: 1.5rem; display: flex; align-items: flex-end; gap: 0.2rem; }
  .plan-price span { font-size: 1rem; font-weight: 400; color: #5A6A7A; margin-bottom: 0.6rem; }
  
  .plan-features { list-style: none; padding: 0; margin-bottom: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .plan-features li { display: flex; align-items: flex-start; gap: 0.8rem; font-size: 0.95rem; color: #3D4E5C; line-height: 1.5; }
  .check-icon { color: #4A7C6F; flex-shrink: 0; margin-top: 2px; }
  
  .sub-btn {
    width: 100%; border: none; border-radius: 999px; padding: 1rem;
    font-size: 1rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background 0.2s, color 0.2s;
  }
  .sub-btn-outline { background: transparent; border: 1.5px solid #1C2B3A; color: #1C2B3A; }
  .sub-btn-outline:hover { background: #1C2B3A; color: white; }
  .sub-btn-primary { background: #4A7C6F; color: white; }
  .sub-btn-primary:hover { background: #3a6258; }
  .sub-btn-current { background: #E8F0EE; color: #4A7C6F; cursor: default; }
  
  .toast {
    position: fixed; bottom: 2rem; right: 2rem;
    background: #1C2B3A; color: white; padding: 1rem 2rem;
    border-radius: 12px; font-weight: 500;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes slideIn { from{ transform: translateY(40px); opacity: 0;} to{ transform: translateY(0); opacity: 1; } }
`;

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: ['1 Assessment per month', 'Basic cognitive screening', 'Standard MoCA scores']
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    features: ['10 Assessments per month', 'Adaptive Testing Mode', 'Basic Risk Prediction', 'Export history']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    features: ['Unlimited Assessments', 'Advanced AI XGBoost Predictions', 'Full Patient History Logging', 'Priority Email Support']
  }
];

export default function Subscription({ user, onLogout }) {
  const [currentTier, setCurrentTier] = useState('free');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/subscription/status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setCurrentTier(data.data.subscriptionTier);
        }
      } catch (err) {
        console.error('Error fetching subscription', err);
      }
    };
    fetchStatus();
  }, []);

  const handleSubscribe = async (planId) => {
    if (planId === currentTier) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/subscription/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: planId })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentTier(planId);
        setToast(data.message);
        setTimeout(() => setToast(''), 4000);
      }
    } catch (err) {
      console.error('Error upgrading', err);
    }
  };

  return (
    <div className="sub-root">
      <style>{STYLES}</style>
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="sub-main">
        <h1 className="sub-title">Simple, transparent pricing</h1>
        <p className="sub-desc">Whether you are a solo caregiver or a private clinic, we have a plan designed to help you accurately assess cognitive ability.</p>
        
        <div className="sub-grid">
          {PLANS.map(plan => (
            <div key={plan.id} className={`plan-card ${plan.id === 'pro' ? 'plan-pro' : ''}`}>
              {plan.id === 'pro' && <div className="pro-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}<span>/mo</span></div>
              
              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i}><Check size={18} className="check-icon"/> {feat}</li>
                ))}
              </ul>
              
              <button 
                className={`sub-btn ${currentTier === plan.id ? 'sub-btn-current' : (plan.id === 'pro' ? 'sub-btn-primary' : 'sub-btn-outline')}`}
                onClick={() => handleSubscribe(plan.id)}
              >
                {currentTier === plan.id ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
