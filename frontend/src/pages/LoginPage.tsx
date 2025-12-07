import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signin') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/authors');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-grid">
      <div className="form-card clean">
        <div>
          <h3 className="login-title">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h3>
          <div className="login-sub">Quickly sign {mode === 'signin' ? 'in to manage' : 'up to start managing'} your library.</div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className={`btn ${mode === 'signin' ? '' : 'secondary'}`} onClick={() => setMode('signin')} type="button">Sign In</button>
          <button className={`btn ${mode === 'signup' ? '' : 'secondary'}`} onClick={() => setMode('signup')} type="button">Sign Up</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-field">
              <label>Name</label>
              <input className="input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div className="form-field">
            <label>Email</label>
            <input className="input" placeholder="you@domain.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input className="input" placeholder="Enter a secure password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div style={{ color: '#b91c1c', marginBottom: 8 }}>{error}</div>}

          <div className="form-actions">
            <button className="btn wide" type="submit" disabled={loading}>{loading ? (mode === 'signin' ? 'Signing in...' : 'Creating...') : (mode === 'signin' ? 'Sign In' : 'Create Account')}</button>
            <button type="button" className="btn ghost" onClick={() => { setEmail(''); setPassword(''); setName(''); }}>Reset</button>
          </div>
        </form>
      </div>

      <div className="login-illustration">
        <div className="illustration-box">
          <svg className="illustration" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#fff7ed" />
                <stop offset="1" stopColor="#fff1e6" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" rx="20" fill="url(#g1)" />
            <g transform="translate(40,40)">
              <path d="M40 300 C120 180 260 180 340 300" fill="#fff3e0" stroke="#D97706" strokeWidth="4" />
              <rect x="60" y="60" width="220" height="160" rx="12" fill="#fffaf2" stroke="#B06B25" strokeWidth="3" />
              <circle cx="360" cy="80" r="34" fill="#fde68a" stroke="#fb923c" strokeWidth="3" />
              <g transform="translate(90,120)" fill="#b06b25">
                <path d="M0 0 Q40 20 80 0" stroke="#b06b25" strokeWidth="3" fill="none" />
              </g>
              <text x="70" y="240" fill="#6b4b2e" fontSize="22" fontWeight="700">Hello, Reader!</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
