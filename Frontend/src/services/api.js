import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract message from backend response format {success: false, message: "..."}
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status >= 400) {
      // Don't show toast for 400 errors as they're handled by the individual API calls
      console.error('API Error:', message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    // Backend returns {success, message, data: {token, user}}
    if (response.data.success && response.data.data) {
      return response.data.data; // Return just the {token, user} part
    }
    throw new Error(response.data.message || 'Registration failed');
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Backend returns {success, message, data: {token, user}}
    if (response.data.success && response.data.data) {
      return response.data.data; // Return just the {token, user} part
    }
    throw new Error(response.data.message || 'Login failed');
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Products API endpoints
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    // Backend returns {success, message, data: {products, total, page, etc}}
    if (response.data.success && response.data.data) {
      return response.data.data; // Return just the data part
    }
    throw new Error(response.data.message || 'Failed to fetch products');
  },
  
  create: async (productData) => {
    const response = await api.post('/products', productData);
    // Backend returns {success, message, data: product}
    if (response.data.success && response.data.data) {
      return response.data.data; // Return just the product data
    }
    throw new Error(response.data.message || 'Failed to create product');
  },
  
  updateQuantity: async (id, quantity) => {
    const response = await api.put(`/products/${id}/quantity`, { quantity });
    // Backend returns {success, message, data: product}
    if (response.data.success && response.data.data) {
      return response.data.data; // Return just the product data
    }
    throw new Error(response.data.message || 'Failed to update quantity');
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data; // Health endpoint returns direct JSON, not wrapped
  }
};

export default api; 