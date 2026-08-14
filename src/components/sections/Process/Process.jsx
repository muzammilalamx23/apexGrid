import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@hooks/useScrollReveal';
import SectionLabel from '@ui/SectionLabel';
import styles from './Process.module.css';

const steps = [
  { id: '01', title: 'Discover', body: 'Understand the business, audience, problem and opportunity. We ask the questions others skip.' },
  { id: '02', title: 'Define', body: 'Shape the strategy, positioning, architecture and creative direction. Clarity before creativity.' },
  { id: '03', title: 'Design', body: 'Create the identity, experience and visual system. Every decision referenced back to the strategy.' },
  { id: '04', title: 'Build', body: 'Turn design into a fast, responsive and scalable digital product. Engineering as a creative discipline.' },
  { id: '05', title: 'Launch', body: 'Test, optimize and release. A measured rollout that minimizes risk and maximizes impact.' },
  { id: '06', title: 'Evolve', body: 'Continue improving the experience after launch. The best digital products never stop getting better.' },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [headerRef, headerVisible] = useScrollReveal();
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section} aria-label="Our Process">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="05" text="Process" />
          <h2 className={styles.title}>FROM AMBITION<br />TO LAUNCH.</h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className={styles.timeline} ref={containerRef} aria-label="Process steps">
          {steps.map((step, i) => (
            <button
              key={step.id}
              className={`${styles.step} ${i === activeStep ? styles.stepActive : ''}`}
              onClick={() => setActiveStep(i)}
              aria-current={i === activeStep ? 'step' : undefined}
            >
              <span className={styles.stepNum}>{step.id}</span>
              <span className={styles.stepTitle}>{step.title}</span>
              <div className={styles.stepConnector} aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className={styles.detail} aria-live="polite">
          <div className={styles.detailNum}>{steps[activeStep].id}</div>
          <div className={styles.detailContent}>
            <h3 className={styles.detailTitle}>{steps[activeStep].title}</h3>
            <p className={styles.detailBody}>{steps[activeStep].body}</p>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className={styles.mobileList} aria-label="Process steps">
          {steps.map((step, i) => (
            <div key={step.id} className={styles.mobileStep}>
              <div className={styles.mobileStepLeft}>
                <span className={styles.mobileNum}>{step.id}</span>
                {i < steps.length - 1 && <div className={styles.mobileConnector} />}
              </div>
              <div className={styles.mobileContent}>
                <h3 className={styles.mobileTitle}>{step.title}</h3>
                <p className={styles.mobileBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
