import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignInButton from '../components/GoogleSignInButton.jsx';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await register({ name, email, password, role });
      navigate('/');
    } catch (err) {
      console.error('Register failed', err);
      setError('Unable to create account. Try a different email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section auth-layout">
      <div className="auth-header">
        <h1 className="page-title">Create account</h1>
        <p>
          Register as a shopper, or select admin to explore the management
          dashboard.
        </p>
      </div>
      <form className="stack-v" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin (for demo)</option>
          </select>
          <span className="muted text-sm">
            In a real app, admin roles would be assigned by the team, not from
            this screen.
          </span>
        </div>
        {error && <span className="badge-danger mt-1">{error}</span>}
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={submitting}
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      
      <div className="mt-4">
        <div style={{ textAlign: 'center', margin: '16px 0', color: '#666' }}>
          OR
        </div>
        <GoogleSignInButton text="Sign up with Google" />
      </div>
      
      <p className="text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="link">
          Login
        </Link>
        .
      </p>
    </div>
  );
}

