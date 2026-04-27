import { STORAGE_KEYS } from '../constants.js';
import { getItem, setItem, removeItem, clearAll } from './storage.js';
import logger from './logger.js';
import { mockUser, mockSession } from '../data/mockData.js';

/**
 * Checks whether the current user has a valid authenticated session in storage.
 * @returns {boolean} True if a non-expired session exists, false otherwise.
 */
export function isAuthenticated() {
  try {
    const session = getItem(STORAGE_KEYS.SESSION);
    const user = getItem(STORAGE_KEYS.USER);

    if (!session || !user) {
      return false;
    }

    if (!session.token || !session.expiresAt) {
      return false;
    }

    const expiresAt = new Date(session.expiresAt);
    if (isNaN(expiresAt.getTime())) {
      logger.warn('Invalid session expiration date found in storage.');
      return false;
    }

    if (expiresAt <= new Date()) {
      logger.info('Session has expired.');
      clearSession();
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error checking authentication status.', error);
    return false;
  }
}

/**
 * Stores mock user and session data into storage, simulating a login action.
 * @returns {boolean} Whether the login operation succeeded.
 */
export function login() {
  try {
    const userStored = setItem(STORAGE_KEYS.USER, mockUser);
    const sessionStored = setItem(STORAGE_KEYS.SESSION, mockSession);

    if (!userStored || !sessionStored) {
      logger.error('Failed to store session data during login.');
      return false;
    }

    logger.info('User logged in successfully.', { userId: mockUser.id });
    return true;
  } catch (error) {
    logger.error('Error during login.', error);
    return false;
  }
}

/**
 * Clears user and session data from storage, simulating a logout action.
 * @returns {boolean} Whether the logout operation succeeded.
 */
export function logout() {
  try {
    const cleared = clearAll();

    if (!cleared) {
      logger.error('Failed to clear session data during logout.');
      return false;
    }

    logger.info('User logged out successfully.');
    return true;
  } catch (error) {
    logger.error('Error during logout.', error);
    return false;
  }
}

/**
 * Retrieves the current user object from storage.
 * @returns {{ id: string, name: string, email: string, avatar: string|null, initials: string } | null} The user object or null.
 */
export function getCurrentUser() {
  try {
    if (!isAuthenticated()) {
      return null;
    }
    return getItem(STORAGE_KEYS.USER);
  } catch (error) {
    logger.error('Error retrieving current user.', error);
    return null;
  }
}

/**
 * Retrieves the current session object from storage.
 * @returns {{ token: string, expiresAt: string } | null} The session object or null.
 */
export function getSession() {
  try {
    if (!isAuthenticated()) {
      return null;
    }
    return getItem(STORAGE_KEYS.SESSION);
  } catch (error) {
    logger.error('Error retrieving session.', error);
    return null;
  }
}

/**
 * Internal helper to clear session-related keys from storage.
 * @returns {void}
 */
function clearSession() {
  try {
    removeItem(STORAGE_KEYS.USER);
    removeItem(STORAGE_KEYS.SESSION);
  } catch (error) {
    logger.error('Error clearing session from storage.', error);
  }
}