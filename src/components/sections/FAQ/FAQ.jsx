import { useState } from 'react';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { faqs } from '@data/faqs';
import SectionLabel from '@ui/SectionLabel';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="11" text="FAQ" />
          <h2 className={styles.title}>QUESTIONS<br />ANSWERED.</h2>
        </div>

        <div className={styles.list} role="list">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isOpen ? styles.itemOpen : ''} ${visible ? styles.itemVisible : ''}`}
      style={{ '--delay': `${index * 0.05}s` }}
      role="listitem"
    >
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${faq.id}`}
        data-cursor="link"
      >
        <span className={styles.qText}>{faq.question}</span>
        <span className={styles.icon} aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        id={`faq-${faq.id}`}
        className={styles.answer}
        role="region"
        aria-label={faq.question}
      >
        <p className={styles.answerText}>{faq.answer}</p>
      </div>
    </div>
  );
}
