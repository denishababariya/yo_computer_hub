const BASE_URL = "http://localhost:9000/api";
const API_BASE_URL = "http://localhost:9000/api";
const PRODUCTS = `${BASE_URL}/products`;
const ADMIN = `${BASE_URL}/admin`;

const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

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
  getDashboardStats: () => authFetch('/admin/dashboard'),
  getAllProducts: (page = 1, limit = 10, search = "") => authFetch(`/admin/products?page=${page}&limit=${limit}&search=${search}`),
  createProduct: (formData) => authFetchAbsolute(`${PRODUCTS}`, { method: "POST", body: formData }),
  updateProduct: (id, formData) => authFetchAbsolute(`${PRODUCTS}/${id}`, { method: "PUT", body: formData }),
  deleteProduct: (id) => authFetchAbsolute(`${PRODUCTS}/${id}`, { method: "DELETE" }),
  getAllUsers: (page = 1, limit = 10, search = "") => authFetch(`/admin/users?page=${page}&limit=${limit}&search=${search}`),
  getUserDetails: (id) => authFetchAbsolute(`${BASE_URL}/users/account/${id}`),
  deleteUser: (id) => authFetch(`/admin/users/${id}`, { method: "DELETE" }),
  getAllOrders: (page = 1, limit = 10, status = "") => authFetch(`/admin/orders?page=${page}&limit=${limit}&status=${status}`),
  updateOrderStatus: (id, status) => authFetch(`/admin/orders/${id}/status`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }),
  getAllContacts: (page = 1, limit = 10, status = "") => authFetch(`/admin/contacts?page=${page}&limit=${limit}&status=${status}`),
  updateContactStatus: (id, status) => authFetch(`/admin/contacts/${id}/status`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }),
  deleteContact: (id) => authFetch(`/admin/contacts/${id}`, { method: "DELETE" }),
  getAllCategories: () => authFetch('/admin/categories'),
  createCategory: (data) => authFetch('/admin/categories', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  updateCategory: (id, data) => authFetch(`/admin/categories/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  deleteCategory: (id) => authFetch(`/admin/categories/${id}`, { method: "DELETE" }),
};

export default adminAPI;
