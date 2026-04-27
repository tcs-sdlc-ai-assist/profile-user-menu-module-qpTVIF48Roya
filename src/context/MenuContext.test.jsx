import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MenuContextProvider, useMenu } from './MenuContext.jsx';

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

const mockMenuData = {
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
};

vi.mock('../data/mockData.js', () => ({
  fetchMockMenuData: vi.fn(() => Promise.resolve({
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
  })),
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

function TestConsumer() {
  const {
    isMenuOpen,
    menuItems,
    menuLoading,
    menuError,
    user,
    openMenu,
    closeMenu,
    toggleMenu,
    handleLogout,
  } = useMenu();

  return (
    <div>
      <span data-testid="is-menu-open">{String(isMenuOpen)}</span>
      <span data-testid="menu-loading">{String(menuLoading)}</span>
      <span data-testid="menu-error">{menuError || 'none'}</span>
      <span data-testid="menu-items-count">{menuItems ? menuItems.length : 0}</span>
      <span data-testid="user-name">{user ? user.name : 'no-user'}</span>
      <button data-testid="open-menu" onClick={openMenu}>Open</button>
      <button data-testid="close-menu" onClick={closeMenu}>Close</button>
      <button data-testid="toggle-menu" onClick={toggleMenu}>Toggle</button>
      <button data-testid="logout" onClick={handleLogout}>Logout</button>
      {menuItems && menuItems.map((item) => (
        <span key={item.key} data-testid={`menu-item-${item.key}`}>{item.label}</span>
      ))}
    </div>
  );
}

function renderWithProvider() {
  return render(
    <MemoryRouter>
      <MenuContextProvider>
        <TestConsumer />
      </MenuContextProvider>
    </MemoryRouter>,
  );
}

describe('MenuContextProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides initial closed menu state', async () => {
    renderWithProvider();

    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });
  });

  it('provides user data from authenticated session', async () => {
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
  });

  it('loads menu items from mock data', async () => {
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('menu-items-count')).toHaveTextContent('7');
    expect(screen.getByTestId('menu-item-profile')).toHaveTextContent('Profile');
    expect(screen.getByTestId('menu-item-logout')).toHaveTextContent('Logout');
  });

  it('toggles menu open and closed', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');

    await user.click(screen.getByTestId('toggle-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('true');

    await user.click(screen.getByTestId('toggle-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');
  });

  it('opens menu with openMenu and closes with closeMenu', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    await user.click(screen.getByTestId('open-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('true');

    await user.click(screen.getByTestId('close-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');
  });

  it('handles menu data loading error gracefully', async () => {
    const { fetchMockMenuData } = await import('../data/mockData.js');
    fetchMockMenuData.mockRejectedValueOnce(new Error('Unable to load menu. Please try again.'));

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('menu-error')).toHaveTextContent('Unable to load menu. Please try again.');
    // Falls back to default menu items
    expect(Number(screen.getByTestId('menu-items-count').textContent)).toBeGreaterThan(0);
  });

  it('handles logout by closing menu and clearing user', async () => {
    const user = userEvent.setup();
    const { logout } = await import('../utils/auth.js');

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    await user.click(screen.getByTestId('open-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('true');

    await user.click(screen.getByTestId('logout'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');
    expect(logout).toHaveBeenCalled();
  });

  it('does not open menu when user is not authenticated', async () => {
    const { isAuthenticated } = await import('../utils/auth.js');
    isAuthenticated.mockReturnValue(false);

    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    await user.click(screen.getByTestId('toggle-menu'));
    expect(screen.getByTestId('is-menu-open')).toHaveTextContent('false');
  });

  it('falls back to default menu items when data returns empty', async () => {
    const { fetchMockMenuData } = await import('../data/mockData.js');
    fetchMockMenuData.mockResolvedValueOnce({ version: '1.0.0', menuItems: [] });

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(Number(screen.getByTestId('menu-items-count').textContent)).toBeGreaterThan(0);
  });

  it('throws error when useMenu is used outside of MenuContextProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <MemoryRouter>
          <TestConsumer />
        </MemoryRouter>,
      );
    }).toThrow('useMenu must be used within a MenuContextProvider.');

    consoleError.mockRestore();
  });

  it('shows loading state while menu data is being fetched', () => {
    renderWithProvider();

    expect(screen.getByTestId('menu-loading')).toHaveTextContent('true');
  });

  it('provides no menu error on successful load', async () => {
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('menu-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('menu-error')).toHaveTextContent('none');
  });
});