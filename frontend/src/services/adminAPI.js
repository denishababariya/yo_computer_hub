const API_BASE_URL = 'http://localhost:9000/api/admin';

const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorBody = {};
    try {
      errorBody = await response.json();
    } catch (e) {
      // ignore parse errors
    }
    const error = new Error(errorBody.message || errorBody.error || 'Request failed');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

const authFetchAbsolute = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorBody = {};
    try {
      errorBody = await response.json();
    } catch (e) {
      // ignore parse errors
    }
    const error = new Error(errorBody.message || errorBody.error || 'Request failed');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

const adminAPI = {
  // Dashboard
  getDashboardStats: () => authFetch('/dashboard'),

  // Products
  getAllProducts: (page = 1, limit = 10, search = '') =>
    authFetch(`/products?page=${page}&limit=${limit}&search=${search}`),

  createProduct: (formData) =>
    authFetch('/products', {
      method: 'POST',
      body: formData
    }),

  updateProduct: (productId, formData) =>
    authFetch(`/products/${productId}`, {
      method: 'PUT',
      body: formData
    }),

  deleteProduct: (productId) =>
    authFetch(`/products/${productId}`, {
      method: 'DELETE'
    }),

  // Users
  getAllUsers: (page = 1, limit = 10, search = '') =>
    authFetch(`/users?page=${page}&limit=${limit}&search=${search}`),

  getUserDetails: (userId) =>
    authFetchAbsolute(`http://localhost:9000/api/users/account/${userId}`),

  deleteUser: (userId) =>
    authFetch(`/users/${userId}`, {
      method: 'DELETE'
    }),

  // Orders
  getAllOrders: (page = 1, limit = 10, status = '') =>
    authFetch(`/orders?page=${page}&limit=${limit}&status=${status}`),

  updateOrderStatus: (orderId, status) =>
    authFetch(`/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),

  // Contacts
  getAllContacts: (page = 1, limit = 10, status = '') =>
    authFetch(`/contacts?page=${page}&limit=${limit}&status=${status}`),

  updateContactStatus: (contactId, status) =>
    authFetch(`/contacts/${contactId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),

  deleteContact: (contactId) =>
    authFetch(`/contacts/${contactId}`, {
      method: 'DELETE'
    }),

  // Categories
  getAllCategories: () => authFetch('/categories'),

  createCategory: (categoryData) =>
    authFetch('/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    }),

  updateCategory: (categoryId, categoryData) =>
    authFetch(`/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    }),

  deleteCategory: (categoryId) =>
    authFetch(`/categories/${categoryId}`, {
      method: 'DELETE'
    })
};

export default adminAPI;
