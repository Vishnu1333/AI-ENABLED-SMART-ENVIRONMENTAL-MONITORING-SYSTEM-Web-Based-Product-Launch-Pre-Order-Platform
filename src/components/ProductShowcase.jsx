import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import styles from './ProductShowcase.module.css'

gsap.registerPlugin(ScrollTrigger)

const labels = [
  { id: 'temp', text: 'TEMPERATURE', value: '±0.1°C', position: 'top-left' },
  { id: 'hum', text: 'HUMIDITY', value: '±1% RH', position: 'top-right' },
  { id: 'aqi', text: 'AIR QUALITY', value: 'PM2.5 + TVOC', position: 'mid-left' },
  { id: 'ai', text: 'AI SENSOR', value: 'On-device ML', position: 'mid-right' },
  { id: 'data', text: 'REAL-TIME DATA', value: 'Wi-Fi 6', position: 'bottom-left' },
  { id: 'co2', text: 'CO₂ MONITOR', value: '400–5000 ppm', position: 'bottom-right' },
]

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const deviceRef = useRef(null)
  const labelsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const device = deviceRef.current
    if (!section || !device) return

    const ctx = gsap.context(() => {
      // Device entrance
      gsap.fromTo(device,
        { opacity: 0, scale: 0.8, rotateY: -30 },
        {
          opacity: 1, scale: 1, rotateY: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        }
      )

      // Labels stagger in
      gsap.fromTo(labelsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            once: true
          }
        }
      )

      // Slow device rotation on scroll
      gsap.to(device, {
        rotateY: 15,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.techGrid} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>THE DEVICE</span>
          <h2 className={styles.heading}>
            PRECISION<br />
            <em>ENGINEERING.</em>
          </h2>
        </div>

        <div className={styles.showcase}>
          {/* Left labels */}
          <div className={styles.leftLabels}>
            {labels.filter(l => l.position.includes('left')).map((label, i) => (
              <div
                key={label.id}
                className={styles.floatLabel}
                ref={el => labelsRef.current[i] = el}
              >
                <div className={styles.labelLine} />
                <div className={styles.labelContent}>
                  <span className={styles.labelTitle}>{label.text}</span>
                  <span className={styles.labelValue}>{label.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Device */}
          <div className={styles.deviceWrap} ref={deviceRef} aria-label="AERIS AI Environmental Monitor device">
            <div className={styles.device}>
              {/* Device body */}
              <div className={styles.deviceBody}>
                {/* Status ring */}
                <div className={styles.statusRing}>
                  <div className={styles.statusRingInner} />
                </div>
                {/* Screen area */}
                <div className={styles.deviceScreen}>
                  <div className={styles.screenLine}>
                    <span className={styles.screenLabel}>TEMP</span>
                    <span className={styles.screenValue}>24.8°C</span>
                  </div>
                  <div className={styles.screenLine}>
                    <span className={styles.screenLabel}>HUM</span>
                    <span className={styles.screenValue}>61%</span>
                  </div>
                  <div className={styles.screenLine}>
                    <span className={styles.screenLabel}>AQI</span>
                    <span className={styles.screenValueGreen}>GOOD</span>
                  </div>
                  <div className={styles.screenLine}>
                    <span className={styles.screenLabel}>AI</span>
                    <span className={styles.screenValueGreen}>NORMAL</span>
                  </div>
                </div>
                {/* Corner marks */}
                <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
                {/* Sensor dots */}
                <div className={styles.sensorDot} style={{ top: '20%', left: '15%' }} />
                <div className={styles.sensorDot} style={{ top: '30%', right: '15%' }} />
                <div className={styles.sensorDot} style={{ bottom: '25%', left: '20%' }} />
              </div>
            </div>
            {/* Glow */}
            <div className={styles.deviceGlow} aria-hidden="true" />
          </div>

          {/* Right labels */}
          <div className={styles.rightLabels}>
            {labels.filter(l => l.position.includes('right')).map((label, i) => (
              <div
                key={label.id}
                className={`${styles.floatLabel} ${styles.floatLabelRight}`}
                ref={el => labelsRef.current[i + 3] = el}
              >
                <div className={styles.labelContent}>
                  <span className={styles.labelTitle}>{label.text}</span>
                  <span className={styles.labelValue}>{label.value}</span>
                </div>
                <div className={styles.labelLine} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom product info */}
        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <span className={styles.productLabel}>AERIS AI ENVIRONMENT MONITOR</span>
            <span className={styles.productStatus}>PRE-ORDER OPEN</span>
          </div>
          <div className={styles.productCta}>
            <Link to="/product" className={styles.ctaBtn} data-cursor="expand">
              VIEW FULL SPECIFICATIONS →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
