import { useEffect, useRef, useState } from 'react';
import styles from './CursorSystem.module.css';

export default function CursorSystem() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // default | link | view | cta
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only on hover-capable (non-touch) devices
    if (!window.matchMedia('(hover: hover)').matches) return;

    const dot = cursorDotRef.current;
    const ringEl = cursorRingRef.current;
    if (!dot || !ringEl) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const enter = () => setIsVisible(true);
    const leave = () => setIsVisible(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    // Track cursor state from data attributes on hovered elements
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.dataset.cursor);
      } else {
        setCursorState('default');
      }
    };
    document.addEventListener('mouseover', handleOver);

    const animate = () => {
      // Dot — instant
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

      // Ring — lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseover', handleOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className={`${styles.dot} ${styles[`dot--${cursorState}`]} ${isVisible ? styles.visible : ''}`}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={cursorRingRef}
        className={`${styles.ring} ${styles[`ring--${cursorState}`]} ${isVisible ? styles.visible : ''}`}
        aria-hidden="true"
      >
        {cursorState === 'view' && <span className={styles.viewLabel}>VIEW</span>}
      </div>
    </>
  );
}
