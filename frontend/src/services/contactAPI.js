const API_BASE_URL = 'http://localhost:9000/api/contacts';

const contactAPI = {
  // Create a new contact message
  createContact: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();
      console.log("contact data",data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send contact message');
      }

      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  // Get all contact messages
  getAllContacts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch contacts');
      }

      return data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Get a single contact by ID
  getContactById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch contact');
      }

      return data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  // Update contact message
  updateContact: async (id, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to update contact');
      }

      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  // Delete contact message
  deleteContact: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to delete contact');
      }

      return data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  // Get contacts by status
  getContactsByStatus: async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/status/${status}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch contacts by status');
      }

      return data;
    } catch (error) {
      console.error('Error fetching contacts by status:', error);
      throw error;
    }
  },
};

export default contactAPI;
