/**
 * AERIS AI – Data formatting utilities
 */

// ─── Currency ─────────────────────────────────────────────────────────────────

/**
 * Format a numeric amount as a currency string.
 * Returns 'TBC' when amount is null or undefined.
 *
 * @param {number|null|undefined} amount
 * @param {string} [currency='GBP']
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'GBP') {
  if (amount === null || amount === undefined) return 'TBC';
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const symbol = currency === 'GBP' ? '£' : currency;
    return `${symbol}${Number(amount).toFixed(2)}`;
  }
}

// ─── Dates ───────────────────────────────────────────────────────────────────

/**
 * Format a date value to a human-readable string.
 *
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '—';
  try {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '—';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  } catch {
    return String(date);
  }
}

/**
 * Format a date value to a short date (no time).
 *
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatDateShort(date) {
  if (!date) return '—';
  try {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '—';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return String(date);
  }
}

// ─── Order IDs ───────────────────────────────────────────────────────────────

/**
 * Formats an order id to the ORD-XXXXX display format.
 * If the id already starts with 'ORD-' it is returned as-is.
 *
 * @param {string|number} id
 * @returns {string}
 */
export function formatOrderId(id) {
  if (!id) return 'ORD-UNKNOWN';
  const str = String(id);
  if (str.toUpperCase().startsWith('ORD-')) return str.toUpperCase();
  // Pad or truncate the numeric portion to 5 chars
  const numeric = str.replace(/\D/g, '').slice(-5).padStart(5, '0');
  return `ORD-${numeric}`;
}

/**
 * Generate a unique order ID using timestamp + random component.
 *
 * @returns {string}  e.g. "ORD-72849"
 */
export function generateOrderId() {
  const ts = Date.now().toString().slice(-5);
  const rand = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  return `ORD-${ts}${rand}`;
}

// ─── Order status ─────────────────────────────────────────────────────────────

/** @typedef {{ label: string, color: string, bg: string }} StatusMeta */

const STATUS_MAP = {
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  confirmed: { label: 'Confirmed', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  processing: { label: 'Processing', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
  shipped: { label: 'Shipped', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
  delivered: { label: 'Delivered', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  cancelled: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  refunded: { label: 'Refunded', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
};

/**
 * Returns display metadata for a given order status string.
 *
 * @param {string} status
 * @returns {StatusMeta}
 */
export function formatStatus(status) {
  return (
    STATUS_MAP[status?.toLowerCase()] ?? {
      label: status ?? 'Unknown',
      color: '#9CA3AF',
      bg: 'rgba(156,163,175,0.15)',
    }
  );
}

// ─── Sensor values ────────────────────────────────────────────────────────────

/** Unit symbols for common sensor types */
const UNIT_LABELS = {
  c: '°C',
  celsius: '°C',
  f: '°F',
  fahrenheit: '°F',
  '%': '%',
  rh: '% RH',
  ppm: ' ppm',
  ppb: ' ppb',
  'µg/m³': ' µg/m³',
  'ug/m3': ' µg/m³',
  lux: ' lux',
  db: ' dB',
  dba: ' dBa',
  hpa: ' hPa',
  pa: ' Pa',
  ms: ' ms',
  v: ' V',
  ma: ' mA',
  w: ' W',
};

/**
 * Formats a sensor reading with the appropriate unit symbol.
 *
 * @param {number|null|undefined} value
 * @param {string} [unit='']
 * @returns {string}
 */
export function formatSensorValue(value, unit = '') {
  if (value === null || value === undefined) return '—';
  const num = Number(value);
  if (isNaN(num)) return '—';

  const unitLabel = UNIT_LABELS[unit.toLowerCase()] ?? (unit ? ` ${unit}` : '');
  const formatted = Number.isInteger(num) ? num : num.toFixed(1);
  return `${formatted}${unitLabel}`;
}

// ─── Misc helpers ─────────────────────────────────────────────────────────────

/**
 * Truncate a string to a maximum length, appending '…' if needed.
 *
 * @param {string} str
 * @param {number} [maxLength=80]
 * @returns {string}
 */
export function truncateString(str, maxLength = 80) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1).trimEnd() + '…';
}
