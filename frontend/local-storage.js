/**
 * Local Storage Utilities for EcoGrid AI
 * Provides browser localStorage-based data storage for guest users
 */

const STORAGE_KEYS = {
  USER_MODE: 'ecogrid_user_mode', // 'guest' or 'logged_in'
  USER_DATA: 'ecogrid_user_data',
  SYSTEM_CONFIG: 'ecogrid_system_config',
  API_KEYS: 'ecogrid_api_keys',
  USER_PREFERENCES: 'ecogrid_user_preferences',
  FORECAST_DATA: 'ecogrid_forecast_data'
};

/**
 * Get current user mode
 * @returns {string} 'guest' or 'logged_in'
 */
function getUserMode() {
  return localStorage.getItem(STORAGE_KEYS.USER_MODE) || 'guest';
}

/**
 * Set user mode
 * @param {string} mode - 'guest' or 'logged_in'
 */
function setUserMode(mode) {
  localStorage.setItem(STORAGE_KEYS.USER_MODE, mode);
}

/**
 * Check if user is guest
 * @returns {boolean}
 */
function isGuestUser() {
  return getUserMode() === 'guest';
}

/**
 * Get user data
 * @returns {object|null}
 */
function getUserData() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
}

/**
 * Set user data
 * @param {object} data
 */
function setUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving user data:', e);
  }
}

/**
 * Get system configuration
 * @returns {object|null}
 */
function getSystemConfig() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SYSTEM_CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error parsing system config:', e);
    return null;
  }
}

/**
 * Set system configuration
 * @param {object} config
 */
function setSystemConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEYS.SYSTEM_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving system config:', e);
  }
}

/**
 * Get API keys
 * @returns {object|null}
 */
function getApiKeys() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.API_KEYS);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error parsing API keys:', e);
    return null;
  }
}

/**
 * Set API keys
 * @param {object} keys
 */
function setApiKeys(keys) {
  try {
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
  } catch (e) {
    console.error('Error saving API keys:', e);
  }
}

/**
 * Get user preferences
 * @returns {object|null}
 */
function getUserPreferences() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error parsing user preferences:', e);
    return null;
  }
}

/**
 * Set user preferences
 * @param {object} preferences
 */
function setUserPreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (e) {
    console.error('Error saving user preferences:', e);
  }
}

/**
 * Get forecast data
 * @returns {object|null}
 */
function getForecastData() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FORECAST_DATA);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error parsing forecast data:', e);
    return null;
  }
}

/**
 * Set forecast data
 * @param {object} data
 */
function setForecastData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.FORECAST_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving forecast data:', e);
  }
}

/**
 * Clear all local storage data
 */
function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Clear guest-specific data (keep API keys if logged in)
 */
function clearGuestData() {
  localStorage.removeItem(STORAGE_KEYS.USER_MODE);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.SYSTEM_CONFIG);
  localStorage.removeItem(STORAGE_KEYS.FORECAST_DATA);
}

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get localStorage usage info
 * @returns {object}
 */
function getStorageInfo() {
  if (!isLocalStorageAvailable()) {
    return { available: false, used: 0, total: 0, percentage: 0 };
  }

  let used = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length + key.length;
    }
  }

  // Typical localStorage limit is 5-10MB
  const total = 5 * 1024 * 1024; // 5MB
  const percentage = (used / total) * 100;

  return {
    available: true,
    used: used,
    total: total,
    percentage: percentage.toFixed(2)
  };
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getUserMode,
    setUserMode,
    isGuestUser,
    getUserData,
    setUserData,
    getSystemConfig,
    setSystemConfig,
    getApiKeys,
    setApiKeys,
    getUserPreferences,
    setUserPreferences,
    getForecastData,
    setForecastData,
    clearAllData,
    clearGuestData,
    isLocalStorageAvailable,
    getStorageInfo,
    STORAGE_KEYS
  };
}
