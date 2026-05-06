import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Layout.css';

const NAV_ITEMS = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/check', icon: 'health_and_safety', label: 'Check' },
  { path: '/reports', icon: 'assignment', label: 'Reports' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function Layout() {
  const { darkMode } = useApp();
  const location = useLocation();

  return (
    <div className="layout">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="material-symbols-outlined">spa</span>
          </div>
          <span className="brand-name">ZenHealth</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="emergency-btn">
            <span className="material-symbols-outlined">emergency</span>
            <span>Emergency: 911</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
