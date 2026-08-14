import { useScrollReveal } from '@hooks/useScrollReveal';
import styles from './TrustStrip.module.css';

const clients = [
  'Nova Technologies', 'Meridian Capital', 'Atlas Consumer',
  'Vector Labs', 'Arcana Studio', 'Elevate Ventures',
];

export default function TrustStrip() {
  const [ref, visible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.section} ref={ref} aria-label="Trusted by">
      <div className={styles.container}>
        <p className={`${styles.label} ${visible ? styles.visible : ''}`}>
          TRUSTED BY AMBITIOUS TEAMS
        </p>
        <div className={styles.clients}>
          {clients.map((name, i) => (
            <span
              key={name}
              className={`${styles.client} ${visible ? styles.clientVisible : ''}`}
              style={{ '--delay': `${i * 0.08}s` }}
            >
              {name}
            </span>
          ))}
        </div>
        <p className={`${styles.tagline} ${visible ? styles.visible : ''}`}>
          From early-stage ventures to established organizations, we build digital systems designed to perform.
        </p>
      </div>
    </section>
  );
}
