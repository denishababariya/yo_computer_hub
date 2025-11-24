import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllUsers(page, 10, search);
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(id);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleViewUser = async (user) => {
    try {
      setLoading(true);
      const response = await adminAPI.getUserDetails(user._id);
      console.log('User data from backend:', response);
      setSelectedUser(response.data.profile || response);
      // console.log('Selected user:', selectedUser);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="z_admin_table_wrapper">
      <div className="z_admin_table_header">
        <h3 className="z_admin_table_title">Users Management</h3>
        <input
          type="text"
          className="z_admin_search_box"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="z_admin_empty_state">
          <div className="z_admin_spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : users.length > 0 ? (
        <>
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="z_admin_actions">
                      <button
                        className="z_admin_btn z_admin_btn_secondary"
                        onClick={() => handleViewUser(user)}
                      >
                        👁️ View
                      </button>
                      <button
                        className="z_admin_btn z_admin_btn_danger"
                        onClick={() => handleDelete(user._id)}
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
          <p>No users found</p>
        </div>
      )}

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="z_admin_modal_overlay" onClick={closeModal}>
          <div className="z_admin_modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="z_admin_modal_header">
              <h2>User Details</h2>
              {/* <button className="z_admin_modal_close_icon" onClick={closeModal}>
                ✕
              </button> */}
            </div>

            {/* Modal Body */}
            <div className="z_admin_modal_body">
              {/* Avatar Section */}
              <div className="z_admin_user_avatar_display">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="z_admin_user_avatar_placeholder"><span>${selectedUser.name?.charAt(0).toUpperCase() || 'U'}</span></div>`;
                    }}
                  />
                ) : (
                  <div className="z_admin_user_avatar_placeholder">
                    <span>{selectedUser.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                )}
              </div>

              <div className='row'>          {/* User Info */}
                <div className="z_admin_modal_field col-6">
                  <label>Name:</label>
                  <p>{selectedUser.name || 'N/A'}</p>
                </div>
                <div className="z_admin_modal_field col-6">
                  <label>Email:</label>
                  <p>{selectedUser.email || 'N/A'}</p>
                </div>
                <div className="z_admin_modal_field col-6">
                  <label>Phone:</label>
                  <p>{selectedUser.phone || 'N/A'}</p>
                </div>
                <div className="z_admin_modal_field col-6">
                  <label>Gender:</label>
                  <p>{selectedUser.gender || 'N/A'}</p>
                </div>
                <div className="z_admin_modal_field col-6">
                  <label>Date of Birth:</label>
                  <p>{selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="z_admin_modal_field col-6">
                  <label>Joined Date:</label>
                  <p>{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="z_admin_modal_footer">
              <button className="z_admin_btn z_admin_btn_secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminUsers;
