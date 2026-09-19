import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { getStoredToken, setAuthToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile');
      setUser(data.user);
    } catch (error) {
      setUser(null);
      setAuthToken(null);
    }
  };

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      setAuthToken(token);
      fetchProfile().finally(() => setLoading(false));
      return;
    }

    setLoading(false);
  }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    setAuthToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setAuthToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, fetchProfile }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
