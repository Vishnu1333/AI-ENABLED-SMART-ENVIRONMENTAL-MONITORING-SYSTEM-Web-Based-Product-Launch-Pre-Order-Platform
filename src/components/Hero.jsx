import { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './Hero.module.css';

/* ─────────────────────────────────────────────
   Mouse position hook
───────────────────────────────────────────── */
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}

/* ─────────────────────────────────────────────
   3-D: Particle field
───────────────────────────────────────────── */
function ParticleField({ count = 65, isMobile }) {
  const ref = useRef();
  const particleCount = isMobile ? 30 : count;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6db88a"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────────
   3-D: Orbiting ring
───────────────────────────────────────────── */
function OrbitRing() {
  const ringRef = useRef();
  const glowRef = useRef();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (ringRef.current) {
      ringRef.current.rotation.x = time.current * 0.4 + Math.PI / 2.5;
      ringRef.current.rotation.z = time.current * 0.15;
    }
    if (glowRef.current) {
      const pulse = 0.9 + Math.sin(time.current * 2.2) * 0.1;
      glowRef.current.material.opacity = pulse * 0.55;
    }
  });

  return (
    <group>
      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.55, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#6db88a"
          emissive="#6db88a"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
      {/* Glow ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.55, 0.06, 8, 80]} />
        <meshBasicMaterial
          color="#6db88a"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   3-D: Core prism (hexagonal body)
───────────────────────────────────────────── */
function CorePrism() {
  const meshRef = useRef();
  const innerRef = useRef();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (meshRef.current) {
      // Subtle breathe
      const breathe = 1 + Math.sin(time.current * 0.9) * 0.012;
      meshRef.current.scale.setScalar(breathe);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Outer dark hexagonal prism */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.82, 0.82, 1.55, 6, 1]} />
        <meshStandardMaterial
          color="#141414"
          roughness={0.35}
          metalness={0.88}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Inner core accent */}
      <mesh ref={innerRef}>
        <cylinderGeometry args={[0.38, 0.38, 1.58, 6, 1]} />
        <meshStandardMaterial
          color="#1a2e22"
          roughness={0.2}
          metalness={0.9}
          emissive="#6db88a"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Top cap face glow */}
      <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 6]} />
        <meshStandardMaterial
          color="#1a2e22"
          roughness={0.1}
          metalness={1}
          emissive="#6db88a"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   3-D: Scene — combines all pieces + mouse tilt
───────────────────────────────────────────── */
function Scene({ mouse, isMobile }) {
  const groupRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5.5);
  }, [camera]);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = isMobile ? 0 : mouse.current.y * 0.18;
    const targetY = isMobile ? 0 : mouse.current.x * 0.22;

    // Lerp for smooth tracking
    mouse.current.lerpX = THREE.MathUtils.lerp(
      mouse.current.lerpX ?? 0,
      targetX,
      0.04
    );
    mouse.current.lerpY = THREE.MathUtils.lerp(
      mouse.current.lerpY ?? 0,
      targetY,
      0.04
    );

    groupRef.current.rotation.x = mouse.current.lerpX;
    groupRef.current.rotation.y +=
      0.003 + (isMobile ? 0 : mouse.current.lerpY * 0.01);
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.25} color="#ffffff" />
      <pointLight position={[3, 4, 3]} intensity={2.5} color="#ffffff" />
      <pointLight
        position={[-2, 2, -3]}
        intensity={1.2}
        color="#6db88a"
        distance={12}
      />
      <pointLight
        position={[0, -3, 2]}
        intensity={0.8}
        color="#4a8c60"
        distance={8}
      />
      {/* Pulsing green glow light */}
      <GlowLight />

      <CorePrism />
      <OrbitRing />
      <ParticleField isMobile={isMobile} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   3-D: Pulsing glow light
───────────────────────────────────────────── */
function GlowLight() {
  const lightRef = useRef();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(time.current * 1.8) * 0.8;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 2]}
      intensity={1.5}
      color="#6db88a"
      distance={6}
    />
  );
}

