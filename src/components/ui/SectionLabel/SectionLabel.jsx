import styles from './SectionLabel.module.css';

export default function SectionLabel({ number, text, className = '' }) {
  return (
    <div className={`${styles.label} ${className}`}>
      {number && <span className={styles.number}>{number}</span>}
      <span className={styles.text}>{text}</span>
    </div>
  );
}
