import { useState, useEffect, useCallback } from 'react';

/**
 * Custom React hook that returns a boolean indicating whether a CSS media query matches.
 * Used for responsive menu behavior (switching between dropdown and slide-in panel).
 *
 * @param {string} query - A valid CSS media query string, e.g. '(max-width: 768px)'.
 * @returns {boolean} Whether the media query currently matches.
 */
export function useMediaQuery(query) {
  const getMatches = useCallback((mediaQuery) => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(mediaQuery).matches;
  }, []);

  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Set initial value in case it changed between render and effect
    setMatches(mediaQueryList.matches);

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleChange);
      return () => {
        mediaQueryList.removeEventListener('change', handleChange);
      };
    } else {
      // Fallback for older browsers that use the deprecated addListener API
      mediaQueryList.addListener(handleChange);
      return () => {
        mediaQueryList.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;