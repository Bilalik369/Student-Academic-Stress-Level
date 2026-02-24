import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

// Create Auth Context
const AuthContext = createContext(null);

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods to children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Check if user is authenticated on mount
   * Validates token and fetches user data
   */
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // Verify token and get user data
          const response = await authService.getMe(storedToken);
          if (response.success) {
            setUser(response.user);
            setToken(storedToken);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (err) {
          console.error('Auth initialization error:', err);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} - Response with success status and message
   */
  const login = useCallback(async (email, password) => {
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  }, []);

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Object} - Response with success status and message
   */
  const register = useCallback(async (userData) => {
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  }, []);

  /**
   * Logout user
   * Clears token and user data
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {Object} - Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

