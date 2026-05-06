import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  :root {
    --cream: #FAF7F2;
    --warm-white: #FDFCFA;
    --navy: #1C2B3A;
    --slate: #5A6A7A;
    --sage: #4A7C6F;
    --amber: #D4793A;
    --rose: #B91C1C;
    --border: rgba(74, 124, 111, 0.15);
  }

  .gm-root {
    min-height: 100vh;
    background: var(--cream);
    font-family: 'Outfit', sans-serif;
    color: var(--navy);
    padding-bottom: 4rem;
  }

  .gm-header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2.5rem 2rem;
  }

  .gm-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    margin-bottom: 0.4rem;
  }

  .gm-subtitle {
    color: var(--slate);
    font-size: 1rem;
  }

  .gm-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2.5rem;
    display: grid;
    gap: 1.6rem;
  }

  .gm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.4rem;
  }

  .gm-card-wide {
    grid-column: span 2;
  }

  .gm-chart {
    height: 320px;
  }

  .gm-card {
    background: var(--warm-white);
    border-radius: 20px;
    padding: 1.8rem;
    border: 1px solid var(--border);
    box-shadow: 0 6px 16px rgba(28, 43, 58, 0.06);
  }

  .gm-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .gm-kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .gm-kpi {
    background: rgba(74, 124, 111, 0.08);
    border-radius: 16px;
    padding: 1rem;
    border: 1px solid rgba(74, 124, 111, 0.12);
  }

  .gm-kpi-label {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--slate);
    font-weight: 700;
  }

  .gm-kpi-value {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 0.4rem;
  }

  .gm-kpi-sub {
    font-size: 0.85rem;
    color: var(--slate);
    margin-top: 0.3rem;
  }

  .gm-note {
    font-size: 0.85rem;
    color: var(--slate);
    margin-top: 0.8rem;
  }

  @media (max-width: 900px) {
    .gm-main { padding: 0 1.4rem; }
    .gm-card-wide { grid-column: auto; }
  }
