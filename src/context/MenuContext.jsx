import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchMockMenuData } from '../data/mockData.js';
import { isAuthenticated, getCurrentUser, logout } from '../utils/auth.js';
import logger from '../utils/logger.js';
import { MENU_ITEMS } from '../constants.js';

const MenuContext = createContext(null);

/**
 * Custom hook to consume the MenuContext.
 * Throws if used outside of MenuContextProvider.
 * @returns {{ isMenuOpen: boolean, menuItems: Array, menuError: string|null, menuLoading: boolean, user: object|null, openMenu: function, closeMenu: function, toggleMenu: function, handleLogout: function }}
 */
export function useMenu() {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error('useMenu must be used within a MenuContextProvider.');
  }
  return context;
}

/**
 * Provides menu state (open/close, items, loading, error) and user session
 * to all descendant components via React context.
 *
 * @param {{ children: import('react').ReactNode }} props
 * @returns {import('react').ReactElement}
 */
export function MenuContextProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMenuData() {
      setMenuLoading(true);
      setMenuError(null);

      try {
        const data = await fetchMockMenuData();

        if (cancelled) {
          return;
        }

        if (data && Array.isArray(data.menuItems) && data.menuItems.length > 0) {
          setMenuItems(data.menuItems);
        } else {
          logger.warn('Menu data returned empty or invalid. Using default menu items.');
          setMenuItems(MENU_ITEMS);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Unable to load menu. Please try again.';
        logger.error('Failed to load menu data.', error);
        setMenuError(errorMessage);
        setMenuItems(MENU_ITEMS);
      } finally {
        if (!cancelled) {
          setMenuLoading(false);
        }
      }
    }

    loadMenuData();

    return () => {
      cancelled = true;
    };
  }, []);

  const openMenu = useCallback(() => {
    if (!isAuthenticated()) {
      logger.warn('Attempted to open menu without authenticated session.');
      setUser(null);
      return;
    }
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (!isAuthenticated()) {
      logger.warn('Attempted to toggle menu without authenticated session.');
      setUser(null);
      return;
    }
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    closeMenu();
    const success = logout();
    if (success) {
      setUser(null);
      logger.info('User logged out via menu.');
    } else {
      logger.error('Logout failed.');
    }
  }, [closeMenu]);

  const value = useMemo(
    () => ({
      isMenuOpen,
      menuItems,
      menuLoading,
      menuError,
      user,
      openMenu,
      closeMenu,
      toggleMenu,
      handleLogout,
    }),
    [isMenuOpen, menuItems, menuLoading, menuError, user, openMenu, closeMenu, toggleMenu, handleLogout],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

MenuContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MenuContext };
export default MenuContextProvider;