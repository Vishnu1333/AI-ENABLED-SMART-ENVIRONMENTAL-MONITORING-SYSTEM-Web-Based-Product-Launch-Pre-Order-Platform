import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ArrowRight, Minus, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PRODUCTS } from '../data/products'
import styles from './ProductPage.module.css'

export default function ProductPage() {
  const navigate = useNavigate()
  const { addToCart } = useApp()

  const [product, setProduct] = useState(() => {
    try {
      const stored = localStorage.getItem('aeris_admin_products')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
      }
    } catch {
      // fallback
    }
    return PRODUCTS[0]
  })

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [added, setAdded] = useState(false)

  const handleQuantity = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(50, prev + delta)))
  }

  const handlePreOrder = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => {
      navigate('/checkout')
    }, 400)
  }

  return (
    <div className={styles.page}>
      <div className={styles.techGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadLink}>AERIS AI</Link>
          <span className={styles.breadDivider}>/</span>
          <span className={styles.breadActive}>HARDWARE ARCHITECTURE</span>
          <span className={styles.breadDivider}>/</span>
          <span className={styles.breadCode}>V1-ENTERPRISE-SPEC</span>
        </div>

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {/* Left Column: Device Presentation Visual */}
          <div className={styles.visualCol}>
            <div className={styles.deviceEnclosure}>
              <div className={styles.enclosureCornerTL} />
              <div className={styles.enclosureCornerTR} />
              <div className={styles.enclosureCornerBL} />
              <div className={styles.enclosureCornerBR} />

              <div className={styles.deviceMetaTop}>
                <span className={styles.metaLive}>LIVE TELEMETRY CALIBRATION</span>
                <span className={styles.metaSerial}>SN // AERIS-2026-X9</span>
              </div>

              {/* Stylized Industrial Device Graphic */}
              <div className={styles.deviceGraphic}>
                <div className={styles.chassis}>
                  <div className={styles.laserAperture}>
                    <div className={styles.apertureRing} />
                    <div className={styles.laserPulse} />
                  </div>

                  <div className={styles.deviceDisplayPanel}>
                    <div className={styles.panelRow}>
                      <span className={styles.panelKey}>PM2.5</span>
                      <span className={styles.panelValGreen}>04 μg/m³</span>
                    </div>
                    <div className={styles.panelRow}>
                      <span className={styles.panelKey}>CO₂ NDIR</span>
                      <span className={styles.panelVal}>642 ppm</span>
                    </div>
                    <div className={styles.panelRow}>
                      <span className={styles.panelKey}>ΔT GRADIENT</span>
                      <span className={styles.panelVal}>+0.02°C</span>
                    </div>
                    <div className={styles.panelRow}>
                      <span className={styles.panelKey}>NEURAL</span>
                      <span className={styles.panelValGreen}>SYNCHRONIZED</span>
                    </div>
                  </div>

                  <div className={styles.grilleVents}>
                    <div className={styles.ventLine} />
                    <div className={styles.ventLine} />
                    <div className={styles.ventLine} />
                    <div className={styles.ventLine} />
                  </div>

                  <div className={styles.deviceBrandLabel}>
                    AERIS // PRECISION SENSOR
                  </div>
                </div>

                {/* Technical Callout Pointers */}
                <div className={`${styles.callout} ${styles.calloutTop}`}>
                  <span className={styles.calloutDot} />
                  <span className={styles.calloutText}>NDIR OPTICAL CO₂ CHAMBER</span>
                </div>
                <div className={`${styles.callout} ${styles.calloutRight}`}>
                  <span className={styles.calloutDot} />
                  <span className={styles.calloutText}>LASER SCATTER PARTICULATE</span>
                </div>
                <div className={`${styles.callout} ${styles.calloutBottom}`}>
                  <span className={styles.calloutDot} />
                  <span className={styles.calloutText}>AERIS TENSOR V4 EDGE CORE</span>
                </div>
              </div>

              <div className={styles.deviceFooterMeta}>
                <span className={styles.chassisMaterial}>MONOLITHIC ANODIZED ALUMINUM 6061</span>
                <span className={styles.ipRating}>IP54 SEALED ENCLOSURE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Configuration */}
          <div className={styles.infoCol}>
            <div className={styles.badgeRow}>
              <span className={styles.batchBadge}>PRODUCTION BATCH 01</span>
              <span className={styles.statusBadge}>PRE-ORDER OPEN</span>
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productTagline}>{product.tagline}</p>

            <div className={styles.pricingBanner}>
              <div className={styles.priceWrap}>
                <span className={styles.priceLabel}>UNIT ALLOCATION PRICE:</span>
                <span className={styles.priceAmount}>{product.priceLabel}</span>
              </div>
              <span className={styles.pricingNote}>
                Early pre-order reservations require £0 upfront deposit. Confirmed pricing locked in prior to dispatch.
              </span>
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Quantity Selector & Action */}
            <div className={styles.actionSection}>
              <div className={styles.qtyWrap}>
                <span className={styles.qtyLabel}>DEPLOYMENT UNITS:</span>
                <div className={styles.qtyControls}>
                  <button
                    type="button"
                    onClick={() => handleQuantity(-1)}
                    className={styles.qtyBtn}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantity(1)}
                    className={styles.qtyBtn}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePreOrder}
                className={styles.preOrderBtn}
                data-cursor="expand"
              >
                <span>{added ? 'ALLOCATION ADDED...' : 'ADD TO PRE-ORDER ALLOCATION'}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Tabbed Specs & Features */}
            <div className={styles.specTabs}>
              <div className={styles.tabHeaders}>
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`${styles.tabBtn} ${activeTab === 'specs' ? styles.tabActive : ''}`}
                >
                  TECHNICAL SPECIFICATIONS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('features')}
                  className={`${styles.tabBtn} ${activeTab === 'features' ? styles.tabActive : ''}`}
                >
                  SYSTEM CAPABILITIES
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'specs' ? (
                  <div className={styles.specsGrid}>
                    {product.specs.map(spec => (
                      <div key={spec.label} className={styles.specItem}>
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specVal}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className={styles.featuresList}>
                    {product.features.map(feat => (
                      <li key={feat} className={styles.featureItem}>
                        <Check size={16} className={styles.featIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
