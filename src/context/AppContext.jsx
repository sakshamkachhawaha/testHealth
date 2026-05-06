import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const QUESTIONS = [
  { id: 1, text: "What's your primary symptom today?", type: 'choice', options: ['Headache', 'Fever', 'Cough', 'Fatigue', 'Body Pain', 'Nausea', 'Other'] },
  { id: 2, text: "How long have you been experiencing this?", type: 'choice', options: ['Less than a day', '1–3 days', '4–7 days', '1–2 weeks', 'More than 2 weeks'] },
  { id: 3, text: "How would you rate your pain or discomfort?", type: 'slider', min: 0, max: 10 },
  { id: 4, text: "Have you noticed any fever?", type: 'toggle' },
  { id: 5, text: "Are you experiencing any breathing difficulties?", type: 'toggle' },
  { id: 6, text: "How has your energy level been?", type: 'choice', options: ['Normal', 'Slightly low', 'Quite tired', 'Exhausted'] },
  { id: 7, text: "Any changes in appetite or sleep?", type: 'choice', options: ['No changes', 'Less appetite', 'Poor sleep', 'Both affected'] },
  { id: 8, text: "Have you been under unusual stress lately?", type: 'toggle' },
  { id: 9, text: "Any known allergies or chronic conditions?", type: 'choice', options: ['None', 'Allergies', 'Asthma', 'Diabetes', 'Heart condition', 'Other'] },
  { id: 10, text: "Have you taken any medication for this?", type: 'choice', options: ['None', 'Over-the-counter', 'Prescribed medication', 'Home remedies'] },
];

function generateReport(answers) {
  let score = Math.floor(Math.random() * 40) + 30;
  const hasFever = answers[3] === true;
  const hasBreathingIssue = answers[4] === true;
  const painLevel = answers[2] || 0;
  const duration = answers[1] || '';
  const stress = answers[7] === true;

  if (hasFever) score += 15;
  if (hasBreathingIssue) score += 20;
  if (painLevel > 7) score += 10;
  if (duration === '1–2 weeks' || duration === 'More than 2 weeks') score += 10;
  if (stress) score += 5;
  score = Math.min(score, 95);

  let level = 'low';
  if (score >= 70) level = 'high';
  else if (score >= 45) level = 'medium';

  const possibleCauses = [];
  const preventive = [];
  const nextSteps = [];

  if (hasFever) {
    possibleCauses.push('Viral or bacterial infection');
    preventive.push('Stay hydrated and rest adequately');
    nextSteps.push('Monitor temperature regularly');
  }
  if (hasBreathingIssue) {
    possibleCauses.push('Respiratory irritation or infection');
    preventive.push('Avoid pollutants and dusty environments');
    nextSteps.push('Seek medical evaluation promptly');
  }
  if (painLevel > 5) {
    possibleCauses.push('Inflammation or strain');
    preventive.push('Apply cold/warm compress as appropriate');
  }
  if (stress) {
    possibleCauses.push('Stress-related physical symptoms');
    preventive.push('Practice relaxation techniques daily');
  }
  if (possibleCauses.length === 0) {
    possibleCauses.push('Mild systemic response', 'Seasonal variation effects');
    preventive.push('Maintain balanced nutrition', 'Get 7-9 hours of sleep');
  }
  if (nextSteps.length === 0) {
    nextSteps.push(level === 'high' ? 'Consult a doctor within 24 hours' : 'Continue monitoring symptoms');
  }
  nextSteps.push('Keep a symptom diary');

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    date: new Date().toISOString(),
    score,
    level,
    primarySymptom: answers[0] || 'General',
    duration: answers[1] || 'Not specified',
    answers,
    possibleCauses,
    preventive,
    nextSteps,
    shouldSeeDoctor: score >= 65,
    summary: `Based on your responses, your health concern level is ${level}. ${score >= 65 ? 'We recommend consulting a healthcare professional.' : 'Continue monitoring and follow preventive measures.'}`
  };
}

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('zenhealth-dark') === 'true');
  const [reports, setReports] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zenhealth-reports') || '[]'); } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zenhealth-user') || 'null'); } catch { return null; }
  });
  const [notifications, setNotifications] = useState(() => localStorage.getItem('zenhealth-notif') !== 'false');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('zenhealth-dark', darkMode);
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('zenhealth-reports', JSON.stringify(reports)); }, [reports]);
  useEffect(() => { if (user) localStorage.setItem('zenhealth-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('zenhealth-notif', notifications); }, [notifications]);

  const addReport = (answers) => {
    const report = generateReport(answers);
    setReports(prev => [report, ...prev]);
    return report;
  };

  const deleteReport = (id) => setReports(prev => prev.filter(r => r.id !== id));

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      reports, addReport, deleteReport,
      user, setUser,
      notifications, setNotifications,
      questions: QUESTIONS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
