import { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMenu } from '../context/MenuContext.jsx';
import { useClickOutside } from '../hooks/useClickOutside.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import MenuItem from './MenuItem.jsx';
import { ROUTES } from '../constants.js';
import logger from '../utils/logger.js';
import styles from './ProfileMenu.module.css';

/**
 * ProfileMenu component renders a dropdown (desktop) or slide-in panel (mobile)
 * containing user menu items. Supports keyboard navigation, click-outside-to-close,
 * ARIA roles, and responsive behavior.
 *
 * @returns {import('react').ReactElement|null}
 */
function ProfileMenu() {
  const {
    isMenuOpen,
    menuItems,
    menuLoading,
    menuError,
    user,
    closeMenu,
    handleLogout,
  } = useMenu();

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useClickOutside(menuRef, closeMenu, isMenuOpen);

  const handleSelect = useCallback(
    (index) => {
      if (!menuItems || index < 0 || index >= menuItems.length) {
        return;
      }
      const item = menuItems[index];
      if (!item) {
        return;
      }

      if (item.key === 'logout' || item.route === ROUTES.LOGOUT) {
        handleLogout();
        navigate(ROUTES.LOGIN);
        logger.info('User navigated to login after logout.');
        return;
      }

      closeMenu();
      navigate(item.route);
    },
    [menuItems, closeMenu, handleLogout, navigate],
  );

  const handleItemClick = useCallback(
    (event, route) => {
      const item = menuItems.find((mi) => mi.route === route);
      if (item && (item.key === 'logout' || item.route === ROUTES.LOGOUT)) {
        event.preventDefault();
        handleLogout();
        navigate(ROUTES.LOGIN);
        logger.info('User navigated to login after logout.');
        return;
      }

      closeMenu();
    },
    [menuItems, closeMenu, handleLogout, navigate],
  );

  const itemCount = menuItems ? menuItems.length : 0;

  const focusedIndexRef = useRef(-1);
  const [focusedIndex, setFocusedIndexInternal] = useStateRef(-1);

  function useStateRef(initial) {
    const { useState } = require('react');
    const [state, setState] = useState(initial);
    return [state, setState];
  }

  void 0; // consumed above

  useEffect(() => {
    if (!isMenuOpen) {
      setFocusedIndexInternal(-1);
      focusedIndexRef.current = -1;
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    if (focusedIndex >= 0 && focusedIndex < itemCount && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex, isMenuOpen, itemCount]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!isMenuOpen) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          setFocusedIndexInternal((prev) => {
            if (itemCount === 0) return -1;
            return prev < itemCount - 1 ? prev + 1 : 0;
          });
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          setFocusedIndexInternal((prev) => {
            if (itemCount === 0) return -1;
            return prev > 0 ? prev - 1 : itemCount - 1;
          });
          break;
        }

        case 'Escape': {
          event.preventDefault();
          closeMenu();
          break;
        }

        case 'Enter': {
          if (focusedIndex >= 0 && focusedIndex < itemCount) {
            event.preventDefault();
            handleSelect(focusedIndex);
          }
          break;
        }

        case ' ': {
          if (focusedIndex >= 0 && focusedIndex < itemCount) {
            event.preventDefault();
            handleSelect(focusedIndex);
          }
          break;
        }

        case 'Tab': {
          closeMenu();
          break;
        }

        case 'Home': {
          event.preventDefault();
          if (itemCount > 0) {
            setFocusedIndexInternal(0);
          }
          break;
        }

        case 'End': {
          event.preventDefault();
          if (itemCount > 0) {
            setFocusedIndexInternal(itemCount - 1);
          }
          break;
        }

        default:
          break;
      }
    },
    [isMenuOpen, itemCount, closeMenu, handleSelect, focusedIndex],
  );

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMenuOpen, isMobile]);

  if (!isMenuOpen) {
    return null;
  }

  const setItemRef = (index) => (el) => {
    itemRefs.current[index] = el;
  };

  const menuContent = (
    <div
      ref={menuRef}
      role="menu"
      aria-label="User menu"
      className={isMobile ? styles.slideInPanel : styles.dropdownPanel}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.menuHeader}>
        <span className={styles.menuTitle}>
          {user ? user.name : 'User'}
        </span>
        {isMobile && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}
      </div>

      {menuLoading && (
        <div className={styles.menuLoading} role="status">
          <span>Loading menu…</span>
        </div>
      )}

      {menuError && !menuLoading && (
        <div className={styles.menuError} role="alert">
          <span>{menuError}</span>
        </div>
      )}

      {!menuLoading && menuItems && menuItems.length > 0 && (
        <div className={styles.menuList}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.key}
              ref={setItemRef(index)}
              icon={item.icon}
              label={item.label}
              route={item.route}
              onClick={handleItemClick}
              isActive={location.pathname === item.route}
              isFocused={focusedIndex === index}
              tabIndex={focusedIndex === index ? 0 : -1}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className={styles.overlay} aria-hidden="false">
        {menuContent}
      </div>
    );
  }

  return menuContent;
}

ProfileMenu.displayName = 'ProfileMenu';

export { ProfileMenu };
export default ProfileMenu;