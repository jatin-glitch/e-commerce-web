import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${isActive ? 'nav-link-active' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      // Add closing animation
      const menu = document.querySelector('.mobile-nav-menu');
      if (menu) {
        menu.classList.add('closing');
        setTimeout(() => {
          setMobileMenuOpen(false);
          menu.classList.remove('closing');
        }, 300);
      }
    } else {
      setMobileMenuOpen(true);
    }
  };

  const closeMobileMenu = () => {
    const menu = document.querySelector('.mobile-nav-menu');
    if (menu) {
      menu.classList.add('closing');
      setTimeout(() => {
        setMobileMenuOpen(false);
        menu.classList.remove('closing');
      }, 300);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">MegaMart</span>
          </Link>
          
          {/* Mobile menu toggle */}
          <button 
            className="mobile-nav-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            ☰ Menu
          </button>
          
          {/* Desktop navigation */}
          <nav className="nav-main">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/cart">Cart ({cartCount})</NavItem>
            <button
              type="button"
              className="btn btn-secondary reviews-btn"
              onClick={() => navigate('/reviews')}
            >
              ⭐ Reviews
            </button>
            {user?.role === 'admin' && (
              <>
                <NavItem to="/admin/products">Admin Products</NavItem>
                <NavItem to="/admin/orders">Admin Orders</NavItem>
              </>
            )}
          </nav>
          
          {/* Mobile navigation menu */}
          <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-header">
              <h3>Menu</h3>
            </div>
            
            <div className="mobile-nav-section">
              <div className="mobile-nav-section-title">Navigation</div>
              <Link to="/" className="mobile-nav-item nav-item-primary" onClick={closeMobileMenu}>
                🏠 Home
              </Link>
              <Link to="/cart" className="mobile-nav-item nav-item-primary" onClick={closeMobileMenu}>
                🛒 Cart ({cartCount})
              </Link>
              <button
                className="mobile-nav-item nav-item-primary"
                onClick={() => {
                  navigate('/reviews');
                  closeMobileMenu();
                }}
              >
                ⭐ Reviews
              </button>
            </div>

            {user?.role === 'admin' && (
              <div className="mobile-nav-section">
                <div className="mobile-nav-section-title">Admin</div>
                <Link to="/admin/products" className="mobile-nav-item" onClick={closeMobileMenu}>
                  ⚙️ Admin Products
                </Link>
                <Link to="/admin/orders" className="mobile-nav-item" onClick={closeMobileMenu}>
                  📋 Admin Orders
                </Link>
              </div>
            )}

            <div className="mobile-nav-section">
              <div className="mobile-nav-section-title">Account</div>
              {user ? (
                <>
                  <div className="mobile-nav-item user-info">
                    👤 {user.name} ({user.role})
                  </div>
                  <button
                    className="mobile-nav-item logout-btn"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mobile-nav-item auth-btn"
                    onClick={() => {
                      navigate('/login');
                      closeMobileMenu();
                    }}
                  >
                    🔑 Login
                  </button>
                  <button
                    className="mobile-nav-item auth-btn signup"
                    onClick={() => {
                      navigate('/register');
                      closeMobileMenu();
                    }}
                  >
                    📝 Sign up
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-user">
                  {user.name} ({user.role})
                </span>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-scroll">
          <div className="banner-content">
            <span className="welcome-text">🛍️ MegaMart - Your Premium Shopping Destination</span>
            <span className="promo-divider">•</span>
            <span className="promo-text">🎉 50% OFF Everything</span>
            <span className="promo-divider">•</span>
            <span className="promo-code">Use Code: MEGA50</span>
            <span className="promo-divider">•</span>
            <span className="welcome-text">Free Shipping on Orders 4000PKR+</span>
            <span className="promo-divider">•</span>
            <span className="promo-text">Premium Quality Products</span>
            <span className="promo-divider">•</span>
            <span className="promo-code">Limited Time Offer</span>
          </div>
        </div>
      </div>

      <main className="app-main">
        <div className="container">{children}</div>
      </main>

      <footer className="app-footer">
        <div className="container footer-inner">
          <span>E-Commerce-Web</span>
          <span>COD & Mock JazzCash checkout</span>
        </div>
      </footer>
    </div>
  );
}

