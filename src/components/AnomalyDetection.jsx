import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AlertCircle, BrainCircuit, Activity, ShieldCheck, Zap } from 'lucide-react'
import styles from './AnomalyDetection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function AnomalyDetection() {
  const sectionRef = useRef(null)
  const graphPathRef = useRef(null)
  const anomalyBadgeRef = useRef(null)
  const dangerZoneRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Path drawing animation
      if (graphPathRef.current) {
        const length = graphPathRef.current.getTotalLength()
        gsap.set(graphPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(graphPathRef.current, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 65%',
            once: true,
            onEnter: () => {
              // Trigger danger zone and badge after curve draws
              setTimeout(() => {
                if (dangerZoneRef.current) {
                  gsap.to(dangerZoneRef.current, { opacity: 1, duration: 0.6 })
                }
                if (anomalyBadgeRef.current) {
                  gsap.fromTo(
                    anomalyBadgeRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
                  )
                }
              }, 1400)
            },
          },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tagWrap}>
            <BrainCircuit size={16} className={styles.aiIcon} />
            <span className={styles.tag}>NEURAL PATTERN RECOGNITION // 06</span>
          </div>

          <h2 className={styles.heading}>
            NORMAL ISN’T<br />
            <em>ALWAYS SAFE.</em>
          </h2>

          <p className={styles.subtext}>
            Standard monitoring systems alert only when a hard limit is breached. AERIS AI analyses multi-spectral
            rate-of-change signatures, discovering subtle anomalous drift minutes before temperatures spike or air toxicity accumulates.
          </p>
        </div>

        {/* Visual Graph & Analytics Display */}
        <div className={styles.displayBoard}>
          <div className={styles.boardTop}>
            <div className={styles.boardMeta}>
              <span className={styles.targetLabel}>TARGET: ZONE B // CLEAN ROOM ATRIUM</span>
              <span className={styles.channelLabel}>PARAMETER: THERMAL VARIANCE (ΔT)</span>
            </div>
            <div className={styles.liveIndicator}>
              <span className={styles.pulseDot} />
              <span>SIMULATED INCIDENT CAPTURE</span>
            </div>
          </div>

          <div className={styles.graphContainer}>
            {/* SVG Graph */}
            <svg
              className={styles.svgGraph}
              viewBox="0 0 900 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              <line x1="0" y1="60" x2="900" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="130" x2="900" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="200" x2="900" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="270" x2="900" y2="270" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Danger Zone Shading (right side) */}
              <rect
                ref={dangerZoneRef}
                x="540"
                y="0"
                width="360"
                height="360"
                fill="url(#dangerGradient)"
                opacity="0"
              />

              {/* Threshold Limit Line */}
              <line x1="0" y1="100" x2="900" y2="100" stroke="rgba(200, 60, 60, 0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <text x="30" y="92" fill="rgba(200, 60, 60, 0.7)" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="0.1em">
                CRITICAL THRESHOLD (28.0°C)
              </text>

              {/* Normal Baseline Ribbon */}
              <rect x="0" y="240" width="540" height="40" fill="rgba(109, 184, 138, 0.04)" />
              <text x="30" y="265" fill="rgba(109, 184, 138, 0.5)" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="0.1em">
                ESTABLISHED CIRCADIAN BASELINE (24.0°C - 24.5°C)
              </text>

              {/* Trajectory Polyline */}
              <path
                ref={graphPathRef}
                d="M 0 255 Q 120 252 240 254 T 480 250 C 530 248 570 230 630 140 C 690 60 780 45 900 40"
                stroke="url(#trajectoryGradient)"
                strokeWidth="3.5"
                fill="none"
              />

              {/* Definitions */}
              <defs>
                <linearGradient id="trajectoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6db88a" />
                  <stop offset="55%" stopColor="#6db88a" />
                  <stop offset="70%" stopColor="#dca842" />
                  <stop offset="90%" stopColor="#e74c3c" />
                </linearGradient>
                <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(231, 76, 60, 0.02)" />
                  <stop offset="100%" stopColor="rgba(231, 76, 60, 0.12)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Overlaid Data Annotation Nodes */}
            <div className={styles.dataLabels}>
              <div className={`${styles.dataPoint} ${styles.pointNormal}`} style={{ left: '15%', top: '70%' }}>
                <span className={styles.pointDot} />
                <span className={styles.pointText}>24.0°C — NOMINAL</span>
              </div>
              <div className={`${styles.dataPoint} ${styles.pointNormal}`} style={{ left: '38%', top: '69%' }}>
                <span className={styles.pointDot} />
                <span className={styles.pointText}>24.3°C — NOMINAL</span>
              </div>
              <div className={`${styles.dataPoint} ${styles.pointElevated}`} style={{ left: '65%', top: '42%' }}>
                <span className={`${styles.pointDot} ${styles.dotWarning}`} />
                <span className={styles.pointText}>27.8°C — RATE DIVERGENCE</span>
              </div>
              <div className={`${styles.dataPoint} ${styles.pointDanger}`} style={{ left: '84%', top: '15%' }}>
                <span className={`${styles.pointDot} ${styles.dotDanger}`} />
                <span className={styles.pointText}>28.9°C — SPIKE CONFIRMED</span>
              </div>
            </div>

            {/* Anomaly Detected Stamp Badge */}
            <div ref={anomalyBadgeRef} className={styles.anomalyBadge}>
              <div className={styles.badgePulse} />
              <AlertCircle size={22} className={styles.badgeIcon} />
              <div className={styles.badgeText}>
                <span className={styles.badgeTitle}>ANOMALY DETECTED</span>
                <span className={styles.badgeSub}>PREDICTIVE LEAD TIME: +8.4 MIN</span>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostic Stats */}
          <div className={styles.diagnosticsGrid}>
            <div className={styles.diagItem}>
              <span className={styles.diagKey}>DETECTION LATENCY</span>
              <span className={styles.diagVal}>&lt; 1.8 SECONDS</span>
              <span className={styles.diagDesc}>From sensor reading to neural divergence trigger</span>
            </div>

            <div className={styles.diagItem}>
              <span className={styles.diagKey}>NEURAL CONFIDENCE</span>
              <span className={styles.diagVal}>98.4%</span>
              <span className={styles.diagDesc}>Bayesian posterior anomaly probability score</span>
            </div>

            <div className={styles.diagItem}>
              <span className={styles.diagKey}>FALSE ALARM SUPPRESSION</span>
              <span className={styles.diagVal}>99.91%</span>
              <span className={styles.diagDesc}>Circadian contextual conditioning filtering</span>
            </div>

            <div className={styles.diagItem}>
              <span className={styles.diagKey}>ESCALATION ACTION</span>
              <span className={`${styles.diagVal} ${styles.valGreen}`}>AUTO-DISPATCHED</span>
              <span className={styles.diagDesc}>HVAC Purge Relay + Facilities SMS executed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
