import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HealthCheck from './pages/HealthCheck';
import ResultScreen from './pages/ResultScreen';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="check" element={<HealthCheck />} />
          <Route path="result/:id" element={<ResultScreen />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
