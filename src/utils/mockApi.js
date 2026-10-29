/**
 * AERIS AI – Telemetry & Order Service (Academic Demonstration Mode)
 *
 * Simulates async network requests with realistic latency.
 * Persistence is maintained via browser localStorage:
 * - aeris_orders: Customer pre-orders and manifests
 * - aeris_admin_products: Hardware fleet catalog
 */

import { PRODUCTS } from '../data/products.js';

const KEYS = {
  ORDERS: 'aeris_orders',
  PRODUCTS: 'aeris_admin_products',
};

// Seed demo manifests if none exist
const DEFAULT_DEMO_ORDERS = [
  {
    id: 'ORD-2026-X89',
    customerName: 'Marcus Thorne',
    customerEmail: 'm.thorne@facility.com',
    customerPhone: '+44 7700 900456',
    address: '42 Broadgate Circle, London EC2M 2QS',
    country: 'United Kingdom',
    product: 'AERIS AI ENVIRONMENT MONITOR',
    quantity: 4,
    priceLabel: 'PRICE TO BE CONFIRMED',
    paymentMode: 'PRE-ORDER RESERVATION (£0 DEPOSIT)',
    status: 'PRE-ORDER REGISTERED',
    notes: 'Primary cleanroom atrium deployment.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'ORD-2026-B12',
    customerName: 'Dr. Alistair Finch',
    customerEmail: 'a.finch@stthomas-trust.nhs.uk',
    customerPhone: '+44 7700 900892',
    address: 'Westminster Bridge Rd, London SE1 7EH',
    country: 'United Kingdom',
    product: 'AERIS AI ENVIRONMENT MONITOR',
    quantity: 12,
    priceLabel: 'PRICE TO BE CONFIRMED',
    paymentMode: 'PRE-ORDER RESERVATION (£0 DEPOSIT)',
    status: 'PRICE CONFIRMED',
    notes: 'Surgical theatre differential pressure monitoring pilot.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'ORD-2026-E04',
    customerName: 'Elena Rostova',
    customerEmail: 'e.rostova@canary-trading.com',
    customerPhone: '+44 7700 900115',
    address: '1 Canada Square, London E14 5AA',
    country: 'United Kingdom',
    product: 'AERIS AI ENVIRONMENT MONITOR',
    quantity: 8,
    priceLabel: 'PRICE TO BE CONFIRMED',
    paymentMode: 'TEST CARD VERIFIED',
    status: 'CHASSIS ASSEMBLY',
    notes: 'High-density trading floor continuous air intelligence.',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
];

function delay(ms = 150) {
  return new Promise((res) => setTimeout(res, ms));
}

function readStorage(key, fallback = []) {
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
    console.warn('[mockApi] localStorage write failed:', err);
  }
}

/**
 * Fetch hardware catalogue, reading from localStorage if modified by admin.
 */
export async function getProducts() {
  await delay();
  const stored = readStorage(KEYS.PRODUCTS, null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  return [...PRODUCTS];
}

/**
 * Fetch single product by id.
 */
export async function getProduct(id) {
  await delay();
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return products[0] || PRODUCTS[0];
  return { ...product };
}

/**
 * Create a new customer pre-order allocation.
 */
export async function createOrder(orderData) {
  await delay();
  if (!orderData) throw new Error('Order data is required.');

  const existingOrders = readStorage(KEYS.ORDERS, DEFAULT_DEMO_ORDERS);

  const order = {
    id: orderData.id || `ORD-${Date.now()}`,
    status: orderData.status || 'PRE-ORDER REGISTERED',
    createdAt: new Date().toISOString(),
    ...orderData,
  };

  const updated = [order, ...existingOrders];
  writeStorage(KEYS.ORDERS, updated);
  return order;
}

/**
 * Get orders for a specific email or ID.
 */
export async function getOrders(emailOrId) {
  await delay();
  const orders = readStorage(KEYS.ORDERS, DEFAULT_DEMO_ORDERS);
  if (!emailOrId) return orders;
  return orders.filter(
    (o) =>
      o.id?.toLowerCase() === emailOrId.toLowerCase() ||
      o.customerEmail?.toLowerCase() === emailOrId.toLowerCase()
  );
}

/**
 * Get all orders (open demo admin access).
 */
export async function getAllOrders() {
  await delay();
  let orders = readStorage(KEYS.ORDERS, null);
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    orders = DEFAULT_DEMO_ORDERS;
    writeStorage(KEYS.ORDERS, orders);
  }
  return orders;
}

/**
 * Get all customers derived from orders.
 */
export async function getAllCustomers() {
  await delay();
  const orders = await getAllOrders();
  const seenEmails = new Set();
  const customers = [];

  // Group unique customer records
  orders.forEach((o, idx) => {
    const email = o.customerEmail?.toLowerCase();
    if (email && !seenEmails.has(email)) {
      seenEmails.add(email);
      customers.push({
        id: `cust-${idx + 1}`,
        name: o.customerName || 'Facility Operator',
        email: o.customerEmail,
        phone: o.customerPhone || 'N/A',
        role: 'operator',
        registeredAt: o.createdAt || new Date().toISOString(),
      });
    }
  });

  return customers;
}

/**
 * Update an order's status or details.
 */
export async function updateOrder(orderId, data) {
  await delay();
  const orders = await getAllOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) throw new Error(`Manifest not found: ${orderId}`);

  const updated = {
    ...orders[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  orders[idx] = updated;
  writeStorage(KEYS.ORDERS, orders);
  return updated;
}

/**
 * Return computed analytics for the admin overview.
 */
export async function getAnalytics() {
  await delay();
  const orders = await getAllOrders();
  const customers = await getAllCustomers();

  const totalOrders = orders.length;
  const totalUnits = orders.reduce((sum, o) => sum + (o.quantity || 1), 0);
  const totalCustomers = customers.length;

  return {
    summary: {
      totalOrders,
      totalUnits,
      totalCustomers,
      conversionRate: '4.12%',
      averageSession: '4m 48s',
    },
    topProduct: PRODUCTS[0],
    generatedAt: new Date().toISOString(),
  };
}
