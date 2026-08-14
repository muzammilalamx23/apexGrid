import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const workLinks = ['Nova', 'Meridian', 'Atlas', 'Vector'];
const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>

        {/* Top Statement */}
        <div className={styles.top}>
          <p className={styles.statement}>LET'S BUILD<br />WHAT'S NEXT.</p>
          <div className={styles.topRight}>
            <Link to="/contact" className={styles.bigCta} data-cursor="cta">
              Start a Project →
            </Link>
            <a href="mailto:hello@apexgrid.io" className={styles.email} data-cursor="link">
              hello@apexgrid.io
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Middle nav grid */}
        <div className={styles.middle}>
          {/* Logo + Tagline */}
          <div className={styles.logoCol}>
            <Link to="/" data-cursor="link">
              <img
                src="/logos/Website_logo-removebg-preview.png"
                alt="ApexGrid"
                className={styles.logo}
              />
            </Link>
            <p className={styles.tagline}>Build. Connect. Elevate.</p>
            <p className={styles.location}>
              <span className={styles.mono}>GLOBAL — DIGITAL STUDIO</span>
            </p>
          </div>

          {/* Work */}
          <div className={styles.col}>
            <p className={styles.colLabel}>Selected Work</p>
            {workLinks.map(w => (
              <Link key={w} to={`/work/${w.toLowerCase()}`} className={styles.colLink} data-cursor="link">
                {w}
              </Link>
            ))}
          </div>

          {/* Pages */}
          <div className={styles.col}>
            <p className={styles.colLabel}>Navigate</p>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className={styles.colLink} data-cursor="link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className={styles.col}>
            <p className={styles.colLabel}>Connect</p>
            {['LinkedIn', 'Twitter / X', 'Instagram', 'Dribbble'].map(s => (
              <a key={s} href="#" className={styles.colLink} data-cursor="link">{s}</a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        {/* Bottom */}
        <div className={styles.bottom}>
          <span className={styles.mono}>APEXGRID® DIGITAL STUDIO — STRATEGY / DESIGN / TECHNOLOGY</span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink} data-cursor="link">Privacy</a>
            <a href="#" className={styles.bottomLink} data-cursor="link">Terms</a>
            <span className={styles.mono}>© {year} ApexGrid</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
