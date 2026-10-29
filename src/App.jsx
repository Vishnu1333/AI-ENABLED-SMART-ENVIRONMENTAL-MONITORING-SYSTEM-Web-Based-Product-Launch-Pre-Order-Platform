import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import TrackOrder from './pages/TrackOrder'
import Admin from './pages/Admin'

function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.2em',
        color: '#6db88a',
      }}
    >
      AERIS AI // INITIALIZING TELEMETRY...
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="app">
        {/* Subtle global grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Laser scanline pulse */}
        <div className="scan-line" aria-hidden="true" />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing page with sticky Navbar */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />

            {/* Hardware Product Selection */}
            <Route
              path="/product"
              element={
                <>
                  <Navbar />
                  <ProductPage />
                </>
              }
            />

            {/* Multi-step Pre-order Checkout */}
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <Checkout />
                </>
              }
            />

            {/* Order Confirmation */}
            <Route
              path="/order-confirmation"
              element={
                <>
                  <Navbar />
                  <OrderConfirmation />
                </>
              }
            />

            {/* Telemetry Order Tracking */}
            <Route
              path="/track-order"
              element={
                <>
                  <Navbar />
                  <TrackOrder />
                </>
              }
            />
            <Route
              path="/track-order/:orderId"
              element={
                <>
                  <Navbar />
                  <TrackOrder />
                </>
              }
            />

            {/* Protected Admin Console */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/*" element={<Admin />} />

            {/* Catch-all fallback */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </AppProvider>
  )
}
