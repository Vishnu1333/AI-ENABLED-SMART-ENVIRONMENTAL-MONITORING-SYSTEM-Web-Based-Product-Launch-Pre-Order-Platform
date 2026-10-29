/**
 * AERIS AI – Product catalogue & admin credentials
 */

export const PRODUCTS = [
  {
    id: 'aeris-ai-monitor-v1',
    name: 'AERIS AI ENVIRONMENT MONITOR',
    tagline: 'Continuous AI-powered environmental intelligence',
    description:
      'The AERIS AI Environment Monitor is a precision environmental sensing device with built-in AI anomaly detection. Continuously monitors temperature, humidity, air quality, CO₂ and more — sending intelligent alerts when conditions change.',
    price: null, // TBC
    priceLabel: 'PRICE TO BE CONFIRMED',
    status: 'pre-order',
    badge: 'LAUNCHING 2026',
    specs: [
      { label: 'Temperature Range', value: '-10°C to +60°C' },
      { label: 'Humidity Range', value: '0–100% RH' },
      { label: 'Air Quality', value: 'PM2.5, PM10, TVOC, CO₂' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.2' },
      { label: 'AI Processing', value: 'On-device + Cloud' },
      { label: 'Battery', value: '72hr backup power' },
      { label: 'Display', value: 'E-Ink status display' },
      { label: 'Certifications', value: 'CE, FCC (pending)' },
    ],
    features: [
      'Continuous 24/7 environmental monitoring',
      'AI anomaly detection with configurable thresholds',
      'Real-time alerts via app, email, and SMS',
      'Multi-sensor fusion for accurate readings',
      'Historical data and trend analysis',
      'Multi-location dashboard support',
      'Secure end-to-end encrypted data transmission',
      'Open API for integration',
    ],
    image: null,
  },
];

/** Admin credentials used for mock authentication */
export const ADMIN_CREDENTIALS = {
  email: 'admin@aerisai.com',
  password: 'AerisAdmin2026!',
};

/** Convenience lookup by id */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export default PRODUCTS;
