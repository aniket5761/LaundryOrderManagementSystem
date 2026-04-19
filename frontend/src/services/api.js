import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
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

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
  getAllOrders: () => api.get('/orders'),
  getOrdersByStatus: (status) => api.get('/orders', { params: { status } }),
  searchByCustomerName: (customerName) => api.get('/orders', { params: { customerName } }),
  searchByPhoneNumber: (phoneNumber) => api.get('/orders', { params: { phoneNumber } }),
  searchByGarmentType: (garmentType) => api.get('/orders', { params: { garmentType } }),
  updateOrderStatus: (orderId, statusData) => api.patch(`/orders/${orderId}/status`, statusData),
  getDashboardStats: () => api.get('/orders/dashboard/stats'),
  
  // Auth methods (for backward compatibility)
  login: authAPI.login,
  signup: authAPI.signup,
};

export default api;

