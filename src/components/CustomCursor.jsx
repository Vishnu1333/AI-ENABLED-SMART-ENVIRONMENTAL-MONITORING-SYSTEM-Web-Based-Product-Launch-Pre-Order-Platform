import React, { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return

    let currentTarget = null

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnter = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) return
      currentTarget = target
      const type = target.getAttribute('data-cursor')
      const text = target.getAttribute('data-cursor-text') || type

      ring.classList.remove(styles.ringExpanded, styles.ringText, styles.ringGreen)

      if (type === 'expand') {
        ring.classList.add(styles.ringExpanded)
      } else if (type === 'text') {
        ring.classList.add(styles.ringText)
        if (label) label.textContent = text.toUpperCase()
      } else if (type === 'green') {
        ring.classList.add(styles.ringGreen)
      }
    }

    const onMouseLeave = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        ring.classList.remove(styles.ringExpanded, styles.ringText, styles.ringGreen)
        currentTarget = null
      }
    }

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      // Dot follows cursor exactly
      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }

      // Ring follows with lag
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12)
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12)

      const ringSize = ring.classList.contains(styles.ringExpanded) ? 40 : 20
      if (ring) {
        ring.style.transform = `translate(${ringPosRef.current.x - ringSize}px, ${ringPosRef.current.y - ringSize}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseEnter)
    document.addEventListener('mouseout', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseEnter)
      document.removeEventListener('mouseout', onMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.ringLabel} />
      </div>
    </div>
  )
}
