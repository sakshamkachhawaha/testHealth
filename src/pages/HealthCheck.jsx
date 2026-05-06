import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './HealthCheck.css';

export default function HealthCheck() {
  const { questions, addReport } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isQuick = searchParams.get('quick') === 'true';
  const activeQuestions = isQuick ? questions.slice(0, 3) : questions;
  const total = activeQuestions.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sliderVal, setSliderVal] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const current = activeQuestions[step];
  const progress = ((step) / total) * 100;

  const setAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [current.id - 1]: val }));
  };

  const handleNext = () => {
    if (current.type === 'slider') setAnswer(sliderVal);
    if (step < total - 1) { setStep(s => s + 1); setSliderVal(5); }
    else handleSubmit();
  };

  const handleBack = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = async () => {
    if (current.type === 'slider') setAnswer(sliderVal);
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    const finalAnswers = { ...answers };
    if (current.type === 'slider') finalAnswers[current.id - 1] = sliderVal;
    const report = addReport(finalAnswers);
    navigate(`/result/${report.id}`);
  };

  const hasAnswer = answers[current?.id - 1] !== undefined;
  const isLast = step === total - 1;

  if (isSubmitting) {
    return (
      <div className="check-loading">
        <div className="loading-blob"></div>
        <h2>Analyzing your responses...</h2>
        <p>Our AI is reviewing your symptoms and generating insights</p>
        <div className="loading-dots"><span></span><span></span><span></span></div>
      </div>
    );
  }

  return (
    <div className="health-check">
      {/* Header */}
      <div className="check-header animate-fade-in">
        <button className="back-btn" onClick={() => step > 0 ? handleBack() : navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{step + 1} of {total}</span>
        </div>
        {isQuick && <span className="quick-badge">Quick Check</span>}
      </div>

      {/* AI Assistant Indicator */}
      <div className="ai-indicator animate-fade-in delay-1">
        <div className="ai-avatar">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <span>ZenHealth AI is asking...</span>
      </div>

      {/* Question */}
      <div className="question-card animate-scale-in" key={step}>
        <h2 className="question-text">{current.text}</h2>

        {current.type === 'choice' && (
          <div className="choices">
            {current.options.map(opt => (
              <button
                key={opt}
                className={`choice-btn ${answers[current.id - 1] === opt ? 'selected' : ''}`}
                onClick={() => setAnswer(opt)}
              >
                {answers[current.id - 1] === opt && (
                  <span className="material-symbols-outlined choice-check">check_circle</span>
                )}
                {opt}
              </button>
            ))}
          </div>
        )}

        {current.type === 'slider' && (
          <div className="slider-wrapper">
            <div className="slider-labels">
              <span>No pain</span>
              <span>Severe</span>
            </div>
            <input
              type="range" min={current.min} max={current.max}
              value={sliderVal} onChange={e => setSliderVal(Number(e.target.value))}
              className="slider-input"
            />
            <div className="slider-value">
              <span className="slider-number">{sliderVal}</span>
              <span className="slider-max">/ {current.max}</span>
            </div>
          </div>
        )}

        {current.type === 'toggle' && (
          <div className="toggle-wrapper">
            <button
              className={`toggle-btn ${answers[current.id - 1] === true ? 'active' : ''}`}
              onClick={() => setAnswer(true)}
            >
              <span className="material-symbols-outlined">check</span>
              Yes
            </button>
            <button
              className={`toggle-btn ${answers[current.id - 1] === false ? 'active' : ''}`}
              onClick={() => setAnswer(false)}
            >
              <span className="material-symbols-outlined">close</span>
              No
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="check-actions animate-fade-in delay-2">
        <button
          className={`btn-primary btn-next ${(!hasAnswer && current.type !== 'slider') ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!hasAnswer && current.type !== 'slider'}
        >
          {isLast ? 'Get Results' : 'Continue'}
          <span className="material-symbols-outlined">{isLast ? 'auto_awesome' : 'arrow_forward'}</span>
        </button>
      </div>
    </div>
  );
}
