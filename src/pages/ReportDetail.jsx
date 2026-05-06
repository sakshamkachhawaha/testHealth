import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ReportDetail.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function ReportDetail() {
  const { id } = useParams();
  const { reports, questions } = useApp();
  const navigate = useNavigate();
  const report = reports.find(r => r.id === id);

  if (!report) return (
    <div className="not-found">
      <span className="material-symbols-outlined" style={{ fontSize: 48 }}>error</span>
      <h2>Report not found</h2>
      <button className="btn-primary" onClick={() => navigate('/reports')}>View Reports</button>
    </div>
  );

  const { score, level, possibleCauses, preventive, nextSteps, answers, primarySymptom, date, shouldSeeDoctor } = report;
  const color = level === 'high' ? 'var(--error)' : level === 'medium' ? 'var(--warning)' : 'var(--primary)';

  const handleShare = () => {
    const text = `ZenHealth Report - ${primarySymptom}\nScore: ${score}%\nDate: ${formatDate(date)}\n\nPossible Causes:\n${possibleCauses.join('\n')}\n\nPreventive Steps:\n${preventive.join('\n')}`;
    if (navigator.share) navigator.share({ title: 'ZenHealth Report', text });
    else { navigator.clipboard.writeText(text); alert('Report copied to clipboard!'); }
  };

  return (
    <div className="report-detail">
      <div className="detail-header animate-fade-in">
        <button className="back-btn" onClick={() => navigate('/reports')}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1>Health Report</h1>
        <div className="detail-actions-top">
          <button className="icon-btn" onClick={handleShare}>
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="icon-btn" onClick={() => window.print()}>
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="detail-summary animate-fade-in delay-1">
        <div className="detail-score-wrap">
          <div className="detail-score" style={{ borderColor: color, color }}>{score}%</div>
          <div>
            <span className={`level-pill level-${level}`} style={{ fontSize: 14 }}>{level} concern</span>
            <p className="detail-date">{formatDate(date)}</p>
            <p className="detail-symptom">Primary: {primarySymptom}</p>
          </div>
        </div>
      </div>

      {/* Answers Breakdown */}
      <section className="detail-section animate-fade-in delay-2">
        <h2><span className="material-symbols-outlined">quiz</span> Your Responses</h2>
        <div className="answers-list">
          {questions.map((q, i) => {
            const ans = answers[i];
            if (ans === undefined) return null;
            return (
              <div key={i} className="answer-row">
                <span className="answer-q">{q.text}</span>
                <span className="answer-a">{typeof ans === 'boolean' ? (ans ? 'Yes' : 'No') : ans}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Insights */}
      <section className="detail-section animate-fade-in delay-3">
        <h2><span className="material-symbols-outlined">psychology</span> AI-Generated Insights</h2>
        <div className="insights-cols">
          <div className="insight-block">
            <h4>Possible Causes</h4>
            <ul>{possibleCauses.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div className="insight-block">
            <h4>Next Steps</h4>
            <ul>{nextSteps.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="insight-block">
            <h4>Preventive Measures</h4>
            <ul>{preventive.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      {shouldSeeDoctor && (
        <div className="detail-doctor-cta animate-fade-in delay-4">
          <span className="material-symbols-outlined">local_hospital</span>
          <p>Based on this assessment, we recommend consulting a healthcare professional.</p>
          <button className="btn-primary btn-sm">Find a Doctor</button>
        </div>
      )}
    </div>
  );
}
