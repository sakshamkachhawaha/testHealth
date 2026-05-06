import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const HEALTH_TIPS = [
  { icon: 'water_drop', title: 'Stay Hydrated', text: 'Drink 8 glasses of water daily' },
  { icon: 'bedtime', title: 'Quality Sleep', text: 'Aim for 7-9 hours each night' },
  { icon: 'self_improvement', title: 'Mindfulness', text: '10 min meditation daily' },
  { icon: 'directions_walk', title: 'Stay Active', text: '30 min exercise most days' },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function ScoreBadge({ score, level }) {
  const color = level === 'high' ? 'var(--error)' : level === 'medium' ? 'var(--warning, #e8a317)' : 'var(--primary)';
  return (
    <span className="score-badge" style={{ background: `${color}20`, color }}>
      {score}%
    </span>
  );
}

export default function Dashboard() {
  const { reports } = useApp();
  const navigate = useNavigate();
  const lastReport = reports[0];

  return (
    <div className="dashboard">
      {/* Hero */}
      <section className="hero animate-fade-in">
        <div className="hero-content">
          <p className="hero-greeting">{getGreeting()}</p>
          <h1 className="hero-title">How are you feeling today?</h1>
          <p className="hero-subtitle">Your AI health companion is here to help you understand your symptoms and guide your wellness journey.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/check')}>
              <span className="material-symbols-outlined">health_and_safety</span>
              Start Health Check
            </button>
            <button className="btn-secondary" onClick={() => navigate('/check?quick=true')}>
              <span className="material-symbols-outlined">bolt</span>
              Quick Check
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob"></div>
          <div className="blob blob-2"></div>
        </div>
      </section>

      {/* Quick Stats */}
      {lastReport && (
        <section className="quick-stats animate-fade-in delay-1">
          <h2 className="section-title">Your Health Overview</h2>
          <div className="stats-grid">
            <div className="stat-card" onClick={() => navigate(`/reports/${lastReport.id}`)}>
              <div className="stat-icon" style={{ background: 'var(--primary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--on-primary-container)' }}>monitoring</span>
              </div>
              <div className="stat-info">
                <span className="stat-label">Last Score</span>
                <span className="stat-value">{lastReport.score}%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--secondary-container)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--on-secondary-container)' }}>calendar_month</span>
              </div>
              <div className="stat-info">
                <span className="stat-label">Last Check</span>
                <span className="stat-value">{formatDate(lastReport.date)}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--tertiary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--on-tertiary-fixed)' }}>assignment</span>
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Checks</span>
                <span className="stat-value">{reports.length}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: lastReport.level === 'high' ? 'var(--error-container)' : 'var(--primary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: lastReport.level === 'high' ? 'var(--error)' : 'var(--on-primary-container)' }}>
                  {lastReport.level === 'high' ? 'warning' : lastReport.level === 'medium' ? 'info' : 'check_circle'}
                </span>
              </div>
              <div className="stat-info">
                <span className="stat-label">Status</span>
                <span className="stat-value" style={{ textTransform: 'capitalize' }}>{lastReport.level} concern</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Reports */}
      <section className="recent-reports animate-fade-in delay-2">
        <div className="section-header">
          <h2 className="section-title">Past Reports</h2>
          {reports.length > 0 && (
            <button className="link-btn" onClick={() => navigate('/reports')}>View all →</button>
          )}
        </div>
        {reports.length === 0 ? (
          <div className="empty-state">
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>description</span>
            <p>No reports yet. Start your first health check!</p>
          </div>
        ) : (
          <div className="reports-list">
            {reports.slice(0, 3).map((report, i) => (
              <div
                key={report.id}
                className={`report-card animate-fade-in delay-${i + 2}`}
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                <div className="report-card-left">
                  <ScoreBadge score={report.score} level={report.level} />
                  <div>
                    <p className="report-card-title">{report.primarySymptom}</p>
                    <p className="report-card-date">{formatDate(report.date)}</p>
                  </div>
                </div>
                <div className="report-card-right">
                  <span className={`level-pill level-${report.level}`}>{report.level}</span>
                  <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Health Tips */}
      <section className="health-tips animate-fade-in delay-3">
        <h2 className="section-title">Daily Wellness Tips</h2>
        <div className="tips-grid">
          {HEALTH_TIPS.map((tip, i) => (
            <div key={i} className={`tip-card animate-fade-in delay-${i + 3}`}>
              <span className="material-symbols-outlined tip-icon">{tip.icon}</span>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-text">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Reminder */}
      <section className="reminder-card animate-fade-in delay-4">
        <div className="reminder-content">
          <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--primary)' }}>notifications_active</span>
          <div>
            <h3>Daily Check Reminder</h3>
            <p>Track your health regularly for better insights. Consistency helps identify patterns.</p>
          </div>
        </div>
        <button className="btn-primary btn-sm" onClick={() => navigate('/check')}>Check Now</button>
      </section>
    </div>
  );
}
