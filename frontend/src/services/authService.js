import axios from 'axios';

// API Base URL - Update this to match your backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

/**
 * Create axios instance with default config
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Auth Service
 * Handles all authentication-related API calls
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} - Response with user data and token
   */
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      // Re-throw with better error message
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      const err = new Error(message);
      err.response = { data: { message } };
      throw err;
    }
  },

  /**
   * Login user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Response with user data and token
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      const err = new Error(message);
      err.response = { data: { message } };
      throw err;
    }
  },

  /**
   * Get current user data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} - Response with user data
   */
  getMe: async (token) => {
    try {
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch user data.';
      const err = new Error(message);
      err.response = { data: { message } };
      throw err;
    }
  },

  /**
   * Set auth token in axios defaults
   * @param {string} token - JWT token
   */
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },
};

export default authService;
