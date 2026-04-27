import { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Landmark,
  Users,
  Calculator,
  LogOut,
} from 'lucide-react';
import styles from './MenuItem.module.css';

const ICON_MAP = {
  user: User,
  mail: Mail,
  lock: Lock,
  landmark: Landmark,
  bank: Landmark,
  users: Users,
  calculator: Calculator,
  'log-out': LogOut,
  logout: LogOut,
};

const ICON_SIZE = 18;

/**
 * Resolves an icon string key to a lucide-react icon component.
 * @param {string} iconKey - The icon identifier string.
 * @returns {import('react').ElementType | null} The icon component or null.
 */
function resolveIcon(iconKey) {
  if (!iconKey || typeof iconKey !== 'string') {
    return null;
  }
  return ICON_MAP[iconKey.toLowerCase()] || null;
}

/**
 * MenuItem component renders a single navigation menu item with an icon,
 * label, and appropriate ARIA attributes. Uses React Router NavLink for
 * client-side navigation.
 *
 * @param {object} props
 * @param {string} props.icon - Icon key string mapped to a lucide-react icon.
 * @param {string} props.label - Display text for the menu item.
 * @param {string} props.route - Route path for navigation.
 * @param {function} [props.onClick] - Optional click handler.
 * @param {boolean} [props.isActive] - Whether this item is currently active.
 * @param {boolean} [props.isFocused] - Whether this item is currently focused via keyboard.
 * @param {number} [props.tabIndex] - Tab index for keyboard navigation.
 * @param {import('react').Ref<HTMLAnchorElement>} ref - Forwarded ref.
 * @returns {import('react').ReactElement}
 */
const MenuItem = forwardRef(function MenuItem(
  { icon, label, route, onClick, isActive, isFocused, tabIndex },
  ref,
) {
  const IconComponent = resolveIcon(icon);

  const handleClick = useCallback(
    (event) => {
      if (typeof onClick === 'function') {
        onClick(event, route);
      }
    },
    [onClick, route],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (typeof onClick === 'function') {
          onClick(event, route);
        }
      }
    },
    [onClick, route],
  );

  return (
    <NavLink
      ref={ref}
      to={route}
      role="menuitem"
      tabIndex={tabIndex !== undefined ? tabIndex : -1}
      className={({ isActive: navIsActive }) => {
        const active = isActive !== undefined ? isActive : navIsActive;
        const classNames = [styles.menuItem];
        if (active) {
          classNames.push(styles.active);
        }
        if (isFocused) {
          classNames.push(styles.focused);
        }
        return classNames.join(' ');
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        {IconComponent ? (
          <IconComponent size={ICON_SIZE} strokeWidth={2} />
        ) : null}
      </span>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.number,
};

MenuItem.defaultProps = {
  icon: null,
  onClick: null,
  isActive: undefined,
  isFocused: false,
  tabIndex: -1,
};

export { MenuItem };
export default MenuItem;