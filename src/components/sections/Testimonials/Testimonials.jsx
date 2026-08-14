import { useState } from 'react';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { testimonials } from '@data/testimonials';
import SectionLabel from '@ui/SectionLabel';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, visible] = useScrollReveal();

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(p => (p + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className={styles.section} aria-label="Client Testimonials">
      <div className={styles.container}>
        <div className={`${styles.header} ${visible ? styles.visible : ''}`} ref={ref}>
          <SectionLabel number="08" text="Testimonials" />
        </div>

        <div className={`${styles.card} ${visible ? styles.cardVisible : ''}`}>
          <div className={styles.quoteWrap} key={current}>
            <span className={styles.quoteIcon} aria-hidden="true">"</span>
            <blockquote className={styles.quote}>{t.quote}</blockquote>
            <footer className={styles.attribution}>
              <span className={styles.name}>{t.name}</span>
              <span className={styles.role}>{t.role}, {t.company}</span>
            </footer>
          </div>

          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="link"
            >
              ←
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  data-cursor="link"
                />
              ))}
            </div>
            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="link"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
