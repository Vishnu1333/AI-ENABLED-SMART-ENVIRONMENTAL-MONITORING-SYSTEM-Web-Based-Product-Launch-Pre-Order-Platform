import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './IntroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const PARAMETERS = [
  { label: 'TEMPERATURE', detail: 'Thermal shift detection & radiant monitoring', code: '01' },
  { label: 'HUMIDITY', detail: 'Relative humidity & condensation risk modeling', code: '02' },
  { label: 'AIR QUALITY', detail: 'PM1.0, PM2.5, PM10 & VOC particulate sensors', code: '03' },
  { label: 'CO₂ SATURATION', detail: 'Non-dispersive infrared (NDIR) real-time index', code: '04' },
  { label: 'ANOMALY RECOGNITION', detail: 'Autonomous neural baseline variance classification', code: '05' },
  { label: 'INSTANT DISPATCH', detail: 'Sub-second predictive threshold notifications', code: '06' },
]

export default function IntroSection() {
  const sectionRef = useRef(null)
  const headingLinesRef = useRef([])
  const descRef = useRef(null)
  const listRef = useRef([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Split heading reveal
      gsap.fromTo(
        headingLinesRef.current,
        { y: '120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true
          }
        }
      )

      // Description text fade up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 65%',
              once: true
            }
          }
        )
      }

      // Parameter list items stagger
      gsap.fromTo(
        listRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 55%',
            once: true
          }
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="intro" ref={sectionRef} className={styles.section}>
      <div className={styles.oversizedNum} aria-hidden="true">02</div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.tagWrap}>
              <span className={styles.pulseDot} />
              <span className={styles.monoTag}>CONTINUOUS AMBIENT COGNITION // 02</span>
            </div>

            <h2 className={styles.heading}>
              <span className={styles.lineMask}>
                <span className={styles.line} ref={el => headingLinesRef.current[0] = el}>
                  THE ENVIRONMENT
                </span>
              </span>
              <span className={styles.lineMask}>
                <span className={styles.line} ref={el => headingLinesRef.current[1] = el}>
                  IS ALWAYS
                </span>
              </span>
              <span className={styles.lineMask}>
                <span className={`${styles.line} ${styles.accentWord}`} ref={el => headingLinesRef.current[2] = el}>
                  SENDING SIGNALS.
                </span>
              </span>
            </h2>

            <div ref={descRef} className={styles.copy}>
              <p className={styles.lead}>
                Every environment changes continuously. Temperature shifts. Humidity rises. Air quality fluctuates.
                Small deviations rapidly compound into mission-critical hazards when they unfold unnoticed.
              </p>
              <p className={styles.sublead}>
                AERIS AI continuously monitors environmental conditions and transforms dense sensor data into clear,
                contextual comprehension and automated proactive countermeasures.
              </p>
              <div className={styles.technicalNote}>
                <span className={styles.techKey}>ENGINE /</span>
                <span className={styles.techVal}>AERIS TENSOR V4 ON-DEVICE INFERENCE ENGINE</span>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.listHeader}>
              <span className={styles.listLabel}>MONITORED SPECTRA</span>
              <span className={styles.listStatus}>06 ACTIVE VECTORS</span>
            </div>

            <div className={styles.paramList}>
              {PARAMETERS.map((item, index) => (
                <div
                  key={item.label}
                  ref={el => listRef.current[index] = el}
                  className={styles.paramItem}
                >
                  <div className={styles.paramTop}>
                    <div className={styles.paramCode}>{item.code}</div>
                    <div className={styles.paramLabel}>{item.label}</div>
                    <div className={styles.paramDot} />
                  </div>
                  <div className={styles.paramDetail}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
