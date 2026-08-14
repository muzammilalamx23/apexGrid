import { useScrollReveal } from '@hooks/useScrollReveal';
import { useCounter } from '@hooks/useCounter';
import SectionLabel from '@ui/SectionLabel';
import styles from './Metrics.module.css';

const metrics = [
  { value: 60, suffix: '+', label: 'Projects launched' },
  { value: 12, suffix: '', label: 'Industries explored' },
  { value: 18, suffix: '', label: 'Countries reached' },
  { value: 97, suffix: '%', label: 'Client satisfaction' },
];

export default function Metrics() {
  const [ref, visible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.section} aria-label="Results and Metrics" ref={ref}>
      <div className={styles.container}>
        <SectionLabel number="07" text="By the Numbers" />
        <div className={styles.grid}>
          {metrics.map((m, i) => (
            <MetricItem key={m.label} metric={m} index={i} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricItem({ metric, index, start }) {
  const count = useCounter(metric.value, 2000, start);

  return (
    <div
      className={`${styles.item} ${start ? styles.itemVisible : ''}`}
      style={{ '--delay': `${index * 0.12}s` }}
    >
      <div className={styles.number}>
        <span className={styles.count}>{count}</span>
        <span className={styles.suffix}>{metric.suffix}</span>
      </div>
      <p className={styles.label}>{metric.label}</p>
    </div>
  );
}
