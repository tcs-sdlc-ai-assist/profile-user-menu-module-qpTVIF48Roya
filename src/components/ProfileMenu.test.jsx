import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProfileMenu from './ProfileMenu.jsx';
import { MenuContextProvider } from '../context/MenuContext.jsx';
import NavigationBar from './NavigationBar.jsx';

vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    generateCorrelationId: vi.fn(() => 'test-correlation-id'),
  },
}));

vi.mock('../utils/auth.js', () => ({
  isAuthenticated: vi.fn(() => true),
  getCurrentUser: vi.fn(() => ({
    id: 'usr-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    initials: 'JD',
  })),
  logout: vi.fn(() => true),
}));

const mockMenuItems = [
  { key: 'profile', label: 'Profile', icon: 'user', route: '/profile' },
  { key: 'commPrefs', label: 'Communication Preferences', icon: 'mail', route: '/comm-preferences' },
  { key: 'security', label: 'Security', icon: 'lock', route: '/security' },
  { key: 'bankMgmt', label: 'Bank Management', icon: 'landmark', route: '/bank-management' },
  { key: 'beneficiaries', label: 'Beneficiaries', icon: 'users', route: '/beneficiaries' },
  { key: 'costBasis', label: 'Cost Basis', icon: 'calculator', route: '/cost-basis' },
  { key: 'logout', label: 'Logout', icon: 'log-out', route: '/logout' },
];

vi.mock('../data/mockData.js', () => ({
  fetchMockMenuData: vi.fn(() =>
    Promise.resolve({
      version: '1.0.0',
      menuItems: [
        { key: 'profile', label: 'Profile', icon: 'user', route: '/profile' },
        { key: 'commPrefs', label: 'Communication Preferences', icon: 'mail', route: '/comm-preferences' },
        { key: 'security', label: 'Security', icon: 'lock', route: '/security' },
        { key: 'bankMgmt', label: 'Bank Management', icon: 'landmark', route: '/bank-management' },
        { key: 'beneficiaries', label: 'Beneficiaries', icon: 'users', route: '/beneficiaries' },
        { key: 'costBasis', label: 'Cost Basis', icon: 'calculator', route: '/cost-basis' },
        { key: 'logout', label: 'Logout', icon: 'log-out', route: '/logout' },
      ],
    }),
  ),
  mockUser: {
    id: 'usr-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    initials: 'JD',
  },
  mockSession: {
    token: 'mock-session-token-abc123',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
}));

function renderWithNavigationBar(initialRoute = '/accounts') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MenuContextProvider>
        <NavigationBar />
      </MenuContextProvider>
    </MemoryRouter>,
  );
}

async function openProfileMenu(user) {
  const profileButton = screen.getByRole('button', { name: 'Open user menu' });
  await user.click(profileButton);
  await waitFor(() => {
    expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
  });
}

