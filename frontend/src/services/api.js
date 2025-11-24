const API_BASE_URL = 'http://localhost:9000/api';

// Create axios-like instance with fetch
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        // Handle 401 Unauthorized - token expired or missing
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login?redirected=true';
          throw new Error('Session expired. Please login again.');
        }
        
        const error = await response.json();
        throw new Error(error.error || error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const api = new APIClient(API_BASE_URL);

// Product APIs
export const productAPI = {
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products${query ? '?' + query : ''}`);
  },
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

// Category APIs
export const categoryAPI = {
  // backend categories endpoints are under /products/categories/... per productRoutes.js
  getAll: () => api.get('/products/categories/all'),
  getById: (id) => api.get(`/products/categories/${id}`),
  create: (data) => api.post('/products/categories', data),
  update: (id, data) => api.put(`/products/categories/${id}`, data),
  delete: (id) => api.delete(`/products/categories/${id}`)
};

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout', {}),
  getProfile: (userId) => api.get(`/auth/profile/${userId}`),
  updateProfile: (userId, data) => api.put(`/auth/profile/${userId}`, data),
  sendOtp: (data) => api.post('/auth/send-otp', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data)
};

// Order APIs
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  createRazorpay: (data) => api.post('/orders/create_razorpay', data),
  verifyPayment: (data) => api.post('/orders/verify_payment', data),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getById: (orderId) => api.get(`/orders/${orderId}`),
  update: (orderId, data) => api.put(`/orders/${orderId}`, data),
  delete: (orderId) => api.delete(`/orders/${orderId}`)
};

// Cart APIs
export const cartAPI = {
  add: (data) => api.post('/cart/add', data),
  remove: (data) => api.post('/cart/remove', data)
};

export default api;
