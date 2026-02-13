import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="section">
      <div className="stack-h-between">
        <div>
          <h1 className="page-title">Your cart</h1>
          <p className="page-subtitle">
            Adjust quantities and continue to checkout to complete your order.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          Proceed to checkout
        </button>
      </div>

      {items.length === 0 ? (
        <div className="centered-page">
          <span className="muted">
            Your cart is empty.{' '}
            <Link to="/" className="link">
              Browse products
            </Link>
            .
          </span>
        </div>
      ) : (
        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ width: '120px' }}>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product.id}>
                  <td>
                    <div className="stack-v">
                      <span className="fw-semibold">{item.product.name}</span>
                      <span className="muted text-sm">
                        PKR {item.product.price?.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.product.id,
                          Number(e.target.value) || 1,
                        )
                      }
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>PKR {item.product.price?.toLocaleString()}</td>
                  <td>
                    PKR{' '}
                    {(item.product.price * item.quantity).toLocaleString()}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-ghost text-sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="stack-h-between mt-2">
            <span className="muted">Total</span>
            <span className="fw-semibold">
              PKR {total.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

