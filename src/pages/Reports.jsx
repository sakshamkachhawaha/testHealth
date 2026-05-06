import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Reports.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Reports() {
  const { reports, deleteReport } = useApp();
  const navigate = useNavigate();

  return (
    <div className="reports-page">
      <div className="page-header animate-fade-in">
        <div>
          <h1>Health Reports</h1>
          <p className="page-subtitle">Your complete history of health assessments</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/check')}>
          <span className="material-symbols-outlined">add</span>
          New Check
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state animate-fade-in delay-1">
          <span className="material-symbols-outlined" style={{ fontSize: 56, color: 'var(--outline)' }}>folder_open</span>
          <h3>No reports yet</h3>
          <p>Complete your first health check to see your reports here.</p>
          <button className="btn-primary" onClick={() => navigate('/check')}>Start Health Check</button>
        </div>
      ) : (
        <div className="reports-grid animate-fade-in delay-1">
          {reports.map((report, i) => (
            <div key={report.id} className={`report-item animate-fade-in-up delay-${Math.min(i + 1, 6)}`}>
              <div className="report-item-top" onClick={() => navigate(`/reports/${report.id}`)}>
                <div className="report-item-score" style={{
                  background: report.level === 'high' ? 'var(--error-container)' : report.level === 'medium' ? 'var(--warning-container)' : 'var(--primary-fixed)',
                  color: report.level === 'high' ? 'var(--error)' : report.level === 'medium' ? 'var(--warning)' : 'var(--primary)',
                }}>
                  {report.score}%
                </div>
                <div className="report-item-info">
                  <h3>{report.primarySymptom}</h3>
                  <p>{formatDate(report.date)}</p>
                </div>
                <span className={`level-pill level-${report.level}`}>{report.level}</span>
              </div>
              <div className="report-item-bottom">
                <p className="report-item-summary">{report.summary}</p>
                <div className="report-item-actions">
                  <button className="icon-btn" onClick={() => navigate(`/reports/${report.id}`)}>
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="icon-btn danger" onClick={(e) => { e.stopPropagation(); deleteReport(report.id); }}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
