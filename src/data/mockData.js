import { MENU_ITEMS, MENU_VERSION } from '../constants.js';

export const mockUser = {
  id: 'usr-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  initials: 'JD',
};

export const mockSession = {
  token: 'mock-session-token-abc123',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockMenuData = {
  version: MENU_VERSION,
  menuItems: MENU_ITEMS.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    route: item.route,
  })),
};

/**
 * Simulates an async fetch of menu data.
 * @param {{ shouldFail?: boolean }} options
 * @returns {Promise<{ version: string, menuItems: Array<{ key: string, label: string, icon: string, route: string }> }>}
 */
export function fetchMockMenuData(options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.shouldFail) {
        reject(new Error('Unable to load menu. Please try again.'));
        return;
      }
      resolve(mockMenuData);
    }, 100);
  });
}

/**
 * Simulates an async fetch of user session data.
 * @param {{ shouldFail?: boolean }} options
 * @returns {Promise<{ user: object, session: object }>}
 */
export function fetchMockSession(options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.shouldFail) {
        reject(new Error('Session expired. Please log in again.'));
        return;
      }
      resolve({ user: mockUser, session: mockSession });
    }, 100);
  });
}