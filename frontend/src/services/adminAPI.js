const API_BASE_URL = 'http://localhost:9000/api/admin';

const adminAPI = {
  // Dashboard
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Products
  getAllProducts: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?page=${page}&limit=${limit}&search=${search}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  createProduct: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        body: formData
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },
  
  updateProduct: async (productId, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "PUT",
        body: formData
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },
  

  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Users
  getAllUsers: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?page=${page}&limit=${limit}&search=${search}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserDetails: async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/account/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('User details API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Orders
  getAllOrders: async (page = 1, limit = 10, status = '') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/orders?page=${page}&limit=${limit}&status=${status}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Contacts
  getAllContacts: async (page = 1, limit = 10, status = '') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contacts?page=${page}&limit=${limit}&status=${status}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  updateContactStatus: async (contactId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  },

  deleteContact: async (contactId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  // Categories
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

export default adminAPI;