`;

export default function GrowthMetrics({ user, onLogout }) {
  const [metrics, setMetrics] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.success) {
          setMetrics(payload.data);
        }
      })
      .catch((err) => console.error('Metrics fetch failed', err));

    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/feedback/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.success) {
          setFeedback(payload.data || []);
        }
      })
      .catch((err) => console.error('Feedback fetch failed', err));
  }, []);

  const formatCurrency = (value) => `$${Number(value || 0).toFixed(0)}`;

  const feedbackSeries = useMemo(() => {
    const counts = {};
    feedback.forEach((item) => {
      if (!item.createdAt) return;
      const date = new Date(item.createdAt);
      const key = date.toISOString().slice(0, 10);
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [feedback]);

  const npsTrend = useMemo(() => {
    const buckets = {};
    feedback.forEach((item) => {
      if (!item.createdAt || item.npsScore === null || item.npsScore === undefined) return;
      const key = new Date(item.createdAt).toISOString().slice(0, 10);
      if (!buckets[key]) buckets[key] = { total: 0, promoters: 0, detractors: 0 };
      buckets[key].total += 1;
      if (item.npsScore >= 9) buckets[key].promoters += 1;
      if (item.npsScore <= 6) buckets[key].detractors += 1;
    });
    return Object.entries(buckets)
      .map(([date, bucket]) => {
        const score = bucket.total > 0
          ? Math.round(((bucket.promoters / bucket.total) - (bucket.detractors / bucket.total)) * 100)
          : 0;
        return { date, score };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [feedback]);

  const susTrend = useMemo(() => {
    const buckets = {};
    feedback.forEach((item) => {
      if (!item.createdAt) return;
      const susValues = [item.sus1, item.sus2, item.sus3, item.sus4, item.sus5]
        .map((val) => Number(val))
        .filter((val) => !Number.isNaN(val));
      if (!susValues.length) return;
      const avg = susValues.reduce((sum, val) => sum + val, 0) / susValues.length;
      const key = new Date(item.createdAt).toISOString().slice(0, 10);
      if (!buckets[key]) buckets[key] = { total: 0, count: 0 };
      buckets[key].total += avg;
      buckets[key].count += 1;
    });
    return Object.entries(buckets)
      .map(([date, bucket]) => ({
        date,
        avg: Number((bucket.total / bucket.count).toFixed(1)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [feedback]);

  const planSeries = [
    { name: 'Basic', value: metrics?.payingBasic || 0 },
    { name: 'Pro', value: metrics?.payingPro || 0 },
  ];

  const retentionData = [
    {
      name: 'Retention',
      value: Math.round((metrics?.retentionRate || 0) * 100),
      fill: '#4A7C6F',
    },
  ];

  return (
    <div className="gm-root">
      <style>{STYLES}</style>
      <Navbar user={user} onLogout={onLogout} />

      <header className="gm-header">
        <h1 className="gm-title">Growth Metrics Detail</h1>
        <p className="gm-subtitle">Deep dive into revenue, retention, and engagement patterns.</p>
      </header>

      <main className="gm-main">
        <div className="gm-card">
          <div className="gm-card-title">Snapshot</div>
          <div className="gm-kpi-row">
            <div className="gm-kpi">
              <div className="gm-kpi-label">Retention</div>
              <div className="gm-kpi-value">{metrics ? `${Math.round(metrics.retentionRate * 100)}%` : '--'}</div>
              <div className="gm-kpi-sub">Active {metrics?.activeUsers ?? '--'} / {metrics?.totalUsers ?? '--'}</div>
            </div>
            <div className="gm-kpi">
              <div className="gm-kpi-label">MRR</div>
              <div className="gm-kpi-value">{metrics ? formatCurrency(metrics.mrr) : '--'}</div>
              <div className="gm-kpi-sub">Paying users {metrics?.payingUsers ?? '--'}</div>
            </div>
            <div className="gm-kpi">
              <div className="gm-kpi-label">LTV / CAC</div>
              <div className="gm-kpi-value">{metrics?.ltvCac ? metrics.ltvCac.toFixed(2) : '--'}</div>
              <div className="gm-kpi-sub">CAC {metrics ? formatCurrency(metrics.cac) : '--'}</div>
            </div>
            <div className="gm-kpi">
              <div className="gm-kpi-label">NPS</div>
              <div className="gm-kpi-value">{metrics?.npsScore ?? '--'}</div>
              <div className="gm-kpi-sub">Avg score {metrics?.npsAverage ?? '--'} / 10</div>
            </div>
          </div>
        </div>

        <div className="gm-grid">
          <div className="gm-card gm-card-wide">
            <div className="gm-card-title">Engagement Over Time</div>
            <div className="gm-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feedbackSeries} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(74,124,111,0.12)" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="count" stroke="#1C2B3A" strokeWidth={3} dot={{ r: 4, fill: '#D4793A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="gm-note">Based on feedback submissions per day.</div>
          </div>

          <div className="gm-card">
            <div className="gm-card-title">Plan Mix</div>
            <div className="gm-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planSeries} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(74,124,111,0.12)" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#4A7C6F" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="gm-note">Paying users split by plan.</div>
          </div>

          <div className="gm-card">
            <div className="gm-card-title">Retention Pulse</div>
            <div className="gm-chart" style={{ position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={retentionData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#1C2B3A'
              }}>
                {metrics ? `${Math.round(metrics.retentionRate * 100)}%` : '--'}
              </div>
            </div>
            <div className="gm-note">Retention ratio from active users.</div>
          </div>

          <div className="gm-card gm-card-wide">
            <div className="gm-card-title">NPS Trend</div>
            <div className="gm-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={npsTrend} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(74,124,111,0.12)" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[-100, 100]} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="score" stroke="#D4793A" strokeWidth={3} dot={{ r: 4, fill: '#1C2B3A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="gm-note">Promoters minus detractors over time.</div>
          </div>

          <div className="gm-card gm-card-wide">
            <div className="gm-card-title">SUS Trend</div>
            <div className="gm-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={susTrend} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(74,124,111,0.12)" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} ticks={[0,1,2,3,4,5]} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="avg" stroke="#4A7C6F" strokeWidth={3} dot={{ r: 4, fill: '#D4793A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="gm-note">Average SUS score per day.</div>
          </div>
        </div>
      </main>
    </div>
  );
}
