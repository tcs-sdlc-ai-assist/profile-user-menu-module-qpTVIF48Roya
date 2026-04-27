import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MenuItem from './MenuItem.jsx';

vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    generateCorrelationId: vi.fn(() => 'test-correlation-id'),
  },
}));

function renderMenuItem(props = {}, initialRoute = '/') {
  const defaultProps = {
    label: 'Profile',
    route: '/profile',
    icon: 'user',
    ...props,
  };

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <div role="menu">
        <MenuItem {...defaultProps} />
      </div>
    </MemoryRouter>,
  );
}

describe('MenuItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders the label text', () => {
      renderMenuItem({ label: 'Profile' });

      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('renders with role="menuitem"', () => {
      renderMenuItem({ label: 'Profile' });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toBeInTheDocument();
      expect(menuItem).toHaveAttribute('role', 'menuitem');
    });

    it('renders as a link with the correct route', () => {
      renderMenuItem({ label: 'Security', route: '/security' });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('href', '/security');
    });

    it('renders the icon wrapper with aria-hidden="true"', () => {
      renderMenuItem({ label: 'Profile', icon: 'user' });

      const menuItem = screen.getByRole('menuitem');
      const iconWrapper = menuItem.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('renders an icon when a valid icon key is provided', () => {
      renderMenuItem({ label: 'Profile', icon: 'user' });

      const menuItem = screen.getByRole('menuitem');
      const iconWrapper = menuItem.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
      // lucide-react renders an SVG element
      const svg = iconWrapper.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders icon wrapper without SVG when icon is null', () => {
      renderMenuItem({ label: 'Profile', icon: null });

      const menuItem = screen.getByRole('menuitem');
      const iconWrapper = menuItem.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
      const svg = iconWrapper.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('renders icon wrapper without SVG when icon key is invalid', () => {
      renderMenuItem({ label: 'Profile', icon: 'nonexistent-icon' });

      const menuItem = screen.getByRole('menuitem');
      const iconWrapper = menuItem.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
      const svg = iconWrapper.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('renders the label within the menu item', () => {
      renderMenuItem({ label: 'Communication Preferences' });

      const menuItem = screen.getByRole('menuitem');
      expect(within(menuItem).getByText('Communication Preferences')).toBeInTheDocument();
    });
  });

  describe('Icon Mapping', () => {
    it('renders user icon for "user" key', () => {
      renderMenuItem({ label: 'Profile', icon: 'user' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders mail icon for "mail" key', () => {
      renderMenuItem({ label: 'Communication Preferences', icon: 'mail' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders lock icon for "lock" key', () => {
      renderMenuItem({ label: 'Security', icon: 'lock' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders landmark icon for "landmark" key', () => {
      renderMenuItem({ label: 'Bank Management', icon: 'landmark' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders landmark icon for "bank" key', () => {
      renderMenuItem({ label: 'Bank Management', icon: 'bank' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders users icon for "users" key', () => {
      renderMenuItem({ label: 'Beneficiaries', icon: 'users' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders calculator icon for "calculator" key', () => {
      renderMenuItem({ label: 'Cost Basis', icon: 'calculator' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders log-out icon for "log-out" key', () => {
      renderMenuItem({ label: 'Logout', icon: 'log-out' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders log-out icon for "logout" key', () => {
      renderMenuItem({ label: 'Logout', icon: 'logout' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles case-insensitive icon keys', () => {
      renderMenuItem({ label: 'Profile', icon: 'User' });

      const menuItem = screen.getByRole('menuitem');
      const svg = menuItem.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('applies active class and aria-current="page" when isActive is true', () => {
      renderMenuItem({ label: 'Profile', route: '/profile', isActive: true });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('aria-current', 'page');
      expect(menuItem).toHaveClass('active');
    });

    it('does not apply aria-current when isActive is false', () => {
      renderMenuItem({ label: 'Profile', route: '/profile', isActive: false });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).not.toHaveAttribute('aria-current');
      expect(menuItem).not.toHaveClass('active');
    });

    it('does not apply aria-current when isActive is undefined and route does not match', () => {
      renderMenuItem({ label: 'Profile', route: '/profile', isActive: undefined }, '/accounts');

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).not.toHaveAttribute('aria-current');
    });

    it('applies active class when NavLink route matches current location', () => {
      renderMenuItem({ label: 'Profile', route: '/profile', isActive: undefined }, '/profile');

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('active');
    });
  });

  describe('Focused State', () => {
    it('applies focused class when isFocused is true', () => {
      renderMenuItem({ label: 'Profile', isFocused: true });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('focused');
    });

    it('does not apply focused class when isFocused is false', () => {
      renderMenuItem({ label: 'Profile', isFocused: false });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).not.toHaveClass('focused');
    });

    it('does not apply focused class by default', () => {
      renderMenuItem({ label: 'Profile' });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).not.toHaveClass('focused');
    });
  });

  describe('Tab Index', () => {
    it('sets tabIndex to -1 by default', () => {
      renderMenuItem({ label: 'Profile' });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('tabindex', '-1');
    });

    it('sets tabIndex to 0 when provided', () => {
      renderMenuItem({ label: 'Profile', tabIndex: 0 });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('tabindex', '0');
    });

    it('sets tabIndex to the provided value', () => {
      renderMenuItem({ label: 'Profile', tabIndex: -1 });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Click Handler', () => {
    it('calls onClick with event and route when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderMenuItem({ label: 'Profile', route: '/profile', onClick: handleClick });

      const menuItem = screen.getByRole('menuitem');
      await user.click(menuItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object), '/profile');
    });

    it('does not throw when onClick is not provided', async () => {
      const user = userEvent.setup();

      renderMenuItem({ label: 'Profile', route: '/profile', onClick: null });

      const menuItem = screen.getByRole('menuitem');
      await expect(user.click(menuItem)).resolves.not.toThrow();
    });

    it('calls onClick with correct route for different menu items', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderMenuItem({ label: 'Security', route: '/security', onClick: handleClick });

      const menuItem = screen.getByRole('menuitem');
      await user.click(menuItem);

      expect(handleClick).toHaveBeenCalledWith(expect.any(Object), '/security');
    });
  });

  describe('Keyboard Interaction', () => {
    it('calls onClick when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderMenuItem({ label: 'Profile', route: '/profile', onClick: handleClick, tabIndex: 0 });

      const menuItem = screen.getByRole('menuitem');
      menuItem.focus();

      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object), '/profile');
    });

    it('calls onClick when Space key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderMenuItem({ label: 'Profile', route: '/profile', onClick: handleClick, tabIndex: 0 });

      const menuItem = screen.getByRole('menuitem');
      menuItem.focus();

      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalled();
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object), '/profile');
    });

    it('does not throw on keyboard interaction when onClick is null', async () => {
      const user = userEvent.setup();

      renderMenuItem({ label: 'Profile', route: '/profile', onClick: null, tabIndex: 0 });

      const menuItem = screen.getByRole('menuitem');
      menuItem.focus();

      await expect(user.keyboard('{Enter}')).resolves.not.toThrow();
    });
  });

  describe('Combined States', () => {
    it('applies both active and focused classes when both are true', () => {
      renderMenuItem({ label: 'Profile', isActive: true, isFocused: true });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('active');
      expect(menuItem).toHaveClass('focused');
      expect(menuItem).toHaveAttribute('aria-current', 'page');
    });

    it('applies menuItem base class always', () => {
      renderMenuItem({ label: 'Profile' });

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('menuItem');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the underlying anchor element', () => {
      const ref = vi.fn();

      render(
        <MemoryRouter initialEntries={['/']}>
          <div role="menu">
            <MenuItem ref={ref} label="Profile" route="/profile" icon="user" />
          </div>
        </MemoryRouter>,
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('Display Name', () => {
    it('has the correct displayName', () => {
      expect(MenuItem.displayName).toBe('MenuItem');
    });
  });
});