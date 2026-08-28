import { useScrollReveal } from '@hooks/useScrollReveal';
import { projects } from '@data/projects';
import SectionLabel from '@ui/SectionLabel';
import styles from './FeaturedWork.module.css';

// Project color palettes for visual backgrounds
const projectGradients = [
  'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 100%)',
  'linear-gradient(135deg, #0a1220 0%, #0d2236 100%)',
  'linear-gradient(135deg, #1a1209 0%, #2a1e0d 100%)',
  'linear-gradient(135deg, #0f0a1e 0%, #180f2e 100%)',
  'linear-gradient(135deg, #0a1310 0%, #0d2118 100%)',
];

// Tag label map
const typeLabels = {
  research: 'Research',
  web: 'Web',
  mobile: 'Mobile',
  tool: 'Tool',
};

export default function FeaturedWork() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className={styles.section} id="work" aria-label="Featured Work">
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="02" text="Featured Work" />
          <h2 className={styles.title}>WORK THAT<br /><em className={styles.italic}>MOVES</em> THE NEEDLE.</h2>
        </div>

        {/* Projects */}
        <div className={styles.projects}>
          {projects.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} gradient={projectGradients[i % projectGradients.length]} />
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <a
            href="https://github.com/skrohinahmed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
            data-cursor="link"
          >
            View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ project, index, gradient }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });
  const isEven = index % 2 === 0;

  // Choose live link: prefer dedicated live URL, fall back to GitHub
  const projectUrl = project.liveUrl || project.githubUrl;
  const isLive = project.liveUrl && project.liveUrl !== project.githubUrl;

  return (
    <article
      ref={ref}
      className={`${styles.panel} ${isEven ? styles.panelLeft : styles.panelRight} ${visible ? styles.panelVisible : ''}`}
      style={{ '--delay': `${index * 0.05}s` }}
    >
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.panelLink}
        data-cursor="view"
        aria-label={`View ${project.title} project`}
      >
        {/* Visual */}
        <div className={styles.visual} style={{ background: gradient }}>
          <div className={styles.visualInner}>
            {/* Type badge */}
            <span className={`${styles.typeBadge} ${styles[`typeBadge__${project.type}`]}`}>
              {typeLabels[project.type] || project.type}
            </span>
            {/* Abstract geometric accent */}
            <div className={styles.geometricAccent} aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke={project.accentColor} strokeWidth="0.5" opacity="0.3" />
                <circle cx="100" cy="100" r="50" stroke={project.accentColor} strokeWidth="0.5" opacity="0.5" />
                <line x1="20" y1="100" x2="180" y2="100" stroke={project.accentColor} strokeWidth="0.5" opacity="0.4" />
                <line x1="100" y1="20" x2="100" y2="180" stroke={project.accentColor} strokeWidth="0.5" opacity="0.4" />
                <circle cx="100" cy="100" r="8" fill={project.accentColor} opacity="0.6" />
              </svg>
            </div>
            {/* Project number */}
            <span className={styles.projectNum}>{project.id}</span>
          </div>
          <div className={styles.overlay} />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.description}>{project.tagline}</p>
          <div className={styles.services}>
            {project.services.map(s => (
              <span key={s} className={styles.serviceTag}>{s}</span>
            ))}
          </div>
          <span className={styles.viewCta}>
            {isLive ? 'View Live Project →' : 'View on GitHub →'}
          </span>
        </div>
      </a>
    </article>
  );
}
