import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose, links }) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Mobile navigation menu"
    >
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <Link to="/" className={styles.logo} onClick={onClose} data-cursor="link">
            <img
              src="/logos/Website_logo-removebg-preview.png"
              alt="ApexGrid"
              className={styles.logoImg}
            />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <span>✕</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className={styles.links} aria-label="Mobile navigation">
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.link}
              onClick={onClose}
              style={{ '--delay': `${i * 0.07}s` }}
              data-cursor="link"
            >
              <span className={styles.linkNumber}>0{i + 1}</span>
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkArrow}>→</span>
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className={styles.cta}>
          <Link
            to="/contact"
            className={styles.ctaBtn}
            onClick={onClose}
            data-cursor="cta"
          >
            Start a Project →
          </Link>
          <div className={styles.tagline}>
            <span className={styles.mono}>APEXGRID® DIGITAL STUDIO</span>
            <span className={styles.mono}>STRATEGY / DESIGN / TECHNOLOGY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
