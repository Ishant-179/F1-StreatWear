/**
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} 
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
    }, 1000);
  });
};

/**
 * @param {object} userData
 * @returns {Promise<object>} 
 */
export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email === 'existing@example.com') { 
        reject({ success: false, message: 'Email already registered.' });
      } else if (userData.email.includes('@')) { 
        resolve({ success: true, message: 'Registration successful! Please login.' });
      } else {
        reject({ success: false, message: 'Invalid user data provided.' });
      }
    }, 1500);
  });
};

/**
 * @param {string} email 
 * @returns {Promise<object>}
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
 * @param {string} email
 * @param {string} otp 
 * @param {string} newPassword
 * @returns {Promise<object>}
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
 * @param {object} data 
 * @returns {Promise<object>} 
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

export const fetchProductsByCategory = async (categorySlug) => {
  const { productsData } = await import('../data/products');
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