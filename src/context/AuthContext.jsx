// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, sendOtpForPasswordReset, resetPassword } from '../utils/api'; // Mock API calls

// Create the Auth Context
export const AuthContext = createContext(null);

// Custom hook to use AuthContext (optional, but common pattern)
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data if logged in
  const [authToken, setAuthToken] = useState(null); // Stores authentication token
  const [isLoading, setIsLoading] = useState(true); // To check if auth state is being loaded

  // On initial load, try to retrieve token and user from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setAuthToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false); // Authentication state has been loaded
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        setUser(response.user);
        setAuthToken(response.token);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      }
      return { success: false, error: response.message || "Login failed." };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || "An unexpected error occurred." };
    } finally {
      setIsLoading(false);
    }
  };

 
  // Function to handle user signup (renamed from 'signup' to 'register' for consistency with SignUpPage.jsx)
  const register = async (name, email, password) => { // Added 'name' parameter
    setIsLoading(true);
    try {
      const response = await registerUser({ name, email, password }); // Pass object to registerUser
      if (response.success) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || "Registration failed." };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || "An unexpected error occurred." };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('User logged out.');
  };

  const isAuthenticated = !!user && !!authToken;

  // The value that will be supplied to any components consuming this context
  const authContextValue = {
    user,
    authToken,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  if (isLoading) {
    // Optionally render a loading spinner or null while checking auth state
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};