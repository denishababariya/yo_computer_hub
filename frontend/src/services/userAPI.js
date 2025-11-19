const API_BASE_URL = 'http://localhost:9000/api/users';

export const userAPI = {
  // Get user profile
  getProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  updateProfile: async (userId, profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user orders
  getOrders: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user addresses
  getAddresses: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return { success: false, error: error.message };
    }
  },

  // Add new address
  addAddress: async (userId, addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding address:', error);
      return { success: false, error: error.message };
    }
  },

  // Update address
  updateAddress: async (userId, addressId, addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${userId}/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating address:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete address
  deleteAddress: async (userId, addressId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${userId}/${addressId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting address:', error);
      return { success: false, error: error.message };
    }
  },

  // Get complete account data
  getCompleteAccountData: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/account/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching account data:', error);
      return { success: false, error: error.message };
    }
  }
};
