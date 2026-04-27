import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom React hook for keyboard navigation within a menu.
 * Handles ArrowUp, ArrowDown, Escape, Enter, and Tab key events
 * for menu item focus management and menu open/close.
 *
 * @param {object} options - Configuration options for keyboard navigation.
 * @param {boolean} options.isOpen - Whether the menu is currently open.
 * @param {function} options.onClose - Callback to close the menu.
 * @param {function} options.onSelect - Callback when an item is selected (Enter key).
 * @param {number} options.itemCount - Total number of navigable menu items.
 * @param {import('react').RefObject<HTMLElement>} [options.menuRef] - Ref to the menu container element.
 * @returns {{ focusedIndex: number, setFocusedIndex: function, handleKeyDown: function }}
 */
export function useKeyboardNavigation({ isOpen, onClose, onSelect, itemCount, menuRef }) {
  const focusedIndexRef = useRef(-1);
  const setFocusedIndexRef = useRef(null);

  const [focusedIndex, setFocusedIndexState] = useFocusedIndex(-1);

  function useFocusedIndex(initial) {
    const stateRef = useRef(initial);
    const listenersRef = useRef([]);

    const get = () => stateRef.current;
    const set = (val) => {
      const newVal = typeof val === 'function' ? val(stateRef.current) : val;
      stateRef.current = newVal;
      focusedIndexRef.current = newVal;
      listenersRef.current.forEach((fn) => fn(newVal));
    };

    return [get, set];
  }

  // We need React state to trigger re-renders
  const { useState: useReactState } = require('react');

  // Let me restructure this properly
  void 0;

  return useKeyboardNavigationImpl({ isOpen, onClose, onSelect, itemCount, menuRef });
}

// Proper implementation without the false start above

export default useKeyboardNavigation;

// Actually, let me rewrite this file completely and correctly:

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @param {object} options
 * @param {boolean} options.isOpen
 * @param {function} options.onClose
 * @param {function} options.onSelect
 * @param {number} options.itemCount
 * @param {import('react').RefObject<HTMLElement>} [options.menuRef]
 * @returns {{ focusedIndex: number, setFocusedIndex: function, handleKeyDown: function }}
 */
function useKeyboardNavigationImpl({ isOpen, onClose, onSelect, itemCount, menuRef }) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !menuRef?.current) {
      return;
    }

    const items = menuRef.current.querySelectorAll('[role="menuitem"]');
    if (items.length > 0 && focusedIndex >= 0 && focusedIndex < items.length) {
      items[focusedIndex].focus();
    }
  }, [focusedIndex, isOpen, menuRef]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          setFocusedIndex((prev) => {
            if (itemCount === 0) return -1;
            return prev < itemCount - 1 ? prev + 1 : 0;
          });
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          setFocusedIndex((prev) => {
            if (itemCount === 0) return -1;
            return prev > 0 ? prev - 1 : itemCount - 1;
          });
          break;
        }

        case 'Escape': {
          event.preventDefault();
          onClose();
          break;
        }

        case 'Enter': {
          event.preventDefault();
          setFocusedIndex((currentIndex) => {
            if (currentIndex >= 0 && currentIndex < itemCount && typeof onSelect === 'function') {
              onSelect(currentIndex);
            }
            return currentIndex;
          });
          break;
        }

        case 'Tab': {
          onClose();
          break;
        }

        case 'Home': {
          event.preventDefault();
          if (itemCount > 0) {
            setFocusedIndex(0);
          }
          break;
        }

        case 'End': {
          event.preventDefault();
          if (itemCount > 0) {
            setFocusedIndex(itemCount - 1);
          }
          break;
        }

        default:
          break;
      }
    },
    [isOpen, itemCount, onClose, onSelect],
  );

  return { focusedIndex, setFocusedIndex, handleKeyDown };
}