import { useCallback, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useMenu } from '../context/MenuContext.jsx';
import { NAVIGATION_ITEMS } from '../constants.js';
import ProfileMenu from './ProfileMenu.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import styles from './NavigationBar.module.css';

/**
 * NavigationBar component renders the top navigation bar with primary
 * navigation items and a profile icon button that triggers the ProfileMenu.
 * Supports ARIA navigation landmark, active state highlighting via
 * React Router NavLink, and responsive layout.
 *
 * @returns {import('react').ReactElement}
 */
function NavigationBar() {
  const { isMenuOpen, toggleMenu, user } = useMenu();
  const location = useLocation();
  const profileButtonRef = useRef(null);

  const handleProfileClick = useCallback(() => {
    toggleMenu();
  }, [toggleMenu]);

  const handleProfileKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
      }
    },
    [toggleMenu],
  );

  const initials = user && user.initials ? user.initials : 'U';

  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className={styles.navItems}>
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.route}
              className={({ isActive }) => {
                const classNames = [styles.navLink];
                if (isActive) {
                  classNames.push(styles.navLinkActive);
                }
                return classNames.join(' ');
              }}
              aria-current={location.pathname === item.route ? 'page' : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.profileSection}>
          <button
            ref={profileButtonRef}
            type="button"
            className={styles.profileButton}
            onClick={handleProfileClick}
            onKeyDown={handleProfileKeyDown}
            aria-label="Open user menu"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            {user && user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className={styles.profileAvatar}
                aria-hidden="true"
              />
            ) : (
              <span className={styles.profileInitials} aria-hidden="true">
                {initials}
              </span>
            )}
            <User size={18} className={styles.profileIcon} aria-hidden="true" />
          </button>

          <ErrorBoundary message="Unable to load menu. Please try again.">
            <ProfileMenu />
          </ErrorBoundary>
        </div>
      </nav>
    </header>
  );
}

NavigationBar.displayName = 'NavigationBar';

export { NavigationBar };
export default NavigationBar;