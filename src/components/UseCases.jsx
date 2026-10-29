import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, GraduationCap, Hospital, ShoppingBag, Landmark, ArrowUpRight } from 'lucide-react'
import styles from './UseCases.module.css'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    id: '01',
    name: 'HOSPITALS & CLINICS',
    category: 'CRITICAL HEALTHCARE',
    desc: 'Maintain stringent sterility thresholds, differential pressure gradients, and ultra-precise thermal equilibrium across surgical operating theatres, ICU pods, and pharmaceutical cold chains.',
    metrics: ['±0.05°C PRECISION', 'DIFFERENTIAL Pa', 'STERILITY INDEX', 'AIR EXCHANGES/HR'],
    icon: Hospital,
    featured: true,
  },
  {
    id: '02',
    name: 'WORKPLACES',
    category: 'CORPORATE ENTERPRISE',
    desc: 'Mitigate cognitive fatigue and absenteeism by actively suppressing CO₂ spikes and TVOC accumulation across open-plan trading floors and executive boardrooms.',
    metrics: ['CO₂ < 700 PPM', 'TVOC INDEX', 'THERMAL COMFORT'],
    icon: Building2,
    featured: false,
  },
  {
    id: '03',
    name: 'SCHOOLS & UNIVERSITIES',
    category: 'EDUCATIONAL SPACES',
    desc: 'Optimize student focus and reduce viral aerosol transmission risk through real-time ventilation rate modeling in classrooms, lecture halls, and dormitories.',
    metrics: ['VENTILATION RATE', 'PM2.5 AEROSOL', 'HUMIDITY 40-60%'],
    icon: GraduationCap,
    featured: false,
  },
  {
    id: '04',
    name: 'SHOPPING CENTRES',
    category: 'HIGH-DENSITY RETAIL',
    desc: 'Dynamic HVAC modulation responding instantaneously to massive weekend footfall rushes, preventing stifling hot-spots across multi-level commercial atriums.',
    metrics: ['CROWD PROXY ΔT', 'ZONE BALANCING', 'ENERGY CONSERVATION'],
    icon: ShoppingBag,
    featured: false,
  },
  {
    id: '05',
    name: 'COMMERCIAL REAL ESTATE',
    category: 'ESG & ASSET MANAGEMENT',
    desc: 'Attain premium tenant lease rates while guaranteeing verifiable compliance with LEED, BREEAM, and WELL environmental building standards.',
    metrics: ['WELL / LEED AUDIT', 'CONTINUOUS LOG', 'TENANT DASHBOARDS'],
    icon: Landmark,
    featured: false,
  },
]

export default function UseCases() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, idx) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: idx * 0.1,
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
    <section id="usecases" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.tagWrap}>
            <span className={styles.pulseDot} />
            <span className={styles.tag}>DEPLOYMENT ENVIRONMENTS // 07</span>
          </div>

          <h2 className={styles.heading}>
            PRECISION ADAPTED TO<br />
            <em>ANY ENCLOSED SPACE.</em>
          </h2>

          <p className={styles.subtext}>
            Engineered to safeguard occupant cognitive function, critical healthcare sterility,
            and regulatory compliance across varied physical infrastructures.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className={styles.asymGrid}>
          {CASES.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                ref={el => cardsRef.current[idx] = el}
                className={`${styles.caseCard} ${item.featured ? styles.caseFeatured : ''}`}
                data-cursor="expand"
              >
                <div className={styles.cardHeader}>
                  <div className={styles.catWrap}>
                    <span className={styles.caseIndex}>{item.id}</span>
                    <span className={styles.caseCategory}>{item.category}</span>
                  </div>
                  <div className={styles.iconBox}>
                    <Icon size={20} className={styles.cardIcon} />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.caseTitle}>
                    {item.name}
                    <ArrowUpRight size={18} className={styles.arrowIcon} />
                  </h3>
                  <p className={styles.caseDesc}>{item.desc}</p>
                </div>

                <div className={styles.metricsBox}>
                  <div className={styles.metricsHeader}>
                    <span className={styles.metricsLabel}>CRITICAL METRIC VECTORS:</span>
                  </div>
                  <div className={styles.metricsPills}>
                    {item.metrics.map(metric => (
                      <span key={metric} className={styles.metricPill}>
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardAccentLine} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
