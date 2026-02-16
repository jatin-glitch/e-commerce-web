import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import api from '../lib/api.js';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [shipping, setShipping] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: 'Pakistan',
    postalCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="section centered-page">
        <span className="muted">
          Your cart is empty. Add items from the store first.
        </span>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
        shippingAddress: shipping,
        paymentMethod,
      };
      const res = await api.post('/orders', payload);
      clearCart();
      
      // Show success notification
      showNotification(
        'Your order has been placed successfully! We will notify you about the order details soon.',
        'success',
        5000
      );
      
      if (paymentMethod === 'JAZZCASH_MOCK' && res.data.jazzCashMockUrl) {
        navigate(res.data.jazzCashMockUrl);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      console.error('Failed to place order', err);
      showNotification(
        'Failed to place order. Please try again.',
        'error',
        3000
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="section" onSubmit={handleSubmit}>
      <h1 className="page-title">Checkout</h1>
      <p className="page-subtitle">
        Provide your shipping details and choose Cash on Delivery or a mocked
        JazzCash-style payment experience.
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            value={shipping.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            value={shipping.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="address1">Address line 1</label>
          <input
            id="address1"
            value={shipping.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="address2">Address line 2</label>
          <input
            id="address2"
            value={shipping.addressLine2}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            value={shipping.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="postalCode">Postal code</label>
          <input
            id="postalCode"
            value={shipping.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={shipping.country}
            onChange={(e) => handleChange('country', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mt-2 stack-v">
        <span className="fw-semibold">Payment method</span>
        <div className="radio-group">
          <label className="radio-pill">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="radio-pill">
            <input
              type="radio"
              name="payment"
              value="JAZZCASH_MOCK"
              checked={paymentMethod === 'JAZZCASH_MOCK'}
              onChange={() => setPaymentMethod('JAZZCASH_MOCK')}
            />
            <span>Mock JazzCash</span>
          </label>
        </div>
        <span className="muted text-sm">
          The JazzCash option simulates how a real gateway redirect and
          confirmation could work, without charging any card.
        </span>
      </div>

      <div className="mt-3 stack-h-between">
        <span className="fw-semibold">
          Order total: PKR {total.toLocaleString()}
        </span>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Placing order…' : 'Place order'}
        </button>
      </div>
    </form>
  );
}

