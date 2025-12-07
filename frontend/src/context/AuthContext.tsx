import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axiosClient';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      const accessToken = response.data.accessToken;
      const userData = response.data.user;

      if (!accessToken) throw new Error('Login failed: no access token returned');

      setToken(accessToken);
      setUser(userData);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      // Normalize axios/network errors
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      throw new Error(msg);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Backend exposes a public POST /users to create accounts
      await api.post('/users', { name, email, password });

      // After successful creation, immediately login to obtain token
      await login(email, password);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Registration failed';
      throw new Error(msg);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
