import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

// ─── EmailJS Config ──────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ → sign up free
// 2. Add an Email Service (Gmail recommended) → copy Service ID below
// 3. Create an Email Template using the variables listed in the template
//    body (name, company, building, help, budget, launch, challenge, email)
//    → copy Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
// 5. In the template set "To Email" to: muzmmilalamx23@gmail.com
//    Then create a second template (or duplicate) for skrohinahmed@gmail.com
//    OR simply add both as CC/BCC inside one template.
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'user_XXXXXXXXXX'

// Both recipients — the template should CC or the service should BCC the second
const RECIPIENT_1 = 'muzmmilalamx23@gmail.com';
const RECIPIENT_2 = 'skrohinahmed@gmail.com';
// ─────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, field: 'name',      label: "What's your name?",                type: 'text',        placeholder: 'Your full name' },
  { id: 2, field: 'company',   label: "What's your company?",             type: 'text',        placeholder: 'Company or project name' },
  {
    id: 3, field: 'building',  label: "What are you building?",           type: 'select',
    options: ['Brand', 'Website', 'Digital Product', 'E-commerce', 'AI Product', 'Other'],
  },
  {
    id: 4, field: 'help',      label: "What do you need help with?",      type: 'multiselect',
    options: ['Strategy', 'Design', 'Development', 'Full Digital Experience'],
  },
  {
    id: 5, field: 'budget',    label: "What's your approximate budget?",  type: 'select',
    options: ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'],
  },
  { id: 6, field: 'launch',    label: "When are you looking to launch?",  type: 'text',        placeholder: 'e.g. Q1 2025, 3 months, ASAP' },
  { id: 7, field: 'challenge', label: "Tell us about your challenge.",     type: 'textarea',    placeholder: 'Describe your project, goals and any key requirements...' },
  { id: 8, field: 'email',     label: "And your email address?",          type: 'email',       placeholder: 'hello@yourcompany.com' },
];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);
  const [sendError, setSendError]     = useState('');
  const [multiSelections, setMultiSelections] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const step       = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const progress   = (currentStep / totalSteps) * 100;

  /* ── advance / submit ── */
  const handleNext = handleSubmit(async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
      return;
    }

    // Last step → send email
    setSending(true);
    setSendError('');
    const data = getValues();

    const templateParams = {
      from_name:    data.name,
      company:      data.company,
      building:     data.building,
      help:         data.help,
      budget:       data.budget,
      launch:       data.launch,
      challenge:    data.challenge,
      reply_to:     data.email,
      to_email_1:   RECIPIENT_1,
      to_email_2:   RECIPIENT_2,
    };

    try {
      // Send to both recipients (EmailJS sends to whatever "to" the template specifies)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError('Something went wrong sending your brief. Please try emailing us directly at muzmmilalamx23@gmail.com');
    } finally {
      setSending(false);
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step.type !== 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  const toggleMultiSelect = (option) => {
    const updated = multiSelections.includes(option)
      ? multiSelections.filter(o => o !== option)
      : [...multiSelections, option];
    setMultiSelections(updated);
    setValue('help', updated.join(', '));
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.success}>
          <div className={styles.successIcon} aria-hidden="true">
            <svg viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="29" stroke="var(--cyan)" strokeWidth="1" />
              <path d="M18 30L26 38L42 22" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className={styles.successTitle}>BRIEF RECEIVED.</h1>
          <p className={styles.successSub}>We'll review it and get back to you within 24 hours.</p>
          <a href="/" className={styles.homeLink} data-cursor="link">← Back to Home</a>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page} aria-label="Start a Project">
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <a href="/" className={styles.logo} data-cursor="link">
            <img src="/logos/Website_logo-removebg-preview.png" alt="ApexGrid" className={styles.logoImg} />
          </a>
          <span className={styles.stepCount}>
            {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleNext} noValidate>
          <div className={styles.stepWrap} key={currentStep}>
            <span className={styles.stepNum}>
              {String(step.id).padStart(2, '0')} —
            </span>
            <label className={styles.stepLabel} htmlFor={`field-${step.field}`}>
              {step.label}
            </label>

            {/* Text / email */}
            {(step.type === 'text' || step.type === 'email') && (
              <input
                id={`field-${step.field}`}
                className={`${styles.input} ${errors[step.field] ? styles.inputError : ''}`}
                type={step.type}
                placeholder={step.placeholder}
                autoFocus
                onKeyDown={handleKeyDown}
                {...register(step.field, {
                  required: 'This field is required',
                  ...(step.type === 'email' ? { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } } : {}),
                })}
              />
            )}

            {/* Textarea */}
            {step.type === 'textarea' && (
              <textarea
                id={`field-${step.field}`}
                className={styles.textarea}
                placeholder={step.placeholder}
                autoFocus
                rows={5}
                {...register(step.field, { required: 'Please tell us about your challenge' })}
              />
            )}

            {/* Select options */}
            {step.type === 'select' && (
              <div className={styles.options} role="radiogroup" aria-label={step.label}>
                {step.options.map((opt) => (
                  <label key={opt} className={styles.optionLabel} data-cursor="link">
                    <input
                      type="radio"
                      value={opt}
                      className={styles.optionInput}
                      {...register(step.field, { required: 'Please select an option' })}
                    />
                    <span className={styles.optionText}>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Multiselect */}
            {step.type === 'multiselect' && (
              <div className={styles.options} role="group" aria-label={step.label}>
                {step.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.optionBtn} ${multiSelections.includes(opt) ? styles.optionBtnActive : ''}`}
                    onClick={() => toggleMultiSelect(opt)}
                    data-cursor="link"
                    aria-pressed={multiSelections.includes(opt)}
                  >
                    {opt}
                  </button>
                ))}
                <input type="hidden" {...register('help', { required: 'Please select at least one' })} />
              </div>
            )}

            {errors[step.field] && (
              <p className={styles.error} role="alert">{errors[step.field].message}</p>
            )}

            {sendError && (
              <p className={styles.error} role="alert">{sendError}</p>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {currentStep > 0 && (
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setCurrentStep(s => s - 1)}
                data-cursor="link"
                disabled={sending}
              >
                ← Back
              </button>
            )}
            <button type="submit" className={styles.nextBtn} data-cursor="cta" disabled={sending}>
              {sending
                ? 'Sending…'
                : currentStep === totalSteps - 1
                  ? 'Submit Brief →'
                  : 'Continue →'
              }
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
