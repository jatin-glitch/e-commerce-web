import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/api.js';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function MockJazzCashPage() {
  const query = useQuery();
  const orderId = query.get('orderId');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleResult = async (success) => {
    if (!orderId) {
      navigate('/');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/payments/jazzcash-mock/confirm', {
        orderId,
        success,
      });
      navigate('/');
    } catch (err) {
      console.error('Mock JazzCash confirm error', err);
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  if (!orderId) {
    return (
      <div className="section centered-page">
        <span className="muted">
          Missing order information for JazzCash mock payment.
        </span>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="page-title">Mock JazzCash payment</h1>
      <p className="page-subtitle">
        This page imitates how a hosted JazzCash screen might look in a
        sandbox. Choose to approve or decline – no money is actually moved.
      </p>

      <div className="stack-v mt-1">
        <span className="chip">Order ID: {orderId}</span>
        <span className="muted text-sm">
          In a real integration this page would be replaced with JazzCash&apos;s
          secure payment form.
        </span>
      </div>

      <div className="mt-3 stack-h" style={{ justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={submitting}
          onClick={() => handleResult(false)}
        >
          Simulate failure
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={submitting}
          onClick={() => handleResult(true)}
        >
          Simulate success
        </button>
      </div>
    </div>
  );
}

