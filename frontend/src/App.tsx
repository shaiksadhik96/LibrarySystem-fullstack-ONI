import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AuthorsPage from './pages/AuthorsPage';
import ProtectedRoute from './components/ProtectedRoute';

// Redesigned landing/dashboard hero
const Dashboard: React.FC = () => (
  <div className="site-hero card" style={{ alignItems: 'center' }}>
    <div className="hero-left">
      <h1>Manage your library with delight</h1>
      <p>Organize authors, add books, and track borrowed items — all in a clean, friendly interface.</p>

      <div className="hero-cta" style={{ marginTop: 18 }}>
        <button className="btn">Get Started</button>
        <button className="btn secondary">Learn More</button>
      </div>
    </div>

    <div className="illustration-box">
      <svg className="illustration" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="hg" x1="0" x2="1">
            <stop offset="0" stopColor="#fff7ed" />
            <stop offset="1" stopColor="#fff2e6" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" rx="18" fill="url(#hg)" />
        <g transform="translate(40,40)">
          <rect x="30" y="40" width="240" height="150" rx="10" fill="#fffaf2" stroke="#D97706" strokeWidth="3" />
          <circle cx="420" cy="60" r="32" fill="#fde68a" stroke="#fb923c" strokeWidth="3" />
          <text x="40" y="220" fill="#6b4b2e" fontSize="20" fontWeight="700">Read, Learn, Grow</text>
        </g>
      </svg>
    </div>
  </div>
);

// Small helpers to avoid repeating Layout + ProtectedRoute everywhere
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        }
      />

      {/* Optional dashboard/home */}
      <Route
        path="/"
        element={
          <PrivateLayout>
            <Dashboard />
          </PrivateLayout>
        }
      />

      {/* Protected routes */}
      <Route
        path="/authors"
        element={
          <PrivateLayout>
            <AuthorsPage />
          </PrivateLayout>
        }
      />

      <Route
        path="/books"
        element={
          <PrivateLayout>
            <div>Books page (coming next)</div>
          </PrivateLayout>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateLayout>
            <div>Users page (coming next)</div>
          </PrivateLayout>
        }
      />

      <Route
        path="/borrowed"
        element={
          <PrivateLayout>
            <div>Borrowed page (coming next)</div>
          </PrivateLayout>
        }
      />

      {/* Fallback: anything unknown → dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
