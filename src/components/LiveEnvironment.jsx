import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, ShieldCheck, RefreshCw, Radio } from 'lucide-react'
import styles from './LiveEnvironment.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function LiveEnvironment() {
  const sectionRef = useRef(null)
  const [metrics, setMetrics] = useState({
    temp: 24.8,
    humidity: 61,
    aqi: 92,
    co2: 648,
    confidence: 98.4,
    status: 'NORMAL',
    samples: 184209,
    drift: '0.02%',
  })

  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString())
  const [isUpdating, setIsUpdating] = useState(false)

  // Real-time jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => {
        setMetrics(prev => ({
          ...prev,
          temp: +(24.8 + (Math.random() * 0.4 - 0.2)).toFixed(1),
          humidity: Math.floor(61 + (Math.random() * 2 - 1)),
          co2: Math.floor(648 + (Math.random() * 8 - 4)),
          confidence: +(98.4 + (Math.random() * 0.2 - 0.1)).toFixed(1),
          samples: prev.samples + Math.floor(Math.random() * 12 + 4),
        }))
        setLastUpdated(new Date().toLocaleTimeString())
        setIsUpdating(false)
      }, 400)
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.liveBadge}>
            <span className={styles.pulseDot} />
            <span className={styles.liveTitle}>LIVE ENVIRONMENTAL STATUS</span>
            <span className={styles.protocol}>STREAM PROTOCOL // SSE-V2</span>
          </div>

          <div className={styles.sysMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>ENGINE FREQUENCY:</span>
              <span className={styles.metaVal}>100 HZ POLLING</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>TIMESTAMP:</span>
              <span className={styles.metaVal}>{lastUpdated}</span>
            </div>
            <div className={`${styles.statusPill} ${isUpdating ? styles.pillUpdating : ''}`}>
              <Radio size={12} className={styles.radioIcon} />
              <span>{isUpdating ? 'RE-CALIBRATING' : 'SYNCED'}</span>
            </div>
          </div>
        </div>

        {/* Big Editorial Metrics Grid */}
        <div className={styles.metricsGrid}>
          {/* Temperature */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>SEN-01 // THERMAL</span>
              <span className={styles.sensorStatus}>NOMINAL</span>
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumber}>{metrics.temp.toFixed(1)}</span>
              <span className={styles.unit}>°C</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>MICRO-ZONE ACCURACY:</span>
              <span className={styles.footerVal}>±0.05°C CALIBRATED</span>
            </div>
          </div>

          {/* Humidity */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>SEN-02 // HYGROMETRY</span>
              <span className={styles.sensorStatus}>OPTIMAL</span>
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumber}>{metrics.humidity}</span>
              <span className={styles.unit}>% RH</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>CONDENSATION MARGIN:</span>
              <span className={styles.footerVal}>4.2°C DEWPOINT DELTA</span>
            </div>
          </div>

          {/* Air Quality AQI */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>SEN-03 // OPTICAL PM2.5</span>
              <span className={styles.sensorStatusGreen}>PRISTINE</span>
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumber}>{metrics.aqi}</span>
              <span className={styles.unit}>AQI</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>AIR RATING:</span>
              <span className={styles.greenText}>CATEGORY I (EXCELLENT)</span>
            </div>
          </div>

          {/* CO2 ppm */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>SEN-04 // NDIR CHAMBER</span>
              <span className={styles.sensorStatus}>RESTING</span>
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumber}>{metrics.co2}</span>
              <span className={styles.unit}>PPM</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>BASELINE DRIFT:</span>
              <span className={styles.footerVal}>&lt; 0.5 PPM / MONTH</span>
            </div>
          </div>

          {/* AI Status */}
          <div className={`${styles.metricCard} ${styles.cardAI}`}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>NEURAL NET V4.2</span>
              <ShieldCheck size={16} className={styles.aiIcon} />
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumberText}>{metrics.status}</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>ANOMALY THREAT:</span>
              <span className={styles.greenText}>0 HAZARDS DETECTED</span>
            </div>
          </div>

          {/* AI Confidence */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.sensorCode}>BAYESIAN CONFIDENCE</span>
              <Activity size={16} className={styles.activityIcon} />
            </div>
            <div className={styles.valueWrap}>
              <span className={styles.bigNumber}>{metrics.confidence.toFixed(1)}</span>
              <span className={styles.unit}>%</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>TELEMETRY FRAMES:</span>
              <span className={styles.footerVal}>{metrics.samples.toLocaleString()} INGESTED</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className={styles.bottomBar}>
          <div className={styles.streamInfo}>
            <span className={styles.streamLabel}>AERIS EMBEDDED SYSTEM:</span>
            <span className={styles.streamCode}>SYS_ID // 0x7F-LONDON-UK-MAIN-ATRIUM</span>
          </div>
          <div className={styles.securitySeal}>
            <span className={styles.sealDot} />
            <span>ENCRYPTED HARDWARE ENCLAVE // TLS 1.3 PINNED</span>
          </div>
        </div>
      </div>
    </section>
  )
}
