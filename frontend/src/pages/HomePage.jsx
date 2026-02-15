import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { imageBaseUrl } from '../lib/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showHamburger, setShowHamburger] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (product, quantity = 1) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setMobileMenuOpen(false);
    
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(category.toLowerCase()) ||
        p.description?.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    
    // Scroll only a little bit down instead of all the way to products
    window.scrollBy({
      top: 200,
      behavior: 'smooth'
    });
  };

  // Get nearby products based on current product categories
  const getNearbyProducts = () => {
    if (filteredProducts.length === 0) return [];
    
    // Get unique categories from current filtered products
    const categories = [...new Set(filteredProducts.map(p => 
      p.name.toLowerCase().split(' ')[0] // Simple categorization by first word
    ))];
    
    // Find products that match these categories but aren't in current view
    const nearby = products.filter(p => {
      const productCategory = p.name.toLowerCase().split(' ')[0];
      return categories.includes(productCategory) && 
             !filteredProducts.some(fp => fp._id === p._id);
    });
    
    return nearby.slice(0, 4); // Limit to 4 nearby products
  };

  const nearbyProducts = getNearbyProducts();

  // Handle scroll behavior for hamburger menu
  useEffect(() => {
    const handleResize = () => {
      // Always hide hamburger menu
      setShowHamburger(false);
      setMobileMenuOpen(false);
    };

    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    // Initial check
    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered products
        setError('');
      } catch (err) {
        console.error('Failed to load products', err);
        setError(
          'Unable to load products. Make sure the backend (port 5000) and MongoDB are running.',
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <section className="hero-banner">
        <div>
          <h1 className="hero-heading">
            Discover Premium Electronics & Smart Devices
          </h1>
          <p className="hero-text">
            Explore our curated collection of cutting-edge technology including AR glasses, 
            professional audio equipment, and innovative smart devices. Experience secure shopping 
            with flexible payment options and reliable nationwide delivery across Pakistan.
          </p>
        </div>
      </section>

      <section className="section" id="products-section">
        <div className="stack-h-between">
          <div>
            <h2 className="page-title">Featured products</h2>
            <p className="page-subtitle">
              A simple grid that showcases the full‑stack setup while staying
              focused and easy to scan.
            </p>
            {activeCategory !== 'all' && (
              <div className="active-category-indicator">
                <span className="category-badge">
                  {activeCategory === 'headphone' && '🎧 Headphones'}
                  {activeCategory === 'earphone' && '🎵 Earphones'}
                  {activeCategory === 'watch' && '⌚ Smartwatch'}
                  {activeCategory === 'glass' && '👓 Smart Glasses'}
                  {activeCategory === 'camera' && '📷 Camera'}
                  {activeCategory === 'power' && '🔋 Power Bank'}
                </span>
                <button 
                  className="clear-filter-btn"
                  onClick={() => handleCategoryClick('all')}
                >
                  ✕ Clear
                </button>
              </div>
            )}
          </div>
          <div className="category-menu">
            <button 
              className={`hamburger-btn ${!showHamburger ? 'hidden' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Category menu"
            >
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
            <div className={`category-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('headphone')}
              >
                🎧 Headphones
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('earphone')}
              >
                🎵 Earphones
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('watch')}
              >
                ⌚ Smartwatch
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('glass')}
              >
                👓 Smart Glasses
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('camera')}
              >
                📷 Camera
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('power')}
              >
                🔋 Power Bank
              </button>
              <button 
                className="category-item" 
                onClick={() => handleCategoryClick('all')}
              >
                🛍️ All Products
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="centered-page">Loading products…</div>
        ) : error ? (
          <div className="centered-page">
            <span className="badge-danger">{error}</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="centered-page">
            <span className="muted">
              No products found in this category. Try selecting a different category.
            </span>
          </div>
        ) : (
          <div className="grid-products">
            {filteredProducts.map((p) => (
              <article key={p._id} className="product-card">
                <Link to={`/product/${p._id}`} className="product-image">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl.startsWith('/Images') ? `${imageBaseUrl}${p.imageUrl}` : p.imageUrl}
                      alt={p.name}
                      style={{ borderRadius: '0.6rem', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="stack-v">
                      <span className="pill">
                        PKR {p.price?.toLocaleString() ?? p.price}
                      </span>
                      <span className="muted text-sm">
                        Tap to view details &gt;
                      </span>
                    </div>
                  )}
                </Link>
                <div className="card-header-row">
                  <h3 className="product-name">{p.name}</h3>
                  <span className="muted text-sm">
                    {p.stock > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <p className="product-description">
                  {p.description?.slice(0, 90) ?? ''}
                  {p.description && p.description.length > 90 ? '…' : ''}
                </p>
                <div className="stack-h-between mt-1">
                  <span className="product-price">
                    PKR {p.price?.toLocaleString() ?? p.price}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleAddToCart(
                        {
                          id: p._id,
                          name: p.name,
                          price: p.price,
                          imageUrl: p.imageUrl,
                        },
                        1,
                      );
                    }}
                    disabled={p.stock === 0}
                  >
                    {p.stock === 0 ? 'Out of stock' : 'Add to cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Nearby Products Section */}
      {nearbyProducts.length > 0 && (
        <section className="section">
          <div>
            <h2 className="page-title">Nearby Products</h2>
            <p className="page-subtitle">
              Similar items you might like based on your current selection
            </p>
            <div className="grid-products">
              {nearbyProducts.map((p) => (
                <article key={p._id} className="product-card nearby-product">
                  <Link to={`/product/${p._id}`} className="product-image">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl.startsWith('/Images') ? `${imageBaseUrl}${p.imageUrl}` : p.imageUrl}
                        alt={p.name}
                        style={{ borderRadius: '0.6rem', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="stack-v">
                        <span className="pill">
                          PKR {p.price?.toLocaleString() ?? p.price}
                        </span>
                        <span className="muted text-sm">
                          Tap to view details &gt;
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="card-header-row">
                    <h3 className="product-name">{p.name}</h3>
                    <span className="muted text-sm">
                      {p.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                  </div>
                  <p className="product-description">
                    {p.description?.slice(0, 90) ?? ''}
                    {p.description && p.description.length > 90 ? '…' : ''}
                  </p>
                  <div className="stack-h-between mt-1">
                    <span className="product-price">
                      PKR {p.price?.toLocaleString() ?? p.price}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-add-to-cart"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        handleAddToCart(
                          {
                            id: p._id,
                            name: p.name,
                            price: p.price,
                            imageUrl: p.imageUrl,
                          },
                          1,
                        );
                      }}
                      disabled={p.stock === 0}
                    >
                      {p.stock === 0 ? 'Out of stock' : 'Add to cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-item">
              <span className="trust-number">50K+</span>
              <span className="trust-label">Happy Customers</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">100+</span>
              <span className="trust-label">Products</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">4.8★</span>
              <span className="trust-label">Customer Rating</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">24/7</span>
              <span className="trust-label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Features Section - At the very bottom */}
      <section className="delivery-footer-section">
        <div className="container">
          <div className="delivery-footer-content">
            <div className="delivery-footer-item">
              <span className="delivery-footer-icon">🚚</span>
              <div>
                <strong>Fast Delivery</strong>
                <p>4-7 working days nationwide</p>
              </div>
            </div>
            <div className="delivery-footer-item">
              <span className="delivery-footer-icon">🆓</span>
              <div>
                <strong>Free Delivery</strong>
                <p>On orders above PKR 4,000</p>
              </div>
            </div>
            <div className="delivery-footer-item">
              <span className="delivery-footer-icon">💬</span>
              <div>
                <strong>24/7 Support</strong>
                <p>Live chat: support@ecommerce.com</p>
              </div>
            </div>
          </div>
          <div className="delivery-footer-pills">
            <span>Auth & Roles</span>
            <span>Products & Cart</span>
            <span>COD & Mock JazzCash</span>
            <span>Admin Panel</span>
          </div>
        </div>
      </section>
    </div>
  );
}

