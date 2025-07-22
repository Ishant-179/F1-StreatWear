import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, sendOtpForPasswordReset, resetPassword } from '../utils/api'; 

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [authToken, setAuthToken] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
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
    setIsLoading(false);
  }, []);

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
  const register = async (name, email, password) => { 
    setIsLoading(true);
    try {
      const response = await registerUser({ name, email, password });
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
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('User logged out.');
  };

  const isAuthenticated = !!user && !!authToken;

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
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};