import { Link } from 'react-router-dom';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { insights } from '@data/insights';
import SectionLabel from '@ui/SectionLabel';
import styles from './Insights.module.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Insights() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className={styles.section} aria-label="Insights">
      <div className={styles.container}>
        <div className={`${styles.header} ${headerVisible ? styles.visible : ''}`} ref={headerRef}>
          <SectionLabel number="10" text="Insights" />
          <div className={styles.headerRight}>
            <h2 className={styles.title}>THINKING<br />IN PUBLIC.</h2>
            <Link to="/insights" className={styles.allLink} data-cursor="link">
              All Articles →
            </Link>
          </div>
        </div>

        <div className={styles.articles}>
          {insights.slice(0, 3).map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, index }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <Link
      ref={ref}
      to={`/insights/${article.slug}`}
      className={`${styles.article} ${visible ? styles.articleVisible : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
      data-cursor="link"
    >
      <div className={styles.articleMeta}>
        <span className={styles.category}>{article.category}</span>
        <span className={styles.readTime}>{article.readingTime} read</span>
      </div>
      <h3 className={styles.articleTitle}>{article.title}</h3>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <div className={styles.articleFooter}>
        <span className={styles.date}>{formatDate(article.date)}</span>
        <span className={styles.arrow}>→</span>
      </div>
    </Link>
  );
}
