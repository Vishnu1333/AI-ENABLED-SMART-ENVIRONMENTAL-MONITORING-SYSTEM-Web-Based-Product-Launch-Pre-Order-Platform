import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Editorial Wordmark */}
        <div className={styles.wordmarkSection}>
          <div className={styles.brandRow}>
            <span className={styles.hugeBrand}>AERIS AI</span>
            <button onClick={scrollToTop} className={styles.backToTop} data-cursor="expand">
              BACK TO TOP ↑
            </button>
          </div>
          <p className={styles.tagline}>
            ENVIRONMENT, <em>INTELLIGENTLY MONITORED.</em>
          </p>
        </div>

        {/* Links Navigation Grid */}
        <div className={styles.linksGrid}>
          {/* Column 1: Core Navigation */}
          <div className={styles.col}>
            <span className={styles.colHeader}>01 // PLATFORM</span>
            <ul className={styles.linkList}>
              <li><a href="#intro" className={styles.link}>01 INTRO</a></li>
              <li><a href="#system" className={styles.link}>02 SYSTEM ARCHITECTURE</a></li>
              <li><a href="#features" className={styles.link}>03 SPECIFICATIONS</a></li>
              <li><a href="#usecases" className={styles.link}>04 DEPLOYMENT CASES</a></li>
              <li><Link to="/product" className={styles.link}>05 SENSING HARDWARE</Link></li>
            </ul>
          </div>

          {/* Column 2: Commercial & Support */}
          <div className={styles.col}>
            <span className={styles.colHeader}>02 // COMMERCIAL</span>
            <ul className={styles.linkList}>
              <li><Link to="/product" className={styles.link}>PRE-ORDER HARDWARE</Link></li>
              <li><Link to="/checkout" className={styles.link}>CHECKOUT CONSOLE</Link></li>
              <li><Link to="/track-order" className={styles.link}>TRACK TELEMETRY ORDER</Link></li>
              <li><a href="#preorder" className={styles.link}>RESERVATION BATCH 01</a></li>
            </ul>
          </div>

          {/* Column 3: Administration & Governance */}
          <div className={styles.col}>
            <span className={styles.colHeader}>03 // ADMIN & SECURITY</span>
            <ul className={styles.linkList}>
              <li><Link to="/admin" className={styles.link}>ADMIN GATEWAY</Link></li>
              <li><Link to="/admin/project" className={styles.link}>PROJECT CONTROL (ITM3207)</Link></li>
              <li><a href="#system" className={styles.link}>SECURITY ENCLAVE (TLS 1.3)</a></li>
              <li><a href="#features" className={styles.link}>ASHRAE 62.1 COMPLIANCE</a></li>
              <li><a href="#system" className={styles.link}>BACNET / IP INTEGRATION</a></li>
              <li><a href="#features" className={styles.link}>REST / MQTT TELEMETRY API</a></li>
            </ul>
          </div>

          {/* Column 4: System Telemetry */}
          <div className={styles.col}>
            <span className={styles.colHeader}>04 // METRICS FEED</span>
            <div className={styles.telemetryBox}>
              <div className={styles.telemItem}>
                <span className={styles.telemKey}>GRID STATUS:</span>
                <span className={styles.telemValLive}>ALL NODES OPERATIONAL</span>
              </div>
              <div className={styles.telemItem}>
                <span className={styles.telemKey}>CORE LATENCY:</span>
                <span className={styles.telemVal}>1.8ms (SYNCHRONIZED)</span>
              </div>
              <div className={styles.telemItem}>
                <span className={styles.telemKey}>LOCATION:</span>
                <span className={styles.telemVal}>51.5074°N, 0.1278°W</span>
              </div>
              <div className={styles.telemItem}>
                <span className={styles.telemKey}>ENCRYPTION:</span>
                <span className={styles.telemVal}>ED25519 HARDWARE KEY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © 2026 AERIS AI INC. — ENVIRONMENT, INTELLIGENTLY MONITORED. ALL RIGHTS RESERVED.
          </div>

          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>PRIVACY POLICY</a>
            <span className={styles.legalDivider}>/</span>
            <a href="#terms" className={styles.legalLink}>TERMS OF SERVICE</a>
            <span className={styles.legalDivider}>/</span>
            <span className={styles.versionTag}>BUILD 2026.04-RC2</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
