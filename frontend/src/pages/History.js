import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const STYLES = `
  .history-root { min-height: 100vh; background: #FAF7F2; font-family: 'DM Sans', sans-serif; }
  .history-main { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; }
  
  .hist-header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
  .hist-title { font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: #1C2B3A; margin-bottom: 0.3rem; letter-spacing: -0.02em; }
  .hist-subtitle { color: #5A6A7A; font-size: 0.95rem; }
  
  .hist-header-actions { display: flex; gap: 0.8rem; }
  .hist-action-btn {
    display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.2rem;
    border-radius: 999px; border: 1px solid rgba(74, 124, 111, 0.2); 
    background: #fff; color: #1C2B3A; font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }
  .hist-action-btn:hover { background: #FAF7F2; border-color: rgba(74, 124, 111, 0.4); transform: translateY(-1px); }
  
  .hist-card {
    background: #fff;
    border: 1px solid rgba(74, 124, 111, 0.15);
    border-radius: 16px;
    padding: 1.8rem 2.2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 20px rgba(28, 43, 58, 0.04);
  }
  
  .hist-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
  .hist-card-info h3 { font-size: 1.15rem; color: #1C2B3A; font-weight: 700; margin-bottom: 0.3rem; }
  .hist-card-sub { color: #5A6A7A; font-size: 0.85rem; font-weight: 400; }
  
  .hist-pills { display: flex; gap: 0.6rem; }
  .h-pill {
    padding: 0.35rem 0.9rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; 
    display: inline-flex; align-items: center; gap: 0.35rem; letter-spacing: 0.02em;
  }
  .h-pill-green { background: #E8F0EE; color: #4A7C6F; border: 1px solid rgba(74, 124, 111, 0.2); }
  .h-pill-orange { background: #FDF0E6; color: #D4793A; border: 1px solid rgba(212, 121, 58, 0.2); }
  
  .hist-stats { display: flex; gap: 3.5rem; margin-bottom: 1.5rem; }
  .hist-stat-block { display: flex; flex-direction: column; gap: 0.2rem; }
  .hist-stat-label { font-size: 0.7rem; font-weight: 700; color: #8F9BA7; letter-spacing: 0.1em; text-transform: uppercase; }
  .hist-stat-val { font-size: 1.3rem; font-weight: 700; color: #1C2B3A; display: flex; align-items: baseline; }
  .hist-stat-sub { font-size: 1rem; color: #8F9BA7; font-weight: 600; margin-left: 1px; }
  
  .hist-controls { display: flex; gap: 0.8rem; margin-bottom: 1rem; }
  .detail-toggle {
    display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 1rem;
    border-radius: 999px; border: 1px solid rgba(0,0,0,0.1); background: #fff;
    color: #1C2B3A; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .detail-toggle:hover { background: #F8FAFC; border-color: #CBD5E1; }
  
  .hist-details {
    border-top: 1px dashed rgba(74, 124, 111, 0.2);
    padding-top: 1.5rem;
    margin-top: 0.5rem;
    display: flex; flex-direction: column; gap: 0.6rem;
  }
  .domain-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.85rem 1.2rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04);
    background: #FDFCFB; font-size: 0.85rem; color: #3D4E5C; font-weight: 500;
  }
  .domain-score { font-weight: 600; color: #5A6A7A; }
`;

const DOMAINS = [
  { key: 'global', label: 'Global Cognitive Screen' },
  { key: 'episodic-memory', label: 'Episodic Memory Assessment' },
  { key: 'executive', label: 'Executive Function Assessment' },
  { key: 'language', label: 'Language Assessment' },
  { key: 'functional', label: 'Functional Assessment' }
];

export default function History({ user, onLogout }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/assessment/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="history-root">
      <style>{STYLES}</style>
      <Navbar user={user} onLogout={onLogout} />
      <main className="history-main">
        <div className="hist-header-flex">
          <div>
            <h1 className="hist-title">Assessment History</h1>
            <p className="hist-subtitle">Review previous results, answers, and MoCA-equivalent scores for this account.</p>
          </div>
          <div className="hist-header-actions">
            <button className="hist-action-btn" onClick={() => navigate('/dashboard')}>
              <LayoutDashboard size={15}/> Dashboard
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading your history...</p>
        ) : history.length === 0 ? (
          <div className="hist-card">No assessments found. Please take your first test.</div>
        ) : (
          history.map(entry => {
            const isExpanded = !!expanded[entry._id];
            
            // Note: date.toLocaleString handles the exact parsing as shown in the screenshot
            const d = new Date(entry.createdAt);
            const dateStr = d.toLocaleDateString();
            const timeStr = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
            
            const earn = entry.scores?.raw?.earned || 0;
            const total = entry.scores?.raw?.total || 60;
            const percent = entry.scores?.raw?.percentage ? Math.round(entry.scores.raw.percentage) : Math.round((earn/total)*100) || 0;
            const moca = entry.scores?.mocaEquivalent?.adjusted || 0;
            const domainsData = entry.scores?.byDomain || {};
            const pName = entry.patientProfile?.name || 'Unknown';

            return (
              <div key={entry._id} className="hist-card">
                <div className="hist-card-top">
                  <div className="hist-card-info">
                    <h3>Assessment on {dateStr}, {timeStr}</h3>
                    <div className="hist-card-sub">Patient: {pName} · Mode: Standard · 5 domains</div>
                  </div>
                  <div className="hist-pills">
                    <div className="h-pill h-pill-green">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                      {percent}%
                    </div>
                    <div className="h-pill h-pill-orange">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      MOCA {moca}/30
                    </div>
                  </div>
                </div>

                <div className="hist-stats">
                  <div className="hist-stat-block">
                    <span className="hist-stat-label">CORRECT</span>
                    <div className="hist-stat-val">{earn}<span className="hist-stat-sub">/{total}</span></div>
                  </div>
                  <div className="hist-stat-block">
                    <span className="hist-stat-label">ACCURACY</span>
                    <div className="hist-stat-val">{percent}%</div>
                  </div>
                </div>

                <div className="hist-controls">
                  <button className="detail-toggle" onClick={() => toggleExpand(entry._id)}>
                    {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>} 
                    {isExpanded ? 'Hide details' : 'Show details'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="hist-details">
                    {DOMAINS.map((d, i) => {
                      const domainObj = domainsData[d.key] || { earned: 0, total: 12, percentage: 0 };
                      const e = domainObj.earned;
                      const t = domainObj.total;
                      const p = Math.round(domainObj.percentage || (e/t)*100) || 0;
                      return (
                        <div key={i} className="domain-row">
                          <span>{d.label}</span>
                          <span className="domain-score">{e}/{t} · {p}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
