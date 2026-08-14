import { useScrollReveal } from '@hooks/useScrollReveal';
import SectionLabel from '@ui/SectionLabel';
import styles from './TechStack.module.css';
import { techStack } from '@data/services';

export default function TechStack() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className={styles.section} aria-label="Technology Stack">
      <div className={styles.container}>
        <div className={`${styles.header} ${visible ? styles.visible : ''}`} ref={ref}>
          <SectionLabel number="09" text="Technology" />
          <h2 className={styles.title}>CRAFTED FOR<br />THE MODERN WEB.</h2>
          <p className={styles.subtitle}>Design intelligence combined with engineering discipline.</p>
        </div>

        <div className={styles.grid}>
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              className={`${styles.techItem} ${visible ? styles.techVisible : ''}`}
              style={{ '--delay': `${i * 0.04}s` }}
            >
              <span className={styles.techName}>{tech.name}</span>
              <span className={styles.techCategory}>{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
