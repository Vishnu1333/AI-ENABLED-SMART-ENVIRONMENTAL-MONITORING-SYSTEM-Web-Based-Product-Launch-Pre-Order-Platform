import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { num: '01', label: 'INTRO', href: '#intro' },
  { num: '02', label: 'SYSTEM', href: '#system' },
  { num: '03', label: 'FEATURES', href: '#features' },
  { num: '04', label: 'USE CASES', href: '#usecases' },
  { num: '05', label: 'PRE-ORDER', href: '#preorder' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuTlRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ─── Scroll: navbar glass effect ─── */
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top+=80 top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  /* ─── Build mobile menu GSAP timeline ─── */
  useEffect(() => {
    if (!menuRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Show overlay
    tl.to(menuRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.35,
      ease: 'power2.out',
    });

    // Stagger in links
    tl.fromTo(
      menuLinksRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.15'
    );

    menuTlRef.current = tl;
  }, []);

  /* ─── Hamburger ↔ X morph ─── */
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;

    if (menuOpen) {
      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 5,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      gsap.to(line2Ref.current, {
        rotate: -45,
        y: -5,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      menuTlRef.current?.play();
    } else {
      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      gsap.to(line2Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      menuTlRef.current?.reverse();
    }
  }, [menuOpen]);

  /* ─── Smooth scroll for anchor links ─── */
  const handleAnchorClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary navigation"
      >
        <div className={styles.inner}>
          {/* ── Wordmark ── */}
          <Link
            to="/"
            className={styles.wordmark}
            aria-label="AERIS AI — Home"
            data-cursor="expand"
          >
            <span className={styles.wordmarkAeris}>AERIS</span>
            <span className={styles.wordmarkAi}>&nbsp;AI</span>
          </Link>

          {/* ── Desktop centre nav ── */}
          <ul className={styles.centreLinks} role="list">
            {NAV_LINKS.map(({ num, label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.navLink}
                  onClick={(e) => handleAnchorClick(e, href)}
                  data-cursor="expand"
                >
                  <span className={styles.navNum}>{num}</span>
                  <span className={styles.navLabel}>{label}</span>
                  <span className={styles.navUnderline} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right actions ── */}
          <div className={styles.rightActions}>
            <Link
              to="/admin"
              className={`${styles.textBtn} ${styles.adminBtn}`}
              data-cursor="expand"
            >
              ADMIN
            </Link>
            <a
              href="#preorder"
              className={`${styles.textBtn} ${styles.preorderBtn}`}
              onClick={(e) => handleAnchorClick(e, '#preorder')}
              data-cursor="expand"
            >
              PRE-ORDER
            </a>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              data-cursor="expand"
            >
              <span ref={line1Ref} className={styles.hLine} />
              <span ref={line2Ref} className={styles.hLine} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <div
        ref={menuRef}
        className={styles.mobileMenu}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileMenuInner}>
          {/* Close button */}
          <button
            className={styles.mobileClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <ul className={styles.mobileLinks} role="list">
            {NAV_LINKS.map(({ num, label, href }, i) => (
              <li
                key={href}
                ref={(el) => (menuLinksRef.current[i] = el)}
                className={styles.mobileLinkItem}
              >
                <a
                  href={href}
                  className={styles.mobileLink}
                  onClick={(e) => handleAnchorClick(e, href)}
                  data-cursor="expand"
                >
                  <span className={styles.mobileLinkNum}>{num}</span>
                  {label}
                </a>
              </li>
            ))}
            <li
              ref={(el) => (menuLinksRef.current[NAV_LINKS.length] = el)}
              className={styles.mobileLinkItem}
            >
              <Link
                to="/admin"
                className={`${styles.mobileLink} ${styles.mobileLinkAccent}`}
                onClick={() => setMenuOpen(false)}
                data-cursor="expand"
              >
                <span className={styles.mobileLinkNum}>—</span>ADMIN CONSOLE
              </Link>
            </li>
          </ul>

          <div className={styles.mobileFooter}>
            <span className={styles.mobileFooterLabel}>
              AERIS AI // ENV.MONITOR.V1
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