describe('ProfileMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Opening and Closing', () => {
    it('does not render the menu when closed', async () => {
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
    });

    it('renders the menu when profile button is clicked', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(menu).toBeInTheDocument();
    });

    it('closes the menu when profile button is clicked again', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);
      expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });
      await user.click(profileButton);

      expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
    });

    it('closes the menu when clicking outside', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);
      expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();

      await user.click(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
      });
    });
  });

  describe('Menu Items', () => {
    it('renders all menu items in correct order', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const menuItems = within(menu).getAllByRole('menuitem');

      expect(menuItems).toHaveLength(mockMenuItems.length);

      mockMenuItems.forEach((item, index) => {
        expect(menuItems[index]).toHaveTextContent(item.label);
      });
    });

    it('renders Profile menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Profile')).toBeInTheDocument();
    });

    it('renders Communication Preferences menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Communication Preferences')).toBeInTheDocument();
    });

    it('renders Security menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Security')).toBeInTheDocument();
    });

    it('renders Bank Management menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Bank Management')).toBeInTheDocument();
    });

    it('renders Beneficiaries menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Beneficiaries')).toBeInTheDocument();
    });

    it('renders Cost Basis menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Cost Basis')).toBeInTheDocument();
    });

    it('renders Logout menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('Logout')).toBeInTheDocument();
    });

    it('renders menu items with icons (icon wrappers present)', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const menuItems = within(menu).getAllByRole('menuitem');

      menuItems.forEach((menuItem) => {
        const iconWrapper = menuItem.querySelector('[aria-hidden="true"]');
        expect(iconWrapper).toBeInTheDocument();
      });
    });

    it('displays user name in the menu header', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('ARIA Roles and Accessibility', () => {
    it('has role="menu" on the menu container', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(menu).toHaveAttribute('role', 'menu');
    });

    it('has aria-label="User menu" on the menu container', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(menu).toHaveAttribute('aria-label', 'User menu');
    });

    it('has role="menuitem" on each menu item', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const menuItems = within(menu).getAllByRole('menuitem');

      expect(menuItems).toHaveLength(mockMenuItems.length);
      menuItems.forEach((item) => {
        expect(item).toHaveAttribute('role', 'menuitem');
      });
    });

    it('sets aria-expanded to true on profile button when menu is open', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });
      expect(profileButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(profileButton);

      await waitFor(() => {
        expect(profileButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('sets aria-expanded to false on profile button when menu is closed', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });

      await user.click(profileButton);
      await waitFor(() => {
        expect(profileButton).toHaveAttribute('aria-expanded', 'true');
      });

      await user.click(profileButton);
      await waitFor(() => {
        expect(profileButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('profile button has aria-haspopup="true"', () => {
      renderWithNavigationBar();

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });
      expect(profileButton).toHaveAttribute('aria-haspopup', 'true');
    });

    it('highlights active menu item with aria-current="page"', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar('/profile');

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const profileLink = within(menu).getByText('Profile').closest('a');
      expect(profileLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes the menu when Escape key is pressed', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);
      expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
      });
    });

    it('navigates down through menu items with ArrowDown key', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[0]).toHaveAttribute('tabindex', '0');
      });
    });

    it('navigates up through menu items with ArrowUp key', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      await user.keyboard('{ArrowUp}');

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[menuItems.length - 1]).toHaveAttribute('tabindex', '0');
      });
    });

    it('wraps focus from last item to first with ArrowDown', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      // Navigate to last item
      for (let i = 0; i < mockMenuItems.length; i++) {
        await user.keyboard('{ArrowDown}');
      }

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[0]).toHaveAttribute('tabindex', '0');
      });
    });

    it('wraps focus from first item to last with ArrowUp', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      // Go down to first item, then up to wrap
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowUp}');

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[menuItems.length - 1]).toHaveAttribute('tabindex', '0');
      });
    });

    it('focuses first item with Home key', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      // Navigate down a few items first
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      await user.keyboard('{Home}');

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[0]).toHaveAttribute('tabindex', '0');
      });
    });

    it('focuses last item with End key', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      await user.keyboard('{End}');

      await waitFor(() => {
        const menuItems = within(menu).getAllByRole('menuitem');
        expect(menuItems[menuItems.length - 1]).toHaveAttribute('tabindex', '0');
      });
    });

    it('closes the menu on Tab key', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      menu.focus();

      await user.keyboard('{Tab}');

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
      });
    });
  });

  describe('Menu Item Selection', () => {
    it('closes the menu when a non-logout menu item is clicked', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const profileItem = within(menu).getByText('Profile');

      await user.click(profileItem);

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
      });
    });

    it('menu items have correct route links', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });

      mockMenuItems.forEach((item) => {
        const link = within(menu).getByText(item.label).closest('a');
        expect(link).toHaveAttribute('href', item.route);
      });
    });
  });

  describe('Logout Functionality', () => {
    it('calls logout when Logout menu item is clicked', async () => {
      const user = userEvent.setup();
      const { logout } = await import('../utils/auth.js');

      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const logoutItem = within(menu).getByText('Logout');

      await user.click(logoutItem);

      expect(logout).toHaveBeenCalled();
    });

    it('closes the menu after logout', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      const logoutItem = within(menu).getByText('Logout');

      await user.click(logoutItem);

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading state while menu data is being fetched', async () => {
      const { fetchMockMenuData } = await import('../data/mockData.js');
      let resolvePromise;
      fetchMockMenuData.mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          }),
      );

      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/accounts']}>
          <MenuContextProvider>
            <NavigationBar />
          </MenuContextProvider>
        </MemoryRouter>,
      );

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
      });

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByRole('status')).toBeInTheDocument();

      resolvePromise({
        version: '1.0.0',
        menuItems: mockMenuItems,
      });

      await waitFor(() => {
        expect(within(menu).queryByRole('status')).not.toBeInTheDocument();
      });
    });

    it('shows error state when menu data fails to load', async () => {
      const { fetchMockMenuData } = await import('../data/mockData.js');
      fetchMockMenuData.mockRejectedValueOnce(new Error('Unable to load menu. Please try again.'));

      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/accounts']}>
          <MenuContextProvider>
            <NavigationBar />
          </MenuContextProvider>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      const profileButton = screen.getByRole('button', { name: 'Open user menu' });
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
      });

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(within(menu).getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders as dropdown panel on desktop by default', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(menu).toBeInTheDocument();
      // On desktop (default jsdom), no overlay should be present
      expect(menu.closest('[aria-hidden="false"]')).not.toBeInTheDocument();
    });

    it('renders menu with correct structure on desktop', async () => {
      const user = userEvent.setup();
      renderWithNavigationBar();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
      });

      await openProfileMenu(user);

      const menu = screen.getByRole('menu', { name: 'User menu' });
      expect(menu).toBeInTheDocument();

      // Should not have a close button on desktop
      expect(within(menu).queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
    });
  });
});