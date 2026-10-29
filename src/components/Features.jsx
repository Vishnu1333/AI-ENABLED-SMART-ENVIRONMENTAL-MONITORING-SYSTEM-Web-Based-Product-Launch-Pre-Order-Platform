import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, ShieldAlert, Zap, LineChart, Globe, Database, FileSpreadsheet, Lock } from 'lucide-react'
import styles from './Features.module.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES_DATA = [
  {
    num: '001',
    title: 'CONTINUOUS MONITORING',
    subtitle: 'ROUND-THE-CLOCK HIGH FIDELITY SENSING',
    desc: 'Uninterrupted 100Hz ambient telemetry ingestion tracking thermal gradients, relative humidity, particulate matter (PM1.0, PM2.5, PM10), TVOCs, and CO₂ saturation across all deployed nodes simultaneously.',
    icon: Activity,
    techBadge: '100Hz // ZERO DRIFT',
  },
  {
    num: '002',
    title: 'AI ANOMALY DETECTION',
    subtitle: 'ON-CHIP BAYESIAN NEURAL INFERENCE',
    desc: 'Self-learning algorithms build baseline circadian atmospheric models for each discrete physical zone. Detect subtle divergence signatures long before dangerous escalation thresholds are reached.',
    icon: ShieldAlert,
    techBadge: 'TENSOR V4 // ON-DEVICE',
  },
  {
    num: '003',
    title: 'REAL-TIME ALERTS',
    subtitle: 'SUB-SECOND MULTI-CHANNEL DISPATCH',
    desc: 'Critical threshold infringements immediately trigger cryptographically signed webhook payloads, instant mobile push alerts, automated SMS escalation ladders, and facility emergency relays in under two seconds.',
    icon: Zap,
    techBadge: '< 2.0s LATENCY',
  },
  {
    num: '004',
    title: 'ENVIRONMENTAL ANALYTICS',
    subtitle: 'PREDICTIVE TIME-SERIES DECOMPOSITION',
    desc: 'Multi-variable correlation reveals hidden relationships between HVAC cycle periodicity, exterior atmospheric weather shifts, and interior occupant density patterns.',
    icon: LineChart,
    techBadge: 'CROSS-SPECTRAL REGRESSION',
  },
  {
    num: '005',
    title: 'MULTI-LOCATION MONITORING',
    subtitle: 'GLOBAL UNIFIED ASSET FLEET CONTROL',
    desc: 'Monitor hundreds of distributed enterprise facilities, hospital wards, or educational complexes through a high-contrast centralized control center with hierarchical permissions.',
    icon: Globe,
    techBadge: 'ENTERPRISE MESH',
  },
  {
    num: '006',
    title: 'HISTORICAL DATA',
    subtitle: 'IMMUTABLE AUDIT-GRADE TIME-SERIES VAULT',
    desc: 'All recorded samples are stored in an encrypted append-only telemetry ledger, providing forensic evidentiary audit trails for environmental compliance, regulatory standards, and ESG certification.',
    icon: Database,
    techBadge: 'AES-256 ENCRYPTED LEDGER',
  },
  {
    num: '007',
    title: 'SMART REPORTING',
    subtitle: 'AUTOMATED COMPLIANCE & ESG DIGESTS',
    desc: 'Scheduled automated generation of executive-ready PDF/CSV digests detailing air quality index distribution, ASHRAE 62.1 ventilation compliance, and carbon footprint metrics.',
    icon: FileSpreadsheet,
    techBadge: 'ASHRAE / WELL / LEED CERT',
  },
  {
    num: '008',
    title: 'SECURE CUSTOMER ACCESS',
    subtitle: 'ZERO-TRUST RBAC & HARDWARE SECURITY ENCLAVES',
    desc: 'Role-based access management with SAML 2.0 / Okta SSO integration, WebAuthn biometric authentication, and strict tenant isolation ensuring absolute corporate data sovereignty.',
    icon: Lock,
    techBadge: 'SOC 2 / ISO 27001 READY',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const rowsRef = useRef([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Rows stagger
      rowsRef.current.forEach((row, idx) => {
        if (!row) return
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            <span className={styles.kickerTag}>SYSTEM CAPABILITIES // 05</span>
          </div>

          <h2 className={styles.heading}>
            WHAT AERIS<br />
            <em>ACTUALLY DOES.</em>
          </h2>

          <p className={styles.lead}>
            Engineered from silicon to software to replace outdated periodic sampling
            with continuous, intelligent environmental observation.
          </p>
        </div>

        <div className={styles.featuresList}>
          {FEATURES_DATA.map((feat, idx) => {
            const Icon = feat.icon
            const isReverse = idx % 2 === 1
            return (
              <div
                key={feat.num}
                ref={el => rowsRef.current[idx] = el}
                className={`${styles.featureRow} ${isReverse ? styles.rowReverse : ''}`}
                data-cursor="expand"
              >
                <div className={styles.numCol}>
                  <span className={styles.featNum}>{feat.num}</span>
                  <div className={styles.featNumLine} />
                </div>

                <div className={styles.contentCol}>
                  <div className={styles.featMeta}>
                    <div className={styles.iconCircle}>
                      <Icon size={18} className={styles.icon} />
                    </div>
                    <span className={styles.featSubtitle}>{feat.subtitle}</span>
                    <span className={styles.techBadge}>{feat.techBadge}</span>
                  </div>

                  <h3 className={styles.featTitle}>{feat.title}</h3>
                  <p className={styles.featDesc}>{feat.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
