import { useState } from 'react';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { services } from '@data/services';
import SectionLabel from '@ui/SectionLabel';
import styles from './Services.module.css';

export default function Services() {
  const [openId, setOpenId] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className={styles.section} id="services" aria-label="Services">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="03" text="Services" />
          <h2 className={styles.title}>FROM FIRST IDEA<br />TO FINAL PIXEL.</h2>
        </div>

        <div className={styles.accordion} role="list">
          {services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={i}
              isOpen={openId === service.id}
              onToggle={() => toggle(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service, index, isOpen, onToggle }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isOpen ? styles.itemOpen : ''} ${visible ? styles.itemVisible : ''}`}
      style={{ '--delay': `${index * 0.06}s` }}
      role="listitem"
    >
      <button
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`service-${service.id}`}
        data-cursor="link"
      >
        <span className={styles.triggerNum}>{service.id}</span>
        <span className={styles.triggerTitle}>{service.title}</span>
        <span className={styles.triggerIcon} aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        id={`service-${service.id}`}
        className={styles.content}
        role="region"
        aria-label={service.title}
      >
        <div className={styles.contentInner}>
          <p className={styles.description}>{service.description}</p>
          <ul className={styles.items} aria-label={`${service.title} services`}>
            {service.items.map(item => (
              <li key={item} className={styles.item2}>
                <span className={styles.itemDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
