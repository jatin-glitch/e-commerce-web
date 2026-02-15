import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    const token = urlParams.get('token');
    
    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(user));
        if (token) {
          localStorage.setItem('token', token);
        }
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/login?error=google_auth_failed', { replace: true });
      }
    } else {
      navigate('/login?error=google_auth_failed', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="section centered-page">
      <div>Completing authentication...</div>
    </div>
  );
}
