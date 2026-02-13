import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'ecommerce_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, quantity } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

