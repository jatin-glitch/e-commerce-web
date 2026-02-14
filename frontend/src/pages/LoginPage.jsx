import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignInButton from '../components/GoogleSignInButton.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section auth-layout">
      <div className="auth-header">
        <h1 className="page-title">Welcome back</h1>
        <p>Login to manage your cart, orders and admin tools.</p>
      </div>
      <form className="stack-v" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <span className="badge-danger mt-1">{error}</span>}
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={submitting}
        >
          {submitting ? 'Signing in…' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4">
        <div style={{ textAlign: 'center', margin: '16px 0', color: '#666' }}>
          OR
        </div>
        <GoogleSignInButton text="Sign in with Google" />
      </div>
      
      <p className="text-sm mt-4">
        New here?{' '}
        <Link to="/register" className="link">
          Create an account
        </Link>
        .
      </p>
    </div>
  );
}

