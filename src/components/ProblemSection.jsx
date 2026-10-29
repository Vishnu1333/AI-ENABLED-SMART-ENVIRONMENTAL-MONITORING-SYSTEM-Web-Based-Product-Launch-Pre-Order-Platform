import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AlertTriangle, EyeOff, FileQuestion, Clock, HelpCircle } from 'lucide-react'
import styles from './ProblemSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const PROBLEMS = [
  {
    num: '01',
    title: 'ENVIRONMENTAL CHANGES GO UNNOTICED',
    desc: 'Micro-shifts in temperature, subtle humidity surges, and invisible airborne VOC blooms evolve beneath human sensory perception until asset degradation or acute health risks emerge.',
    icon: EyeOff,
    tag: 'LATENCY DEFICIT',
    rotation: '-1.2deg',
    colSpan: 2,
  },
  {
    num: '02',
    title: 'MANUAL MONITORING IS INCONSISTENT',
    desc: 'Periodic handheld checks capture isolated snapshots, completely missing transient thermal spikes, nocturnal HVAC failures, and intermittent toxic peaks.',
    icon: AlertTriangle,
    tag: 'SAMPLING ERROR',
    rotation: '1.5deg',
    colSpan: 1,
  },
  {
    num: '03',
    title: 'RAW SENSOR DATA IS HARD TO UNDERSTAND',
    desc: 'Isolated ppm and raw Celsius values lack environmental context. Without continuous computational correlation, telemetry produces confusion rather than comprehension.',
    icon: FileQuestion,
    tag: 'COGNITIVE LOAD',
    rotation: '-0.8deg',
    colSpan: 1,
  },
  {
    num: '04',
    title: 'ALERTS ARRIVE TOO LATE',
    desc: 'Conventional threshold alarms trigger only after critical danger limits are breached, leaving zero lead time for proactive mitigation or automated remediation.',
    icon: Clock,
    tag: 'REACTIVE GAP',
    rotation: '1.8deg',
    colSpan: 1,
  },
  {
    num: '05',
    title: 'DECISIONS ARE MADE WITHOUT CONTEXT',
    desc: 'Facility managers and safety teams are forced to diagnose complex indoor atmospheric shifts without multi-spectral baselines, neural forecasts, or historical root-cause analysis.',
    icon: HelpCircle,
    tag: 'BLIND OPERATION',
    rotation: '-1.4deg',
    colSpan: 1,
  },
]

export default function ProblemSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.tag}>STRUCTURAL DEFICIENCY</span>
            <span className={styles.line} />
            <span className={styles.monoIndex}>03 // DIAGNOSIS</span>
          </div>

          <h2 className={styles.statementInitial}>
            MOST SPACES DON’T HAVE A<br />
            MONITORING PROBLEM.
          </h2>
          <h3 className={styles.statementReveal}>
            THEY HAVE A <em>VISIBILITY PROBLEM.</em>
          </h3>
        </div>

        <div className={styles.cardsGrid}>
          {PROBLEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.num}
                ref={el => cardsRef.current[index] = el}
                className={`${styles.card} ${item.colSpan === 2 ? styles.cardWide : ''}`}
                style={{ '--card-rot': item.rotation }}
                data-cursor="expand"
              >
                <div className={styles.bgNum} aria-hidden="true">{item.num}</div>
                <div className={styles.cardHeader}>
                  <div className={styles.tagWrap}>
                    <Icon className={styles.cardIcon} size={18} />
                    <span className={styles.cardTag}>{item.tag}</span>
                  </div>
                  <span className={styles.cardIndex}>{item.num}</span>
                </div>

                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.techIndicator}>SIGNAL // IMPAIRMENT IDENTIFIED</span>
                  <div className={styles.dotPulse} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
