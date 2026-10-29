import { useState, useEffect, useCallback } from 'react';

/**
 * useMousePosition
 *
 * Tracks the live mouse cursor position.
 *
 * @returns {{
 *   x: number,               Raw client X in pixels
 *   y: number,               Raw client Y in pixels
 *   normalizedX: number,     -1 (left edge) to +1 (right edge)
 *   normalizedY: number,     -1 (top edge)  to +1 (bottom edge)
 * }}
 */
export function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Normalize: center of viewport = 0, edges = ±1
    const normalizedX = (x / w) * 2 - 1;
    const normalizedY = (y / h) * 2 - 1;

    setPosition({ x, y, normalizedX, normalizedY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return position;
}

export default useMousePosition;
