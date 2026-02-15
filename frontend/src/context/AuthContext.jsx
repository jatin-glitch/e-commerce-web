import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../lib/api.js';
import { useNotification } from './NotificationContext.jsx';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // First check if user data exists in localStorage (from Google OAuth)
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setLoading(false);
          return;
        }

        // If no stored user, fetch from API
        const res = await api.get('/auth/me');
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const userData = res.data.user;
    const token = res.data.token;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
    showNotification('Login successful! Welcome back!', 'success');
  };

  const register = async (payload) => {
    try {
      const res = await api.post('/auth/register', payload);
      const userData = res.data.user;
      const token = res.data.token;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('token', token);
      }
      showNotification('Registration successful! Welcome to MegaMart!', 'success');
    } catch (error) {
      // Re-throw the error so the component can handle it
      throw error;
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showNotification('Logged out successfully!', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

