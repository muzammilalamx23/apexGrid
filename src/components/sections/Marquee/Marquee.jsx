import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

const items = [
  'STRATEGY', 'BRANDING', 'UX / UI', 'WEB DESIGN',
  'DEVELOPMENT', 'MOTION', 'AI', 'E-COMMERCE',
  'DIGITAL PRODUCTS', 'CREATIVE TECHNOLOGY', 'BRAND IDENTITY', 'NEXT.JS',
];

export default function Marquee() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5; // px per frame

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => { pausedRef.current = true; };
    const handleMouseLeave = () => { pausedRef.current = false; };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const allItems = [...items, ...items]; // duplicate for seamless loop

  return (
    <section className={styles.section} aria-label="Capabilities" aria-hidden="true">
      <div className={styles.overflow}>
        <div ref={trackRef} className={styles.track}>
          {allItems.map((item, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.text}>{item}</span>
              <span className={styles.dot} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
