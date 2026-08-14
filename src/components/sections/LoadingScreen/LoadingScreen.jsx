import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('visible'); // visible → fadeout

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fadeout'), 2000);
    const t2 = setTimeout(() => onComplete?.(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={`${styles.screen} ${phase === 'fadeout' ? styles.fadeout : ''}`} aria-hidden="true">
      {/* SVG Grid Lines */}
      <svg className={styles.grid} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {[100, 200, 300].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400"
            stroke="rgba(0,212,232,0.12)" strokeWidth="0.5"
            strokeDasharray="400" strokeDashoffset="400"
            className={styles.gridLine}
          />
        ))}
        {[100, 200, 300].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y}
            stroke="rgba(0,212,232,0.12)" strokeWidth="0.5"
            strokeDasharray="400" strokeDashoffset="400"
            className={styles.gridLine}
          />
        ))}
        {/* Diagonal accent */}
        <line x1="200" y1="0" x2="400" y2="200"
          stroke="rgba(0,212,232,0.2)" strokeWidth="0.5"
          strokeDasharray="600" strokeDashoffset="600"
          className={`${styles.gridLine} ${styles.accentLine}`}
        />
      </svg>

      {/* Logo */}
      <div className={styles.logoWrap}>
        <img
          src="/logos/Website_logo-removebg-preview.png"
          alt="ApexGrid"
          className={styles.logo}
        />
        <div className={styles.bar} />
      </div>

      {/* Bottom label */}
      <div className={styles.bottomLabel}>
        <span className={styles.mono}>LOADING EXPERIENCE</span>
        <span className={styles.dot} />
      </div>
    </div>
  );
}
