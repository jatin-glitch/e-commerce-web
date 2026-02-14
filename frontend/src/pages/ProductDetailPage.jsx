import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { imageBaseUrl } from '../lib/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState('Add to cart');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (product, quantity) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setButtonText('Added!');
    setTimeout(() => setButtonText('Add to cart'), 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="centered-page">Loading product…</div>;
  if (!product)
    return (
      <div className="centered-page">
        <span className="muted">Product not found.</span>
      </div>
    );

  return (
    <div className="section">
      <div className="stack-h" style={{ gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px' }}>
          <div className="product-image" style={{ minHeight: '320px' }}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl.startsWith('/Images') ? `${imageBaseUrl}${product.imageUrl}` : product.imageUrl}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  borderRadius: '0.7rem',
                }}
              />
            ) : (
              <div className="stack-v">
                <span className="pill">
                  PKR {product.price?.toLocaleString()}
                </span>
                <span className="muted text-sm">
                  Add an image URL for a richer product page.
                </span>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: '1 1 260px' }}>
          <h1 className="page-title">{product.name}</h1>
          <p className="product-description mt-1">{product.description}</p>
          <div className="mt-2 stack-h" style={{ alignItems: 'center' }}>
            <span className="product-price">
              PKR {product.price?.toLocaleString()}
            </span>
            <span className="muted">
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </span>
          </div>
          <div className="mt-2 stack-h">
            <label className="field" style={{ maxWidth: '120px' }}>
              <span>Quantity</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                handleAddToCart(
                  {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                  },
                  quantity,
                )
              }
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of stock' : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

