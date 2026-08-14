import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '@layout/Navigation';
import Footer from '@layout/Footer';
import CursorSystem from '@ui/CursorSystem';
import LoadingScreen from '@sections/LoadingScreen';
import Home from './pages/Home';
import Contact from './pages/Contact';

// Simple placeholder pages for routes not yet built
const WorkPage = () => (
  <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(2rem,6vw,5rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>ALL WORK</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Portfolio page — coming soon.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px solid var(--cyan)' }}>← Back to Home</a>
    </div>
  </main>
);

const ServicesPage = () => (
  <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(2rem,6vw,5rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>SERVICES</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Full services page — coming soon.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px solid var(--cyan)' }}>← Back to Home</a>
    </div>
  </main>
);

const AboutPage = () => (
  <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(2rem,6vw,5rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>ABOUT</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Full about page — coming soon.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px solid var(--cyan)' }}>← Back to Home</a>
    </div>
  </main>
);

const InsightsPage = () => (
  <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(2rem,6vw,5rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>INSIGHTS</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Articles page — coming soon.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px solid var(--cyan)' }}>← Back to Home</a>
    </div>
  </main>
);

const NotFound = () => (
  <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--cyan)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>404</p>
      <h1 style={{ fontSize: 'clamp(2rem,6vw,5rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>PAGE NOT FOUND.</h1>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px solid var(--cyan)' }}>← Back to Home</a>
    </div>
  </main>
);

// Routes that should NOT show the main nav/footer (full-screen experiences)
const CLEAN_ROUTES = ['/contact'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isCleanRoute = CLEAN_ROUTES.some(r => location.pathname.startsWith(r));

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* Custom Cursor */}
      <CursorSystem />

      {/* Loading Screen */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'fixed', top: '-100px', left: '1rem', zIndex: 99999,
          background: 'var(--cyan)', color: '#050505', padding: '0.5rem 1rem',
          borderRadius: '4px', fontWeight: 600, textDecoration: 'none',
          transition: 'top 0.3s',
        }}
        onFocus={e => { e.target.style.top = '1rem'; }}
        onBlur={e => { e.target.style.top = '-100px'; }}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      {!isCleanRoute && <Navigation />}

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      {!isCleanRoute && <Footer />}
    </>
  );
}
