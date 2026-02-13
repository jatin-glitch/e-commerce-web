import { useEffect, useState } from 'react';
import api from '../../lib/api.js';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="section">
      <div className="stack-h-between">
        <div>
          <h1 className="page-title">Admin – orders</h1>
          <p className="page-subtitle">
            Review how customers move through COD and mocked JazzCash flows.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={load}
        >
          Refresh
        </button>
      </div>
      <table className="table mt-1">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>
                <div className="stack-v">
                  <span className="fw-semibold">
                    {o.user?.name || 'N/A'}
                  </span>
                  <span className="muted text-sm">
                    {o.user?.email || '—'}
                  </span>
                </div>
              </td>
              <td>PKR {o.totalAmount?.toLocaleString()}</td>
              <td>
                <span className="chip">{o.paymentMethod}</span>{' '}
                <span
                  className={
                    o.paymentStatus === 'PAID'
                      ? 'badge-soft'
                      : o.paymentStatus === 'FAILED'
                      ? 'badge-danger'
                      : 'pill'
                  }
                >
                  {o.paymentStatus}
                </span>
              </td>
              <td>{o.status}</td>
              <td className="text-sm">
                {new Date(o.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={5}>
                <span className="muted">No orders yet.</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

