import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  large: '(min-width: 1440px)',
  touch: '(hover: none)',
  hover: '(hover: hover)',
};
