import { useScrollReveal } from '@hooks/useScrollReveal';
import SectionLabel from '@ui/SectionLabel';
import styles from './About.module.css';

export default function About() {
  const [ref, visible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className={styles.section} id="about" aria-label="About ApexGrid">
      <div className={styles.container} ref={ref}>
        <div className={`${styles.left} ${visible ? styles.visible : ''}`}>
          <SectionLabel number="09" text="About" />
          <h2 className={styles.title}>
            SMALL ENOUGH<br />
            TO CARE.<br />
            <em className={styles.italic}>SERIOUS ENOUGH</em><br />
            TO DELIVER.
          </h2>
        </div>

        <div className={`${styles.right} ${visible ? styles.rightVisible : ''}`}>
          <p className={styles.body}>
            ApexGrid is a digital studio that brings strategy, design and technology together as a single, connected system. We don't pass work between departments. The same thinking that shapes the brief shapes the final product.
          </p>
          <p className={styles.body}>
            We work with ambitious companies at every stage — from early-stage ventures building their first brand to established businesses transforming their digital presence. What connects them all is a desire to do it properly.
          </p>
          <p className={styles.body}>
            Our approach is direct. We challenge briefs, simplify complexity and prioritize the decisions that matter. Then we execute with the care and craft that comes from genuinely caring about the outcome.
          </p>

          <div className={styles.attributes}>
            {['Strategy-led', 'Design-driven', 'Technology-enabled', 'Built to evolve'].map((attr) => (
              <div key={attr} className={styles.attr}>
                <span className={styles.attrDot} aria-hidden="true" />
                <span className={styles.attrText}>{attr}</span>
              </div>
            ))}
          </div>

          <div className={styles.tagline}>
            <span className={styles.mono}>BUILD. CONNECT. ELEVATE.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
