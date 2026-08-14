import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@hooks/useScrollReveal';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  const [ref, visible] = useScrollReveal({ threshold: 0.15 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.005;
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Orbital rings
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 1; i <= 3; i++) {
        const radius = (w * 0.15) * i;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 232, ${0.04 + (4 - i) * 0.015})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Moving point on ring
        const angle = t * (4 - i) * 0.7;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 232, ${0.5 + (4-i) * 0.1})`;
        ctx.fill();
      }

      // Grid lines
      const gridSpacing = 80;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = 'rgba(0, 212, 232, 0.025)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(0, 212, 232, 0.025)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Final Call to Action">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={`${styles.container} ${visible ? styles.visible : ''}`} ref={ref}>
        <div className={styles.topLabel}>
          <img
            src="/logos/Website_logo-removebg-preview.png"
            alt="ApexGrid"
            className={styles.logo}
          />
        </div>

        <h2 className={styles.headline}>
          HAVE SOMETHING<br />
          WORTH <em className={styles.italic}>BUILDING?</em>
        </h2>

        <p className={styles.sub}>
          Tell us what you're working on. We'll tell you what we think.
        </p>

        <div className={styles.actions}>
          <Link
            to="/contact"
            className={styles.ctaBtn}
            data-cursor="cta"
          >
            Start a Project →
          </Link>
          <a
            href="mailto:hello@apexgrid.io"
            className={styles.emailLink}
            data-cursor="link"
          >
            hello@apexgrid.io
          </a>
        </div>

        <div className={styles.bottomMeta}>
          <span className={styles.mono}>APEXGRID® DIGITAL STUDIO</span>
          <span className={styles.divider}>·</span>
          <span className={styles.mono}>STRATEGY / DESIGN / TECHNOLOGY</span>
        </div>
      </div>
    </section>
  );
}
