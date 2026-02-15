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
        // Always validate with the backend to ensure cookies are valid
        const res = await api.get('/auth/me');
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          // If backend says no user, clear localStorage
          setUser(null);
          localStorage.removeItem('user');
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
    await api.post('/auth/logout');
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

