import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { darkMode, setDarkMode, notifications, setNotifications, user, setUser, reports } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    setUser({ name, email });
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1 className="animate-fade-in">Profile & Settings</h1>

      {/* User Info */}
      <section className="profile-card animate-fade-in delay-1">
        <div className="profile-avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
        {editing ? (
          <div className="profile-form">
            <div className="form-field">
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <div className="form-actions">
              <button className="btn-primary btn-sm" onClick={handleSave}>Save</button>
              <button className="btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h3>{user?.name || 'Set your name'}</h3>
            <p>{user?.email || 'Set your email'}</p>
            <button className="link-btn" onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="profile-stats animate-fade-in delay-2">
        <div className="profile-stat">
          <span className="stat-num">{reports.length}</span>
          <span className="stat-lbl">Total Checks</span>
        </div>
        <div className="profile-stat">
          <span className="stat-num">{reports.length > 0 ? Math.round(reports.reduce((a, r) => a + r.score, 0) / reports.length) : 0}%</span>
          <span className="stat-lbl">Avg Score</span>
        </div>
        <div className="profile-stat">
          <span className="stat-num">{reports.filter(r => r.level === 'low').length}</span>
          <span className="stat-lbl">Low Concern</span>
        </div>
      </section>

      {/* Settings */}
      <section className="settings-section animate-fade-in delay-3">
        <h2>Settings</h2>

        <div className="setting-row">
          <div className="setting-info">
            <span className="material-symbols-outlined">dark_mode</span>
            <div>
              <h4>Dark Mode</h4>
              <p>Switch between light and dark theme</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="material-symbols-outlined">notifications</span>
            <div>
              <h4>Daily Reminders</h4>
              <p>Get notified for daily health checks</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="material-symbols-outlined">lock</span>
            <div>
              <h4>Privacy</h4>
              <p>Your data stays on your device</p>
            </div>
          </div>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>verified_user</span>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="material-symbols-outlined">info</span>
            <div>
              <h4>About ZenHealth</h4>
              <p>Version 1.0 • AI-powered wellness assistant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="disclaimer animate-fade-in delay-4">
        <span className="material-symbols-outlined">gavel</span>
        <p>ZenHealth is an AI-powered wellness tool and does not provide medical diagnoses. Always consult a qualified healthcare professional for medical advice.</p>
      </div>
    </div>
  );
}
