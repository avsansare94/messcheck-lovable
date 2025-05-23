/**
 * Utility to safely check if localStorage is available
 * This helps detect issues in environments where localStorage might be blocked
 */
export function isLocalStorageAvailable() {
  try {
    const testKey = "__storage_test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Safely get an item from localStorage with error handling
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error(`Error getting ${key} from localStorage:`, e)
    return null
  }
}

/**
 * Safely set an item in localStorage with error handling
 */
export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(`Error setting ${key} in localStorage:`, e)
    return false
  }
}

/**
 * Safely remove an item from localStorage with error handling
 */
export function safeRemoveItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error(`Error removing ${key} from localStorage:`, e)
    return false
  }
}
