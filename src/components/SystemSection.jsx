import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Radio, Network, Activity, BellRing, CheckCircle2 } from 'lucide-react'
import styles from './SystemSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    id: '01',
    title: 'SENSORS',
    subtitle: 'MULTI-MODAL HARVESTING',
    desc: 'Solid-state NDIR CO₂ optical chambers, laser particulate arrays, and thermopile hygrometers capture atmospheric parameters at 100Hz.',
    icon: Radio,
    metric: '100 Hz',
  },
  {
    id: '02',
    title: 'DATA COLLECTION',
    subtitle: 'SECURE EDGE BUFFERING',
    desc: 'Dual-band Wi-Fi 6 & Bluetooth Mesh with on-device hardware TLS 1.3 cryptographic hashing ensure zero packet loss during network drops.',
    icon: Network,
    metric: '<1 ms',
  },
  {
    id: '03',
    title: 'AI ANALYSIS',
    subtitle: 'NEURAL TIME-SERIES MODELING',
    desc: 'Edge neural networks run spatial-temporal regression and micro-climatic baseline calibration directly on local silicon.',
    icon: Cpu,
    metric: '1.4 TFLOPS',
  },
  {
    id: '04',
    title: 'ANOMALY DETECTION',
    subtitle: 'AUTONOMOUS VARIANCE CLASSIFIER',
    desc: 'Real-time classification isolates genuine toxic/thermal risk patterns while automatically suppressing transient noise and human false alarms.',
    icon: Activity,
    metric: '99.4% ACC',
  },
  {
    id: '05',
    title: 'ALERT GENERATION',
    subtitle: 'CONTEXTUAL SIGNAL DISPATCH',
    desc: 'Instant priority telemetry routing dispatches machine-readable webhooks, mobile push, and automated SMS escalation trees.',
    icon: BellRing,
    metric: '<2.0 sec',
  },
  {
    id: '06',
    title: 'AUTOMATED ACTION',
    subtitle: 'BACNET & HVAC INTERLOCK',
    desc: 'Optional building management protocol triggers ventilation fans, fresh air intake dampers, or emergency lockdown relays instantly.',
    icon: CheckCircle2,
    metric: 'ZERO TOUCH',
  },
]

export default function SystemSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const nodesRef = useRef([])
  const lineRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Header entrance
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

      // Nodes stagger
      nodesRef.current.forEach((node, i) => {
        if (!node) return
        gsap.fromTo(
          node,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })

      // Central glowing line progress
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="system" ref={sectionRef} className={styles.section}>
      <div className={styles.techGrid} aria-hidden="true" />
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.tagWrap}>
            <span className={styles.pulseDot} />
            <span className={styles.tag}>ARCHITECTURE PIPELINE // 04</span>
          </div>

          <h2 className={styles.heading}>
            ONE SYSTEM.<br />
            <em>EVERY SIGNAL.</em>
          </h2>

          <p className={styles.subtext}>
            Continuous environmental intelligence demands an unbroken chain from quantum sensor silicon
            to automated physical actuation. Here is how AERIS AI processes every breath of air.
          </p>
        </div>

        <div className={styles.pipelineWrap}>
          <div ref={lineRef} className={styles.centerLine} aria-hidden="true">
            <div className={styles.movingPhoton} />
          </div>

          <div className={styles.nodesList}>
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon
              const isEven = idx % 2 === 1
              return (
                <div
                  key={stage.id}
                  ref={el => nodesRef.current[idx] = el}
                  className={`${styles.nodeRow} ${isEven ? styles.nodeRowReverse : ''}`}
                >
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconCircle}>
                        <Icon size={20} className={styles.icon} />
                      </div>
                      <div className={styles.cardHeaderMeta}>
                        <span className={styles.stageNum}>PHASE {stage.id}</span>
                        <span className={styles.stageSubtitle}>{stage.subtitle}</span>
                      </div>
                      <div className={styles.metricBadge}>{stage.metric}</div>
                    </div>

                    <h3 className={styles.stageTitle}>{stage.title}</h3>
                    <p className={styles.stageDesc}>{stage.desc}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.footerCode}>VEC::{stage.id.padStart(3, '0')} // SYNCHRONOUS</span>
                      <span className={styles.statusLive}>ACTIVE</span>
                    </div>
                  </div>

                  <div className={styles.connectorCenter}>
                    <div className={styles.connectorNode}>
                      <div className={styles.nodeInnerDot} />
                    </div>
                  </div>

                  <div className={styles.emptySpacer} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats summary banner */}
        <div className={styles.statsBanner}>
          <div className={styles.statBox}>
            <span className={styles.statVal}>24/7/365</span>
            <span className={styles.statLabel}>Continuous Telemetry Ingestion</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <span className={styles.statVal}>&lt; 2.0s</span>
            <span className={styles.statLabel}>End-To-End Ingestion To Alarm</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <span className={styles.statVal}>99.98%</span>
            <span className={styles.statLabel}>Operational Platform Uptime SLA</span>
          </div>
        </div>
      </div>
    </section>
  )
}
