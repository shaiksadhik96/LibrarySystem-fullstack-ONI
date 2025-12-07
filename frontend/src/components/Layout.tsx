import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-root">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#2b2b22' }}>Library</span>
          </Link>
          <nav className="app-nav" aria-label="Main navigation">
            <Link to="/authors">Authors</Link>
            <Link to="/books">Books</Link>
            <Link to="/users">Users</Link>
            <Link to="/borrowed">Borrowed</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              <span style={{ color: '#2b2b22', fontWeight: 600 }}>Hi, {user.name}</span>
              <button className="btn" onClick={logout} style={{ background: '#ef4444' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: '#8b5e34', fontWeight: 700 }}>
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="app-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
    