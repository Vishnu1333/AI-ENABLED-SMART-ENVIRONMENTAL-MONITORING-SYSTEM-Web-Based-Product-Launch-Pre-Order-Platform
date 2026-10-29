import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

// ─── Context ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

// ─── Storage helpers ─────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  ORDERS: 'aeris_orders',
};

// Default Demo Admin session (no login barrier)
const DEMO_ADMIN = {
  name: 'AERIS AI Administrator',
  role: 'admin',
  email: 'admin@aerisai.com',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('[AppContext] localStorage write failed:', err);
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  // Demo administrator session available across the platform
  const [user] = useState(DEMO_ADMIN);

  // ── Cart ────────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);

  // ── Orders ──────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState(() =>
    readStorage(STORAGE_KEYS.ORDERS, [])
  );

  // ── Persist orders ───────────────────────────────────────────────────────
  useEffect(() => {
    writeStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  // ── Computed ─────────────────────────────────────────────────────────────
  const isAdmin = true; // Open academic demo access

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const price = typeof item.price === 'number' ? item.price : 0;
        return sum + price * (item.quantity ?? 1);
      }, 0),
    [cartItems]
  );

  // ── Cart actions ─────────────────────────────────────────────────────────
  const addToCart = useCallback((item, quantity = 1) => {
    if (!item?.id) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity ?? 1) + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ── Order actions ────────────────────────────────────────────────────────
  const placeOrder = useCallback(
    (orderData) => {
      const newOrder = {
        id: orderData.id ?? `ORD-${Date.now()}`,
        status: orderData.status ?? 'PRE-ORDER REGISTERED',
        createdAt: new Date().toISOString(),
        items: [...cartItems],
        total: cartTotal,
        ...orderData,
      };
      setOrders((prev) => {
        const updated = [newOrder, ...prev];
        writeStorage(STORAGE_KEYS.ORDERS, updated);
        return updated;
      });
      clearCart();
      return newOrder;
    },
    [cartItems, cartTotal, clearCart]
  );

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      );
      writeStorage(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
  }, []);

  // ── Context value ────────────────────────────────────────────────────────
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: true,
      isAdmin,
      cart: {
        items: cartItems,
        total: cartTotal,
        count: cartItems.reduce((n, i) => n + (i.quantity ?? 1), 0),
      },
      orders,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
    }),
    [
      user,
      isAdmin,
      cartItems,
      cartTotal,
      orders,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}

export default AppContext;