/* ─────────────────────────────────────────────
   Floating data panel
───────────────────────────────────────────── */
function DataPanel({ label, value, unit, status, className }) {
  return (
    <div className={`${styles.dataPanel} ${className || ''}`}>
      <span className={styles.panelLabel}>{label}</span>
      <div className={styles.panelValueRow}>
        <span className={styles.panelValue}>{value}</span>
        {unit && <span className={styles.panelUnit}>{unit}</span>}
      </div>
      {status && (
        <div className={styles.panelStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>{status}</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const coordsRef = useRef(null);
  const scrollCueRef = useRef(null);
  const panelsRef = useRef([]);
  const mouse = useMousePosition();

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    if (!headlineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Headline — word by word
      const words = headlineRef.current.querySelectorAll('[data-word]');
      tl.fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=0.4'
      );

      // Body
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.5'
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      // Coords
      tl.fromTo(
        coordsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      );

      // Scroll cue
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

      // Floating panels stagger
      tl.fromTo(
        panelsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll cue bob animation ── */
  useEffect(() => {
    if (!scrollCueRef.current) return;
    const arrow = scrollCueRef.current.querySelector('[data-arrow]');
    if (!arrow) return;
    gsap.to(arrow, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
      delay: 2,
    });
  }, []);

  const handleExplore = (e) => {
    e.preventDefault();
    document.querySelector('#system')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePreorder = (e) => {
    e.preventDefault();
    document.querySelector('#preorder')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split headline into word spans for GSAP
  const headlineWords = [
    'ENVIRONMENT,',
    'INTELLIGENTLY',
    'MONITORED.',
  ];

  return (
    <section
      id="intro"
      ref={sectionRef}
      className={styles.hero}
      aria-label="AERIS AI Hero"
    >
      {/* ── Tech grid ── */}
      <div className={`${styles.grid} tech-grid`} aria-hidden="true" />

      {/* ── 3-D Canvas ── */}
      <div className={styles.canvasWrap} aria-hidden="true">
        <Canvas
          dpr={[1, isMobile ? 1 : 1.8]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene mouse={mouse} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Text content ── */}
      <div className={styles.content}>
        {/* Label */}
        <p ref={labelRef} className={styles.topLabel} aria-label="AERIS AI ENV Monitor V1">
          <span className={styles.labelDot} aria-hidden="true" />
          AERIS AI // ENV.MONITOR.V1
        </p>

        {/* Headline */}
        <h1 ref={headlineRef} className={styles.headline} aria-label="Environment, Intelligently Monitored.">
          {headlineWords.map((word, i) => (
            <span key={i} className={styles.wordWrap}>
              <span data-word className={styles.word}>{word}</span>
            </span>
          ))}
        </h1>

        {/* Body */}
        <p ref={bodyRef} className={styles.body}>
          AI-powered continuous monitoring for workplaces, schools,
          hospitals and commercial spaces.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.ctas}>
          <a
            href="#system"
            className={styles.btnPrimary}
            onClick={handleExplore}
            data-cursor="expand"
          >
            EXPLORE THE SYSTEM&nbsp;→
          </a>
          <a
            href="#preorder"
            className={styles.btnSecondary}
            onClick={handlePreorder}
            data-cursor="expand"
          >
            PRE-ORDER NOW
          </a>
        </div>
      </div>

      {/* ── Floating data panels ── */}
      <DataPanel
        label="TEMPERATURE"
        value="24.8"
        unit="°C"
        className={styles.panel1}
        ref_={(el) => (panelsRef.current[0] = el)}
      />
      <div ref={(el) => (panelsRef.current[0] = el)} className={`${styles.dataPanel} ${styles.panel1}`}>
        <span className={styles.panelLabel}>TEMPERATURE</span>
        <div className={styles.panelValueRow}>
          <span className={styles.panelValue}>24.8</span>
          <span className={styles.panelUnit}>°C</span>
        </div>
        <div className={styles.panelStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>NORMAL</span>
        </div>
      </div>

      <div ref={(el) => (panelsRef.current[1] = el)} className={`${styles.dataPanel} ${styles.panel2}`}>
        <span className={styles.panelLabel}>HUMIDITY</span>
        <div className={styles.panelValueRow}>
          <span className={styles.panelValue}>61</span>
          <span className={styles.panelUnit}>%</span>
        </div>
        <div className={styles.panelStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>OPTIMAL</span>
        </div>
      </div>

      <div ref={(el) => (panelsRef.current[2] = el)} className={`${styles.dataPanel} ${styles.panel3}`}>
        <span className={styles.panelLabel}>AIR QUALITY</span>
        <div className={styles.panelValueRow}>
          <span className={styles.panelValue}>AQI 18</span>
        </div>
        <div className={styles.panelStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>GOOD</span>
        </div>
      </div>

      <div ref={(el) => (panelsRef.current[3] = el)} className={`${styles.dataPanel} ${styles.panel4}`}>
        <span className={styles.panelLabel}>AI STATUS</span>
        <div className={styles.panelValueRow}>
          <span className={styles.panelValue}>●</span>
          <span className={styles.panelUnit}>ACTIVE</span>
        </div>
        <div className={styles.panelStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>MONITORING</span>
        </div>
      </div>

      {/* ── Bottom left coords ── */}
      <div ref={coordsRef} className={styles.coords} aria-label="Sensor coordinates">
        <span className={styles.coordLine}>51.5074°N, 0.1278°W</span>
        <span className={styles.coordLabel}>AERIS SENSOR GRID</span>
      </div>

      {/* ── Bottom right scroll cue ── */}
      <div ref={scrollCueRef} className={styles.scrollCue} aria-label="Scroll down">
        <span className={styles.scrollLabel}>SCROLL</span>
        <span data-arrow className={styles.scrollArrow} aria-hidden="true">↓</span>
      </div>

      {/* ── Corner marks ── */}
      <span className="corner-mark tl" aria-hidden="true" />
      <span className="corner-mark tr" aria-hidden="true" />
      <span className="corner-mark bl" aria-hidden="true" />
      <span className="corner-mark br" aria-hidden="true" />
    </section>
  );
}
