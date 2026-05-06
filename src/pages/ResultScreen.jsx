import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ResultScreen.css';

export default function ResultScreen() {
  const { id } = useParams();
  const { reports } = useApp();
  const navigate = useNavigate();
  const report = reports.find(r => r.id === id);

  if (!report) return (
    <div className="not-found">
      <span className="material-symbols-outlined" style={{ fontSize: 48 }}>error</span>
      <h2>Report not found</h2>
      <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );

  const { score, level, possibleCauses, preventive, nextSteps, shouldSeeDoctor } = report;
  const color = level === 'high' ? 'var(--error)' : level === 'medium' ? 'var(--warning)' : 'var(--primary)';
  const bgColor = level === 'high' ? 'var(--error-container)' : level === 'medium' ? 'var(--warning-container)' : 'var(--primary-fixed)';

  return (
    <div className="result-screen">
      {/* Score Hero */}
      <section className="result-hero animate-scale-in" style={{ background: bgColor }}>
        <div className="score-circle" style={{ borderColor: color }}>
          <span className="score-number" style={{ color }}>{score}</span>
          <span className="score-percent" style={{ color }}>%</span>
        </div>
        <div className="result-status">
          <span className={`status-label level-${level}`} style={{ fontSize: 16 }}>
            {level === 'high' ? '⚠️ High Concern' : level === 'medium' ? '⚡ Moderate Concern' : '✅ Low Concern'}
          </span>
          <p className="result-summary">{report.summary}</p>
        </div>
      </section>

      {/* Doctor Recommendation */}
      {shouldSeeDoctor && (
        <section className="doctor-alert animate-fade-in delay-1">
          <span className="material-symbols-outlined">local_hospital</span>
          <div>
            <h3>We recommend seeing a doctor</h3>
            <p>Based on your symptoms, a professional evaluation would be beneficial.</p>
          </div>
          <button className="btn-primary btn-sm">Find Doctor</button>
        </section>
      )}

      {/* Insights Grid */}
      <div className="insights-grid">
        <section className="insight-card animate-fade-in delay-2">
          <div className="insight-header">
            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>psychology</span>
            <h3>What this might indicate</h3>
          </div>
          <ul className="insight-list">
            {possibleCauses.map((c, i) => (
              <li key={i}><span className="material-symbols-outlined li-icon">arrow_right</span>{c}</li>
            ))}
          </ul>
          <p className="insight-disclaimer">This is not a diagnosis. Always consult a medical professional.</p>
        </section>

        <section className="insight-card animate-fade-in delay-3">
          <div className="insight-header">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>checklist</span>
            <h3>What you should do next</h3>
          </div>
          <ul className="insight-list">
            {nextSteps.map((s, i) => (
              <li key={i}><span className="material-symbols-outlined li-icon">arrow_right</span>{s}</li>
            ))}
          </ul>
        </section>

        <section className="insight-card animate-fade-in delay-4">
          <div className="insight-header">
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>shield</span>
            <h3>Preventive steps</h3>
          </div>
          <ul className="insight-list">
            {preventive.map((p, i) => (
              <li key={i}><span className="material-symbols-outlined li-icon">arrow_right</span>{p}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Actions */}
      <div className="result-actions animate-fade-in delay-5">
        <button className="btn-primary" onClick={() => navigate(`/reports/${id}`)}>
          <span className="material-symbols-outlined">save</span>
          View Full Report
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </button>
      </div>
    </div>
  );
}
