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
        if (storedUser) {
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
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const userData = res.data.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification('Login successful! Welcome back!', 'success');
  };

  const register = async (payload) => {
    try {
      const res = await api.post('/auth/register', payload);
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      showNotification('Registration successful! Welcome to MegaMart!', 'success');
    } catch (error) {
      // Re-throw the error so the component can handle it
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    }
    setUser(null);
    localStorage.removeItem('user');
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

