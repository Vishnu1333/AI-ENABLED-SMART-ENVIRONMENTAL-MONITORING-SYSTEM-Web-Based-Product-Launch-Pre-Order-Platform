import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Core scroll animation hook ───────────────────────────────────────────────

/**
 * useScrollAnimation
 *
 * Returns a `containerRef` to attach to a wrapper element and an
 * `animateOnScroll` helper for building ScrollTrigger-driven animations.
 *
 * All created ScrollTrigger instances are automatically cleaned up when the
 * component unmounts.
 */
export function useScrollAnimation() {
  const containerRef = useRef(null);
  const triggers = useRef([]);

  // Clean up all registered triggers on unmount
  useEffect(() => {
    return () => {
      triggers.current.forEach((st) => st.kill());
      triggers.current = [];
    };
  }, []);

  /**
   * Animate `element` from `fromVars` to `toVars`, driven by scroll.
   *
   * @param {Element|string|null} element  Target element or CSS selector.
   * @param {gsap.TweenVars} fromVars      GSAP from-vars.
   * @param {gsap.TweenVars} toVars        GSAP to-vars (merged with scrollTrigger).
   * @param {ScrollTrigger.Vars} [scrollConfig]  ScrollTrigger configuration overrides.
   */
  const animateOnScroll = useCallback(
    (element, fromVars = {}, toVars = {}, scrollConfig = {}) => {
      if (!element) return;

      const tween = gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          ...scrollConfig,
        },
      });

      if (tween.scrollTrigger) triggers.current.push(tween.scrollTrigger);

      return tween;
    },
    []
  );

  return { containerRef, animateOnScroll };
}

// ─── Text reveal hook ─────────────────────────────────────────────────────────

/**
 * useTextReveal
 *
 * Splits the text content of `ref.current` into individual lines (using a
 * SplitText-like approach via wrapping) and animates them in on scroll.
 *
 * @param {React.RefObject<Element>} ref
 * @param {object} [options]
 * @param {number} [options.stagger=0.08]
 * @param {number} [options.duration=0.9]
 * @param {string} [options.ease='power3.out']
 */
export function useTextReveal(ref, options = {}) {
  const { stagger = 0.08, duration = 0.9, ease = 'power3.out' } = options;

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    // Wrap each word in a span, then detect lines by grouping words with same offsetTop
    const originalHTML = el.innerHTML;
    const text = el.innerText || el.textContent || '';
    const words = text.split(' ').filter(Boolean);

    el.innerHTML = words
      .map((w) => `<span class="__word" style="display:inline-block;">${w}&nbsp;</span>`)
      .join('');

    const wordEls = el.querySelectorAll('.__word');

    // Group words into lines by their vertical offset
    const lineMap = new Map();
    wordEls.forEach((w) => {
      const top = w.offsetTop;
      if (!lineMap.has(top)) lineMap.set(top, []);
      lineMap.get(top).push(w);
    });

    // Wrap each line's words in a clip container
    lineMap.forEach((lineWords) => {
      lineWords.forEach((w) => {
        const wrapper = document.createElement('span');
        wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;';
        w.parentNode.insertBefore(wrapper, w);
        wrapper.appendChild(w);
      });
    });

    const innerWords = el.querySelectorAll('.__word');

    // Animate
    gsap.set(innerWords, { yPercent: 110, opacity: 0 });

    const tween = gsap.to(innerWords, {
      yPercent: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      el.innerHTML = originalHTML;
    };
  }, [ref, stagger, duration, ease]);
}

// ─── Count-up hook ────────────────────────────────────────────────────────────

/**
 * useCountUp
 *
 * Animates the text content of `ref.current` counting from 0 to `target`
 * when the element enters the viewport.
 *
 * @param {React.RefObject<Element>} ref
 * @param {number} target      The final number to count to.
 * @param {string} [suffix='']  Optional suffix appended after the number, e.g. '%'.
 * @param {object} [options]
 * @param {number} [options.duration=2]
 * @param {string} [options.ease='power2.out']
 * @param {number} [options.decimals=0]
 */
export function useCountUp(ref, target, suffix = '', options = {}) {
  const { duration = 2, ease = 'power2.out', decimals = 0 } = options;

  useEffect(() => {
    const el = ref?.current;
    if (!el || typeof target !== 'number') return;

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value: target,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      onUpdate() {
        el.textContent = counter.value.toFixed(decimals) + suffix;
      },
      onComplete() {
        el.textContent = target.toFixed(decimals) + suffix;
      },
    });

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [ref, target, suffix, duration, ease, decimals]);
}

export default useScrollAnimation;
