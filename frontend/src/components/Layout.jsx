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
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">Shop</span>
            <span className="brand-sub">E‑Commerce</span>
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
            <Link to="/" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>
            <Link to="/cart" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              🛒 Cart ({cartCount})
            </Link>
            <button
              className="mobile-nav-item"
              onClick={() => {
                navigate('/reviews');
                setMobileMenuOpen(false);
              }}
            >
              ⭐ Reviews
            </button>
            {user?.role === 'admin' && (
              <>
                <Link to="/admin/products" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  ⚙️ Admin Products
                </Link>
                <Link to="/admin/orders" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  📋 Admin Orders
                </Link>
              </>
            )}
            {user ? (
              <button
                className="mobile-nav-item"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                🚪 Logout ({user.name})
              </button>
            ) : (
              <>
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  🔑 Login
                </button>
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                >
                  📝 Sign up
                </button>
              </>
            )}
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

      <main className="app-main">
        <div className="container">{children}</div>
      </main>

      <footer className="app-footer">
        <div className="container footer-inner">
          <span>Modern E‑commerce Demo</span>
          <span>COD & Mock JazzCash checkout</span>
        </div>
      </footer>
    </div>
  );
}

