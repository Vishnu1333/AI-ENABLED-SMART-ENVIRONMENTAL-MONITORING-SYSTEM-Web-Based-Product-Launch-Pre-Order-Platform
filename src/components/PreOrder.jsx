import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ShieldCheck, Truck, Bell } from 'lucide-react'
import styles from './PreOrder.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function PreOrder() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const bgTextRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Background parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: -120,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="preorder" ref={sectionRef} className={styles.section}>
      <div ref={bgTextRef} className={styles.bgText} aria-hidden="true">
        PRE-ORDER
      </div>

      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.tagWrap}>
            <span className={styles.pulseDot} />
            <span className={styles.tag}>LIMITED PRODUCTION BATCH // 2026 DEPLOYMENT</span>
          </div>

          <h2 className={styles.heading}>
            READY TO MONITOR<br />
            <em>WHAT MATTERS?</em>
          </h2>

          <p className={styles.desc}>
            Join leading enterprise facilities, hospital networks, and progressive educational institutions.
            Reserve your AERIS AI System now to secure priority manufacturing allocation and direct integration support.
          </p>

          <div className={styles.ctaGroup}>
            <Link to="/product" className={styles.primaryBtn} data-cursor="expand">
              <span>PRE-ORDER AERIS AI</span>
              <ArrowRight size={18} className={styles.btnArrow} />
            </Link>

            <Link to="/contact" className={styles.secondaryBtn} data-cursor="expand">
              <span>REQUEST TECHNICAL DOSSIER</span>
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <ShieldCheck size={18} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>ZERO-RISK PRE-ORDER</span>
                <span className={styles.trustDesc}>Price confirmed prior to fulfillment</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <Truck size={18} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>PRIORITY QUEUE</span>
                <span className={styles.trustDesc}>Batch 01 guaranteed delivery window</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <Bell size={18} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>ONBOARDING CONCIERGE</span>
                <span className={styles.trustDesc}>Dedicated environmental engineer assigned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
