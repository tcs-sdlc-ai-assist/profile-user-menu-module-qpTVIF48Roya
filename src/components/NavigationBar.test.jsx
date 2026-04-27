import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar.jsx';
import { MenuContextProvider } from '../context/MenuContext.jsx';
import { NAVIGATION_ITEMS } from '../constants.js';

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

function renderNavigationBar(initialRoute = '/accounts') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MenuContextProvider>
        <NavigationBar />
      </MenuContextProvider>
    </MemoryRouter>,
  );
}

describe('NavigationBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all navigation items in correct order', async () => {
    renderNavigationBar();

    await waitFor(() => {
      NAVIGATION_ITEMS.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    const links = within(nav).getAllByRole('link');

    const navLinkLabels = links
      .map((link) => link.textContent)
      .filter((text) => NAVIGATION_ITEMS.some((item) => item.label === text));

    NAVIGATION_ITEMS.forEach((item, index) => {
      expect(navLinkLabels[index]).toBe(item.label);
    });
  });

  it('renders the ARIA navigation landmark with correct label', () => {
    renderNavigationBar();

    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Primary navigation');
  });

  it('renders the profile button on the right side', () => {
    renderNavigationBar();

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveAttribute('aria-haspopup', 'true');
    expect(profileButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('highlights the active navigation item based on current route', () => {
    renderNavigationBar('/accounts');

    const accountsLink = screen.getByText('Accounts').closest('a');
    expect(accountsLink).toHaveAttribute('aria-current', 'page');

    const holdingsLink = screen.getByText('Holdings').closest('a');
    expect(holdingsLink).not.toHaveAttribute('aria-current');
  });

  it('highlights Holdings when on /holdings route', () => {
    renderNavigationBar('/holdings');

    const holdingsLink = screen.getByText('Holdings').closest('a');
    expect(holdingsLink).toHaveAttribute('aria-current', 'page');

    const accountsLink = screen.getByText('Accounts').closest('a');
    expect(accountsLink).not.toHaveAttribute('aria-current');
  });

  it('opens the profile menu when profile button is clicked', async () => {
    const user = userEvent.setup();
    renderNavigationBar();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
    });

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });
    expect(profileButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(profileButton);

    expect(profileButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
  });

  it('closes the profile menu when profile button is clicked again', async () => {
    const user = userEvent.setup();
    renderNavigationBar();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
    });

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });

    await user.click(profileButton);
    expect(profileButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();

    await user.click(profileButton);
    expect(profileButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu', { name: 'User menu' })).not.toBeInTheDocument();
  });

  it('renders user initials in the profile button when no avatar is set', () => {
    renderNavigationBar();

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });
    expect(within(profileButton).getByText('JD')).toBeInTheDocument();
  });

  it('renders inside a header element', () => {
    renderNavigationBar();

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = within(header).getByRole('navigation', { name: 'Primary navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders all five navigation items', () => {
    renderNavigationBar();

    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Holdings')).toBeInTheDocument();
    expect(screen.getByText('Activity')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Products & Services')).toBeInTheDocument();
  });

  it('navigation links point to correct routes', () => {
    renderNavigationBar();

    NAVIGATION_ITEMS.forEach((item) => {
      const link = screen.getByText(item.label).closest('a');
      expect(link).toHaveAttribute('href', item.route);
    });
  });

  it('profile button supports keyboard activation with Enter', async () => {
    const user = userEvent.setup();
    renderNavigationBar();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
    });

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });
    profileButton.focus();

    await user.keyboard('{Enter}');

    expect(profileButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
  });

  it('profile button supports keyboard activation with Space', async () => {
    const user = userEvent.setup();
    renderNavigationBar();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open user menu' })).toBeInTheDocument();
    });

    const profileButton = screen.getByRole('button', { name: 'Open user menu' });
    profileButton.focus();

    await user.keyboard(' ');

    expect(profileButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'User menu' })).toBeInTheDocument();
  });
});