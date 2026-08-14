import { useScrollReveal } from '@hooks/useScrollReveal';
import SectionLabel from '@ui/SectionLabel';
import styles from './Difference.module.css';

const principles = [
  { num: '01', title: 'THINK', body: 'Strategy before decoration. Every brief starts with understanding the business, not opening Figma.' },
  { num: '02', title: 'BUILD', body: 'Design engineered for reality. Beautiful work that functions in the browser, not just on a Dribbble shot.' },
  { num: '03', title: 'MOVE', body: 'Launch, learn and evolve. Digital products are never finished. We build them to keep improving.' },
];

export default function Difference() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className={styles.section} id="approach" aria-label="The ApexGrid Difference">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="04" text="Our Difference" />
          <h2 className={styles.title}>DESIGN IS ONLY<br />HALF THE JOB.</h2>
          <p className={styles.subtitle}>
            A beautiful interface is not enough. ApexGrid connects strategy, design and engineering so every decision has a purpose — and every pixel works harder.
          </p>
        </div>

        <div className={styles.principles}>
          {principles.map((p, i) => (
            <PrincipleCard key={p.num} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, index }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ '--delay': `${index * 0.12}s` }}
    >
      <span className={styles.bigNum} aria-hidden="true">{principle.num}</span>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{principle.title}</h3>
        <p className={styles.cardBody}>{principle.body}</p>
      </div>
      <div className={styles.cardLine} aria-hidden="true" />
    </div>
  );
}
