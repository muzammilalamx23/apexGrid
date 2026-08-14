import styles from './Button.module.css';
import { useMagneticEffect } from '@hooks/useMagneticEffect';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  magnetic = false,
  ...props
}) {
  const magneticRef = useMagneticEffect(0.25);

  const Tag = href ? 'a' : 'button';
  const tagProps = href
    ? { href, ...props }
    : { type, onClick, disabled, ...props };

  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    className,
  ].filter(Boolean).join(' ');

  if (magnetic) {
    return (
      <div ref={magneticRef} className={styles.magneticWrapper}>
        <Tag className={classes} {...tagProps}>
          <span className={styles.btnInner}>{children}</span>
        </Tag>
      </div>
    );
  }

  return (
    <Tag className={classes} {...tagProps}>
      <span className={styles.btnInner}>{children}</span>
    </Tag>
  );
}
