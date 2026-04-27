import { STORAGE_KEYS } from '../constants.js';

/**
 * Checks if a given storage mechanism is available.
 * @param {Storage} storage - The storage object to test (localStorage or sessionStorage).
 * @returns {boolean} Whether the storage is available.
 */
function isStorageAvailable(storage) {
  const testKey = '__storage_test__';
  try {
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the best available storage mechanism.
 * Prefers localStorage, falls back to sessionStorage, or returns null if neither is available.
 * @returns {Storage | null}
 */
function getStorage() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (isStorageAvailable(window.localStorage)) {
    return window.localStorage;
  }
  if (isStorageAvailable(window.sessionStorage)) {
    return window.sessionStorage;
  }
  return null;
}

/**
 * Retrieves a parsed JSON value from storage by key.
 * @param {string} key - The storage key to retrieve.
 * @returns {*} The parsed value, or null if not found or on error.
 */
export function getItem(key) {
  try {
    const storage = getStorage();
    if (!storage) {
      return null;
    }
    const value = storage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error reading key "${key}" from storage:`, error);
    return null;
  }
}

/**
 * Stores a JSON-serializable value in storage under the given key.
 * @param {string} key - The storage key.
 * @param {*} value - The value to store (will be JSON-stringified).
 * @returns {boolean} Whether the operation succeeded.
 */
export function setItem(key, value) {
  try {
    const storage = getStorage();
    if (!storage) {
      console.error(`Storage is unavailable. Cannot set key "${key}".`);
      return false;
    }
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting key "${key}" in storage:`, error);
    return false;
  }
}

/**
 * Removes a value from storage by key.
 * @param {string} key - The storage key to remove.
 * @returns {boolean} Whether the operation succeeded.
 */
export function removeItem(key) {
  try {
    const storage = getStorage();
    if (!storage) {
      console.error(`Storage is unavailable. Cannot remove key "${key}".`);
      return false;
    }
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from storage:`, error);
    return false;
  }
}

/**
 * Clears all invest portal keys from storage.
 * @returns {boolean} Whether the operation succeeded.
 */
export function clearAll() {
  try {
    const storage = getStorage();
    if (!storage) {
      console.error('Storage is unavailable. Cannot clear keys.');
      return false;
    }
    Object.values(STORAGE_KEYS).forEach((key) => {
      storage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing storage keys:', error);
    return false;
  }
}