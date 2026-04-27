import { useEffect, useCallback } from 'react';

/**
 * Custom hook that detects clicks (and touch events) outside a referenced element
 * and invokes the provided callback.
 *
 * @param {import('react').RefObject<HTMLElement>} ref - React ref attached to the element to monitor.
 * @param {function} callback - Function to call when a click outside the element is detected.
 * @param {boolean} [enabled=true] - Whether the outside click listener is active.
 */
export function useClickOutside(ref, callback, enabled = true) {
  const handleEvent = useCallback(
    (event) => {
      if (!ref.current) {
        return;
      }

      if (ref.current.contains(event.target)) {
        return;
      }

      callback(event);
    },
    [ref, callback],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [handleEvent, enabled]);
}

export default useClickOutside;