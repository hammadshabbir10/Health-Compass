import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Users, Activity, Star } from 'lucide-react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  .admin-dashboard {
    min-height: 100vh;
    background: var(--cream, #FAF7F2);
    font-family: var(--font-body, 'Outfit', sans-serif);
    color: var(--navy, #1C2B3A);
    padding-bottom: 4rem;
  }

  .admin-dashboard {
    --chart-sage: #4A7C6F;
    --chart-amber: #D4793A;
    --chart-rose: #B91C1C;
    --chart-navy: #1C2B3A;
    --chart-ink: #2E3F52;
    --chart-mist: rgba(74, 124, 111, 0.12);
  }

  .admin-header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2.5rem 2rem;
  }
  .admin-title {
    font-family: var(--font-display, 'Playfair Display', serif);
    font-size: 2.5rem;
    color: var(--navy);
    margin-bottom: 0.5rem;
  }
  .admin-subtitle {
    color: var(--slate, #5A6A7A);
    font-size: 1.1rem;
  }

  .admin-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }

  .metric-card {
    background: linear-gradient(135deg, rgba(28, 43, 58, 0.04), rgba(74, 124, 111, 0.08));
    border-radius: 18px;
    padding: 1.3rem;
    border: 1px solid rgba(74, 124, 111, 0.15);
    box-shadow: 0 6px 18px rgba(28, 43, 58, 0.05);
  }

  .metric-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--slate);
    font-weight: 700;
  }

  .metric-value {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--navy);
    margin-top: 0.4rem;
  }

  .metric-sub {
    font-size: 0.82rem;
    color: var(--slate);
    margin-top: 0.4rem;
  }

  .metrics-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .metrics-action {
    margin-top: 0.2rem;
  }

  .metrics-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(74, 124, 111, 0.3);
    background: rgba(74, 124, 111, 0.08);
    color: var(--navy);
    font-weight: 600;
    font-size: 0.85rem;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .metrics-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(28, 43, 58, 0.08);
  }

  .kpi-card {
    background: var(--warm-white, #FDFCFA);
    border-radius: 20px;
    padding: 1.5rem;
    border: 1px solid rgba(74, 124, 111, 0.15);
    box-shadow: 0 4px 12px rgba(28, 43, 58, 0.05);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s;
  }
  .kpi-card:hover {
    transform: translateY(-2px);
  }

  .kpi-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: rgba(107, 158, 145, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sage, #4A7C6F);
  }

  .kpi-content h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--slate);
    margin-bottom: 0.25rem;
  }
  .kpi-content .kpi-val {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--navy);
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 900px) {
    .charts-grid { grid-template-columns: 1fr; }
    .chart-card-wide { grid-column: auto; }
  }

  .chart-card {
    background: var(--warm-white);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(74, 124, 111, 0.15);
    box-shadow: 0 4px 12px rgba(28, 43, 58, 0.05);
    position: relative;
  }

  .chart-card-wide {
    grid-column: span 2;
  }
  .chart-title {
    font-family: var(--font-display, 'Playfair Display', serif);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: var(--navy);
  }

  .chart-subtitle {
    color: var(--slate, #5A6A7A);
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }

  .table-card {
    background: var(--warm-white);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(74, 124, 111, 0.15);
    box-shadow: 0 4px 12px rgba(28, 43, 58, 0.05);
    overflow-x: auto;
  }

  .insights-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
  }

  .insights-table thead th {
    text-align: left;
    padding: 0.9rem 1rem;
    color: var(--slate, #5A6A7A);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid rgba(74, 124, 111, 0.2);
    background: rgba(74, 124, 111, 0.05);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .insights-table tbody tr {
    transition: background 0.2s;
  }

  .insights-table tbody tr:hover {
    background: rgba(74, 124, 111, 0.06);
  }

  .insights-table tbody td {
    padding: 1rem;
    border-bottom: 1px solid rgba(74, 124, 111, 0.1);
    vertical-align: top;
    color: var(--text-body, #3D4E5C);
  }

  .insights-table tbody tr:last-child td {
    border-bottom: none;
  }

  .insights-cell-muted {
    color: #9aa5b1;
    font-style: italic;
  }

  .pill {
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(74, 124, 111, 0.12);
    color: var(--chart-sage);
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }

  .pill-amber { background: rgba(212, 121, 58, 0.15); color: var(--chart-amber); }
  .pill-rose { background: rgba(185, 28, 28, 0.12); color: var(--chart-rose); }
  .pill-navy { background: rgba(28, 43, 58, 0.12); color: var(--chart-navy); }

  .feedback-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .feedback-table th {
    text-align: left;
    padding: 1rem;
    border-bottom: 2px solid rgba(74, 124, 111, 0.2);
    color: var(--slate);
    font-weight: 600;
  }
  .feedback-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(74, 124, 111, 0.1);
    color: var(--text-body, #3D4E5C);
    vertical-align: top;
    max-width: 300px;
  }
  .feedback-table tr:last-child td {
    border-bottom: none;
  }

  .status-badge {
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .status-easy { background: rgba(74, 124, 111, 0.15); color: var(--sage); }
  .status-struggled { background: rgba(212, 121, 58, 0.15); color: var(--amber, #D4793A); }
  .status-gaveup { background: rgba(185, 28, 28, 0.1); color: #B91C1C; }
`;

export default function AdminFeedback({ user, onLogout }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  const getSusAverage = (item) => {
    const values = [item.sus1, item.sus2, item.sus3, item.sus4, item.sus5]
      .map((val) => Number(val))
      .filter((val) => !Number.isNaN(val));
    if (!values.length) return null;
    return Number((values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1));
  };

  const getCompletionLabel = (completion) => {
    if (completion === 'yes_easily') return 'Easy finish';
    if (completion === 'yes_struggled') return 'Struggled finish';
    if (completion === 'no_gave_up') return 'Gave up';
    return 'No status';
  };

  const getCompletionClass = (completion) => {
    if (completion === 'yes_easily') return 'pill';
    if (completion === 'yes_struggled') return 'pill-amber';
    if (completion === 'no_gave_up') return 'pill-rose';
    return 'pill-navy';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/feedback/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 403 || res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          setData(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch feedback", err);
        setLoading(false);
        if (err.message === "Unauthorized") {
          alert("You do not have permission to view this page.");
          window.location.href = "/dashboard";
        }
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/metrics`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.success) {
          setMetrics(payload.data);
        }
      })
      .catch((err) => console.error('Failed to fetch metrics', err));
  }, []);

  const formatCurrency = (value) => `$${Number(value || 0).toFixed(0)}`;
  const formatPercent = (value) => `${Math.round((value || 0) * 100)}%`;

  // Calculate KPIs
  // Filter out legacy "Not Answered" data to show accurate current trends
  const activeData = data.filter(item => 
    item.testMode !== 'unknown' || 
    item.completion !== '' || 
    item.hesitation !== ''
  );

  const totalSubmissions = activeData.length;
  
  let totalSusScore = 0;
  let susCount = 0;
  
  let completionStats = { easy: 0, struggled: 0, gaveUp: 0 };
  let modeStats = { standard: 0, adaptive: 0, unknown: 0 };
  
  activeData.forEach(item => {
    // Process SUS
    let itemSusTotal = 0;
    let answeredSus = 0;
    [item.sus1, item.sus2, item.sus3, item.sus4, item.sus5].forEach(val => {
      if (val) {
        itemSusTotal += parseInt(val);
        answeredSus++;
      }
    });
    if (answeredSus > 0) {
      totalSusScore += (itemSusTotal / answeredSus);
      susCount++;
    }

    // Process Completion
    if (item.completion === 'yes_easily') completionStats.easy++;
    else if (item.completion === 'yes_struggled') completionStats.struggled++;
    else if (item.completion === 'no_gave_up') completionStats.gaveUp++;
    // If it's empty, we don't count it as success OR failure for the % rate, 
    // we just exclude it from the completion rate calculation to avoid skewing.

    // Process Mode
    if (item.testMode === 'adaptive') modeStats.adaptive++;
    else if (item.testMode === 'standard') modeStats.standard++;
    else modeStats.unknown++;
  });

  const avgSus = susCount > 0 ? (totalSusScore / susCount).toFixed(1) : 0;
  
  // Real Completion Rate: Successes / Total who actually specified a status
  const totalWithStatus = completionStats.easy + completionStats.struggled + completionStats.gaveUp;
  const completionRate = totalWithStatus > 0 
    ? Math.round(((completionStats.easy + completionStats.struggled) / totalWithStatus) * 100) 
    : 0;

  const completionBarData = [
    {
      name: 'Completion',
      easy: completionStats.easy,
      struggled: completionStats.struggled,
      gaveUp: completionStats.gaveUp,
    }
  ];

  const buildModePerformance = (modeKey, label) => {
    const items = activeData.filter((item) => item.testMode === modeKey);
    const completion = { easy: 0, struggled: 0, gaveUp: 0 };
    const susValues = [];

    items.forEach((item) => {
      if (item.completion === 'yes_easily') completion.easy++;
      else if (item.completion === 'yes_struggled') completion.struggled++;
      else if (item.completion === 'no_gave_up') completion.gaveUp++;

      const susAvg = getSusAverage(item);
      if (susAvg !== null) susValues.push(susAvg);
    });

    const totalWithStatus = completion.easy + completion.struggled + completion.gaveUp;
    const completionRate = totalWithStatus > 0
      ? Math.round(((completion.easy + completion.struggled) / totalWithStatus) * 100)
      : 0;
    const avgSus = susValues.length
      ? Number((susValues.reduce((sum, val) => sum + val, 0) / susValues.length).toFixed(1))
      : 0;

    return {
      mode: label,
      completionRate,
      avgSus,
      avgSusPct: Math.round(avgSus * 20),
      testers: items.length,
    };
  };

  const modePerformanceData = [
    buildModePerformance('standard', 'Standard'),
    buildModePerformance('adaptive', 'Adaptive'),
  ];

  // Average per SUS question
  let susQ = [0,0,0,0,0];
  let susQCounts = [0,0,0,0,0];
  
  data.forEach(item => {
    if (item.sus1) { susQ[0] += parseInt(item.sus1); susQCounts[0]++; }
    if (item.sus2) { susQ[1] += parseInt(item.sus2); susQCounts[1]++; }
    if (item.sus3) { susQ[2] += parseInt(item.sus3); susQCounts[2]++; }
    if (item.sus4) { susQ[3] += parseInt(item.sus4); susQCounts[3]++; }
    if (item.sus5) { susQ[4] += parseInt(item.sus5); susQCounts[4]++; }
  });

  const susQuestionData = [
    { name: 'Q1', label: 'Frequent use', score: susQCounts[0] ? Number((susQ[0]/susQCounts[0]).toFixed(1)) : 0 },
    { name: 'Q2', label: 'Complex', score: susQCounts[1] ? Number((susQ[1]/susQCounts[1]).toFixed(1)) : 0 },
    { name: 'Q3', label: 'Easy use', score: susQCounts[2] ? Number((susQ[2]/susQCounts[2]).toFixed(1)) : 0 },
    { name: 'Q4', label: 'Need support', score: susQCounts[3] ? Number((susQ[3]/susQCounts[3]).toFixed(1)) : 0 },
    { name: 'Q5', label: 'Well integrated', score: susQCounts[4] ? Number((susQ[4]/susQCounts[4]).toFixed(1)) : 0 },
  ];

  return (
    <div className="admin-dashboard">
      <style>{STYLES}</style>
      <Navbar user={user} onLogout={onLogout} />

      <header className="admin-header">
        <h1 className="admin-title">Phase 4A Evidence Dashboard</h1>
        <p className="admin-subtitle">Real-time analysis of user validation feedback and system usability metrics.</p>
      </header>

      <main className="admin-main">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sage)' }}>Loading evidence data...</div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate)', background: 'var(--warm-white)', borderRadius: '20px' }}>
            No feedback collected yet. Send the test link to users to begin gathering evidence!
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon"><Users size={24} /></div>
                <div className="kpi-content">
                  <h4>Total Testers</h4>
                  <div className="kpi-val">{totalSubmissions}</div>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon"><Activity size={24} /></div>
                <div className="kpi-content">
                  <h4>Completion Rate</h4>
                  <div className="kpi-val">{completionRate}%</div>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon"><Star size={24} /></div>
                <div className="kpi-content">
                  <h4>Avg SUS Rating (1-5)</h4>
                  <div className="kpi-val">{avgSus}</div>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="metrics-header">
                <div>
                  <h3 className="chart-title">Growth Metrics</h3>
                  <p className="chart-subtitle">Live business metrics based on user activity.</p>
                </div>
                <div className="metrics-action">
                  <a className="metrics-btn" href="/admin/metrics">View detailed</a>
                </div>
              </div>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Retention Rate</div>
                  <div className="metric-value">{metrics ? formatPercent(metrics.retentionRate) : '--'}</div>
                  <div className="metric-sub">Active users: {metrics?.activeUsers ?? '--'} / {metrics?.totalUsers ?? '--'}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">MRR</div>
                  <div className="metric-value">{metrics ? formatCurrency(metrics.mrr) : '--'}</div>
                  <div className="metric-sub">Paying users: {metrics?.payingUsers ?? '--'}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">LTV</div>
                  <div className="metric-value">{metrics ? formatCurrency(metrics.ltv) : '--'}</div>
                  <div className="metric-sub">Lifetime: {metrics?.lifetimeMonths ?? 6} months</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">LTV / CAC</div>
                  <div className="metric-value">{metrics?.ltvCac ? metrics.ltvCac.toFixed(2) : 'N/A'}</div>
                  <div className="metric-sub">CAC: {metrics ? formatCurrency(metrics.cac) : '--'}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">NPS</div>
                  <div className="metric-value">{metrics ? metrics.npsScore : '--'}</div>
                  <div className="metric-sub">Avg score: {metrics?.npsAverage ?? '--'} • Responses: {metrics?.npsTotal ?? '--'}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">ARPU</div>
                  <div className="metric-value">{metrics ? formatCurrency(metrics.arpu) : '--'}</div>
                  <div className="metric-sub">Basic: {metrics?.payingBasic ?? '--'} | Pro: {metrics?.payingPro ?? '--'}</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Completion Health</h3>
                <p className="chart-subtitle">How smoothly testers finish the assessment.</p>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={completionBarData} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="var(--chart-mist)" />
                      <XAxis type="number" allowDecimals={false} />
                      <YAxis type="category" dataKey="name" hide />
                      <RechartsTooltip cursor={{ fill: 'rgba(74,124,111,0.08)' }} />
                      <Legend verticalAlign="top" height={30} />
                      <Bar dataKey="easy" stackId="a" fill="var(--chart-sage)" radius={[8, 0, 0, 8]} name="Easy finish" />
                      <Bar dataKey="struggled" stackId="a" fill="var(--chart-amber)" name="Struggled finish" />
                      <Bar dataKey="gaveUp" stackId="a" fill="var(--chart-rose)" radius={[0, 8, 8, 0]} name="Gave up" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Test Mode Performance</h3>
                <p className="chart-subtitle">Completion rate and usability by mode.</p>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modePerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-mist)" />
                      <XAxis dataKey="mode" />
                      <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                      <RechartsTooltip
                        formatter={(value, name, props) => {
                          if (name === 'Completion Rate') return [`${value}%`, name];
                          return [`${props.payload.avgSus} / 5`, 'Avg SUS'];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="completionRate" name="Completion Rate" fill="var(--chart-navy)" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="avgSusPct" name="Avg SUS (x20)" fill="var(--chart-amber)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card chart-card-wide">
                <h3 className="chart-title">SUS Signal by Question</h3>
                <p className="chart-subtitle">Average usability score across each SUS item.</p>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={susQuestionData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-mist)" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} ticks={[0,1,2,3,4,5]} />
                      <RechartsTooltip formatter={(value, name, props) => [`${value} / 5`, props.payload.label]} />
                      <Line type="monotone" dataKey="score" stroke="var(--chart-ink)" strokeWidth={3} dot={{ r: 4, fill: 'var(--chart-amber)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="table-card">
              <h3 className="chart-title">Qualitative Insights</h3>
              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Mode</th>
                    <th>Status</th>
                    <th>Hesitations</th>
                    <th>Result Clarity</th>
                    <th>Most Useful</th>
                    <th>Reuse Intent</th>
                    <th>Willing To Pay</th>
                    <th>SUS Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => {
                    const susAvg = getSusAverage(item);
                    return (
                      <tr key={item._id || idx}>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <span className="pill">{item.testMode || 'unknown'}</span>
                        </td>
                        <td>
                          <span className={getCompletionClass(item.completion)}>{getCompletionLabel(item.completion)}</span>
                        </td>
                        <td>{item.hesitation || <span className="insights-cell-muted">None</span>}</td>
                        <td>{item.resultSense || <span className="insights-cell-muted">None</span>}</td>
                        <td>{item.mostUseful || <span className="insights-cell-muted">None</span>}</td>
                        <td>{item.reuse || <span className="insights-cell-muted">None</span>}</td>
                        <td>{item.pay || <span className="insights-cell-muted">None</span>}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          {susAvg !== null ? `${susAvg} / 5` : <span className="insights-cell-muted">N/A</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </>
        )}
      </main>
    </div>
  );
}
