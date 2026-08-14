import { useScrollReveal } from '@hooks/useScrollReveal';
import SectionLabel from '@ui/SectionLabel';
import styles from './WhyApexGrid.module.css';

const reasons = [
  { id: '01', title: 'Senior thinking', body: 'No unnecessary layers between strategy and execution. The people who pitch are the people who build.' },
  { id: '02', title: 'Design with purpose', body: 'Every visual decision supports the business. Aesthetics earn attention; purpose earns trust.' },
  { id: '03', title: 'Technology without theatre', body: "Technology exists to make the experience better, not to demonstrate that we know how to use it." },
  { id: '04', title: 'Built to scale', body: 'Systems, not disposable pages. We build foundations that grow with your business.' },
  { id: '05', title: 'Fast, focused collaboration', body: 'Clear communication and visible progress. No black boxes, no mystery, no delays.' },
  { id: '06', title: 'Obsessed with the details', body: 'Because the details are the difference between a good product and a memorable one.' },
];

export default function WhyApexGrid() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className={styles.section} aria-label="Why ApexGrid">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="06" text="Why ApexGrid" />
          <h2 className={styles.title}>SIX REASONS<br />TO CHOOSE US.</h2>
        </div>

        <div className={styles.grid}>
          {reasons.map((r, i) => (
            <ReasonCard key={r.id} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ '--delay': `${index * 0.07}s` }}
    >
      <span className={styles.cardNum}>{reason.id}</span>
      <h3 className={styles.cardTitle}>{reason.title}</h3>
      <p className={styles.cardBody}>{reason.body}</p>
    </div>
  );
}
