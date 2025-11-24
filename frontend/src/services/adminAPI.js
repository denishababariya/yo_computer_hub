const BASE_URL = "http://localhost:9000/api";
const PRODUCTS = `${BASE_URL}/products`;
const ADMIN = `${BASE_URL}/admin`;

const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

const adminAPI = {
  getDashboardStats: () => request(`${ADMIN}/dashboard`),

  getAllProducts: (page = 1, limit = 10, search = "") =>
    request(`${ADMIN}/products?page=${page}&limit=${limit}&search=${search}`),

  createProduct: (formData) =>
    request(PRODUCTS, { method: "POST", body: formData }),

  updateProduct: (id, formData) =>
    request(`${PRODUCTS}/${id}`, { method: "PUT", body: formData }),

  deleteProduct: (id) =>
    request(`${PRODUCTS}/${id}`, { method: "DELETE" }),

  getAllUsers: (page = 1, limit = 10, search = "") =>
    request(`${ADMIN}/users?page=${page}&limit=${limit}&search=${search}`),

  getUserDetails: (id) =>
    request(`${BASE_URL}/users/account/${id}`),

  deleteUser: (id) =>
    request(`${ADMIN}/users/${id}`, { method: "DELETE" }),

  getAllOrders: (page = 1, limit = 10, status = "") =>
    request(`${ADMIN}/orders?page=${page}&limit=${limit}&status=${status}`),

  updateOrderStatus: (id, status) =>
    request(`${ADMIN}/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),

  getAllContacts: (page = 1, limit = 10, status = "") =>
    request(`${ADMIN}/contacts?page=${page}&limit=${limit}&status=${status}`),

  updateContactStatus: (id, status) =>
    request(`${ADMIN}/contacts/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),

  deleteContact: (id) =>
    request(`${ADMIN}/contacts/${id}`, { method: "DELETE" }),

  getAllCategories: () => request(`${ADMIN}/categories`),

  createCategory: (data) =>
    request(`${ADMIN}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  updateCategory: (id, data) =>
    request(`${ADMIN}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteCategory: (id) =>
    request(`${ADMIN}/categories/${id}`, { method: "DELETE" }),
};

export default adminAPI;
