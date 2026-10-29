import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Disc, Cpu, Search, Bell } from 'lucide-react'
import styles from './HowItWorks.module.css'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    num: '01',
    name: 'SENSE',
    subtitle: 'CONTINUOUS MULTI-VECTOR SAMPLING',
    desc: 'Precision laser optical chambers, NDIR optical absorption sensors, and high-frequency thermal hygrometers gather physical air telemetry at 100Hz with quantum-level noise filtering.',
    icon: Disc,
    code: 'INPUT // AIRBORNE PHYSICS',
  },
  {
    num: '02',
    name: 'ANALYSE',
    subtitle: 'EDGE SILICON BAYESIAN DECOMPOSITION',
    desc: 'The embedded neural accelerator cleans, parses, and normalizes high-frequency time-series streams against established local circadian atmospheric baselines directly on-device.',
    icon: Cpu,
    code: 'PROCESS // AERIS TENSOR V4',
  },
  {
    num: '03',
    name: 'DETECT',
    subtitle: 'AUTONOMOUS DIVERGENCE ISOLATION',
    desc: 'Complex trajectory velocity modeling detects non-linear rate-of-change spikes, identifying developing microbial, thermal, or gaseous hazard profiles before thresholds are breached.',
    icon: Search,
    code: 'INFERENCE // DIVERGENCE SCORE',
  },
  {
    num: '04',
    name: 'ALERT',
    subtitle: 'SUB-SECOND CONTEXTUAL ACTION',
    desc: 'Targeted facilities operators, building management systems (BMS), and emergency teams receive prioritized alerts with plain-English contextual root-cause recommendations.',
    icon: Bell,
    code: 'OUTPUT // AUTOMATED MITIGATION',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const pinWrapRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Desktop horizontal scroll with ScrollTrigger pin
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 200

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth + 300}`,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={pinWrapRef} className={styles.pinWrap}>
        <div className={styles.header}>
          <div className={styles.tagWrap}>
            <span className={styles.pulseDot} />
            <span className={styles.tag}>METHODOLOGY CYCLE // 08</span>
          </div>
          <h2 className={styles.heading}>
            FROM SIGNAL<br />
            <em>TO ACTION.</em>
          </h2>
        </div>

        <div ref={trackRef} className={styles.cardsTrack}>
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.num}
                ref={el => cardsRef.current[idx] = el}
                className={styles.stageCard}
                data-cursor="expand"
              >
                <div className={styles.cardTop}>
                  <span className={styles.stageNum}>{stage.num}</span>
                  <div className={styles.iconCircle}>
                    <Icon size={22} className={styles.icon} />
                  </div>
                </div>

                <div className={styles.cardCenter}>
                  <span className={styles.stageSub}>{stage.subtitle}</span>
                  <h3 className={styles.stageTitle}>{stage.name}</h3>
                  <p className={styles.stageDesc}>{stage.desc}</p>
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.cardCode}>{stage.code}</span>
                  <div className={styles.cardArrow}>→</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
