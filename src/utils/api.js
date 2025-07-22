// utils/api.js

/**
 * Simulates an API call to log in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - A promise that resolves with user data or rejects with an error.
 */
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        resolve({
          success: true,
          user: { id: 'user123', name: 'Prototype User', email: 'test@example.com' },
          token: 'mock-jwt-token-12345'
        });
      } else {
        reject({ success: false, message: 'Invalid credentials. Please try again.' });
      }
    }, 1000); // Simulate 1 second network delay
  });
};

/**
 * Simulates an API call to register a new user.
 * @param {object} userData - An object containing user registration data (name, email, password).
 * @returns {Promise<object>} - A promise that resolves with success message or rejects with an error.
 */
export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email === 'existing@example.com') { // Simulate existing user
        reject({ success: false, message: 'Email already registered.' });
      } else if (userData.email.includes('@')) { // Basic email format check for simulation
        // Simulate successful registration
        resolve({ success: true, message: 'Registration successful! Please login.' });
      } else {
        reject({ success: false, message: 'Invalid user data provided.' });
      }
    }, 1500); // Simulate 1.5 seconds network delay
  });
};

/**
 * Simulates sending an OTP to the user's email for password reset.
 * @param {string} email - The user's email.
 * @returns {Promise<object>} - A promise that resolves with success message or rejects with an error.
 */
export const sendOtpForPasswordReset = async (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes('@')) {
        console.log(`[API Mock] OTP sent to ${email}`);
        resolve({ success: true, message: 'OTP sent to your email.' });
      } else {
        reject({ success: false, message: 'Please provide a valid email address.' });
      }
    }, 800);
  });
};

/**
 * Simulates resetting the user's password with OTP verification.
 * @param {string} email - The user's email.
 * @param {string} otp - The one-time password.
 * @param {string} newPassword - The new password.
 * @returns {Promise<object>} - A promise that resolves with success message or rejects with an error.
 */
export const resetPassword = async (email, otp, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === '123456' && newPassword.length >= 6) { // Mock OTP and password length check
        console.log(`[API Mock] Password reset for ${email}`);
        resolve({ success: true, message: 'Password reset successfully!' });
      } else if (otp !== '123456') {
        reject({ success: false, message: 'Invalid OTP.' });
      } else {
        reject({ success: false, message: 'New password is too short.' });
      }
    }, 1200);
  });
};

/**
 * Simulates capturing data to a Google Sheet via a backend endpoint.
 * In a real application, this would be a fetch to your own server,
 * which then handles the Google Sheets API interaction.
 * @param {object} data - The data to capture (e.g., { email, action: 'signup' }).
 * @returns {Promise<object>} - A promise that resolves with success message or rejects with an error.
 */
export const captureDataToGoogleSheet = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data && data.email && data.action) {
        console.log(`[API Mock] Data for Google Sheet: ${JSON.stringify(data)}`);
        resolve({ success: true, message: 'Data sent for capture.' });
      } else {
        reject({ success: false, message: 'Invalid data for capture.' });
      }
    }, 700);
  });
};

// You can add more API mock functions here for fetching products, categories, etc.
// For instance:
export const fetchProductsByCategory = async (categorySlug) => {
  // In a real app, this would fetch from a database
  // For now, it will return from your local mock data
  const { productsData } = await import('../data/products'); // Dynamic import to avoid circular dependency
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = productsData.filter(p => p.categorySlug === categorySlug);
      resolve({ success: true, data: filtered });
    }, 500);
  });
};

export const fetchProductById = async (productId) => {
  const { productsData } = await import('../data/products');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = productsData.find(p => p.id === productId);
      if (product) {
        resolve({ success: true, data: product });
      } else {
        reject({ success: false, message: 'Product not found.' });
      }
    }, 500);
  });
};