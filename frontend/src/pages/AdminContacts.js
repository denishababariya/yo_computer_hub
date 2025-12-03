import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { RiDeleteBin6Line } from "react-icons/ri";
import DModal from '../components/DModal';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  // --- Modal State Configuration ---
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'info', // 'delete', 'success', 'info'
    title: '',
    message: ''
  });
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

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
      setModalConfig({
        show: true,
        type: 'info',
        title: 'Error',
        message: 'Failed to fetch contacts'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await adminAPI.updateContactStatus(contactId, newStatus);
      setModalConfig({
        show: true,
        type: 'success',
        title: 'Updated',
        message: 'Contact status updated successfully'
      });
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
      setModalConfig({
        show: true,
        type: 'info',
        title: 'Error',
        message: 'Failed to update contact status'
      });
    }
  };

  // 1. Initiate Delete (Opens Modal)
  const initiateDelete = (id) => {
    setPendingDeleteId(id);
    setModalConfig({
      show: true,
      type: 'delete',
      title: 'Delete Contact',
      message: 'Are you sure you want to delete this contact? This action cannot be undone.'
    });
  };

  // 2. Handle Confirm Action (Delete logic or just close)
  const handleModalConfirm = async () => {
    if (modalConfig.type === 'delete' && pendingDeleteId) {
      try {
        await adminAPI.deleteContact(pendingDeleteId);
        setModalConfig({
          show: true,
          type: 'success',
          title: 'Deleted!',
          message: 'Contact deleted successfully'
        });
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        setModalConfig({
          show: true,
          type: 'info',
          title: 'Error',
          message: 'Failed to delete contact'
        });
      }
      setPendingDeleteId(null);
    } else {
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setModalConfig({ ...modalConfig, show: false });
    setPendingDeleteId(null);
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
          <div className="z_table_scroll">
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
                    <td className='text-nowrap'>{contact.name}</td>
                    <td className='text-nowrap'>{contact.email}</td>
                    <td className='text-nowrap'>{contact.company || 'N/A'}</td>
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
                          onClick={() => initiateDelete(contact._id)}
                        >
                          <span style={{ color: "#fff", fontSize: "16px" }}> <RiDeleteBin6Line /> Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* --- Integration of DModal --- */}
      <DModal
        show={modalConfig.show}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default AdminContacts;