import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchContacts();
  }, [page, statusFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllContacts(page, 10, statusFilter);
      setContacts(data.contacts);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await adminAPI.updateContactStatus(contactId, newStatus);
      alert('Contact status updated successfully');
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Failed to update contact status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await adminAPI.deleteContact(id);
        alert('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact');
      }
    }
  };

  return (
    <div className="z_admin_table_wrapper">
      <div className="z_admin_table_header">
        <h3 className="z_admin_table_title">Contacts Management</h3>
        <select
          className="z_admin_form_select"
          style={{ width: '200px' }}
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {loading ? (
        <div className="z_admin_empty_state">
          <div className="z_admin_spinner"></div>
          <p>Loading contacts...</p>
        </div>
      ) : contacts.length > 0 ? (
        <>
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company || 'N/A'}</td>
                  <td>
                    <span className={`z_admin_status_badge z_admin_status_${contact.status}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="z_admin_actions">
                      <select
                        className="z_admin_form_select"
                        style={{ width: '120px' }}
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button
                        className="z_admin_btn z_admin_btn_danger"
                        onClick={() => handleDelete(contact._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="z_admin_pagination">
            <button
              className="z_admin_pagination_btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`z_admin_pagination_btn ${page === p ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="z_admin_pagination_btn"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        <div className="z_admin_empty_state">
          <p>No contacts found</p>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
