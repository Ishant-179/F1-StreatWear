// utils/helpers.js

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR').
 * @param {string} locale - The locale string (e.g., 'en-US').
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Validates if a string is a valid email format (basic check).
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
  // A simple regex for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a password meets minimum length requirements.
 * @param {string} password - The password string to validate.
 * @param {number} minLength - The minimum required length.
 * @returns {boolean} True if the password meets the minimum length, false otherwise.
 */
export const isPasswordStrongEnough = (password, minLength = 6) => {
  return password.length >= minLength;
};

/**
 * Debounces a function, so it's only called after a certain delay.
 * Useful for search inputs or other frequent events.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} The debounced function.
 */
export const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

/**
 * Generates a unique ID (very basic, for client-side mocks only).
 * In a real app, IDs should come from the backend or a robust UUID library.
 * @returns {string} A simple unique ID string.
 */
export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};