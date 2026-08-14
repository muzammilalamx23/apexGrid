import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Interactive grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let t = 0;

    const draw = () => {
      t += 0.004;
      const { width: w, height: h } = canvas;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const cols = 12;
      const rows = 8;
      const cellW = w / cols;
      const cellH = h / rows;

      // Draw grid lines
      for (let c = 0; c <= cols; c++) {
        const x = c * cellW;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        const dist = Math.abs(mx - x);
        const intensity = Math.max(0, 1 - dist / (w * 0.3));
        ctx.strokeStyle = `rgba(0, 212, 232, ${0.04 + intensity * 0.1})`;
        ctx.lineWidth = 0.5 + intensity * 0.5;
        ctx.stroke();
      }

      for (let r = 0; r <= rows; r++) {
        const y = r * cellH;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        const dist = Math.abs(my - y);
        const intensity = Math.max(0, 1 - dist / (h * 0.5));
        ctx.strokeStyle = `rgba(0, 212, 232, ${0.04 + intensity * 0.1})`;
        ctx.lineWidth = 0.5 + intensity * 0.5;
        ctx.stroke();
      }

      // Glow around cursor
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      grad.addColorStop(0, 'rgba(0, 212, 232, 0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle moving accent dots at intersections near cursor
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * cellW;
          const y = r * cellH;
          const dist = Math.hypot(mx - x, my - y);
          if (dist < 200) {
            const intensity = (1 - dist / 200) * 0.8;
            ctx.beginPath();
            ctx.arc(x, y, 1.5 * intensity, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 232, ${intensity * 0.6})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero} aria-label="ApexGrid Hero">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.container}>
        {/* Metadata top bar */}
        <div className={styles.meta}>
          <span className={styles.metaTag}>APEXGRID®</span>
          <span className={styles.metaDivider} />
          <span className={styles.metaTag}>DIGITAL STUDIO</span>
          <span className={styles.metaDivider} />
          <span className={styles.metaTag}>STRATEGY / DESIGN / TECHNOLOGY</span>
        </div>

        {/* Main headline */}
        <div className={styles.headlineWrap}>
          <h1 className={styles.headline}>
            <span className={styles.lineWrap}>
              <span className={styles.line}>WE BUILD</span>
            </span>
            <span className={styles.lineWrap}>
              <span className={`${styles.line} ${styles.lineIndent}`}>
                DIGITAL <em className={styles.italic}>EXPERIENCES</em>
              </span>
            </span>
            <span className={styles.lineWrap}>
              <span className={styles.line}>
                AT THE <span className={styles.cyanWord}>APEX.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.subheading}>
            ApexGrid connects strategy, design and technology to build<br />
            brands, products and experiences people remember.
          </p>
          <div className={styles.ctas}>
            <Link to="/contact" className={styles.ctaPrimary} data-cursor="cta">
              Start a Project →
            </Link>
            <a href="#work" className={styles.ctaSecondary} data-cursor="link">
              Explore Work ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
