/**
 * @param {number} amount 
 * @param {string} currency 
 * @param {string} locale 
 * @returns {string} 
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * @param {string} str
 * @returns {string}
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param {string} email 
 * @returns {boolean} 
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * @param {string} password 
 * @param {number} minLength \
 * @returns {boolean} 
 */
export const isPasswordStrongEnough = (password, minLength = 6) => {
  return password.length >= minLength;
};

/**
 * @param {function} func 
 * @param {number} delay
 * @returns {function}
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
 * @returns {string}
 */
export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};