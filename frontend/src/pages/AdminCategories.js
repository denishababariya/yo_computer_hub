import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DModal from '../components/DModal'; // Ensure path is correct

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    image: '',
    isActive: true,
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState('✓ Create Category');

  // --- Modal State Configuration ---
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'info', // 'delete', 'update', 'success'
    title: '',
    message: ''
  });
  const [deleteId, setDeleteId] = useState(null); // To store ID for deletion

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Replaced alert with Modal
      setModalConfig({
        show: true,
        type: 'info',
        title: 'Error',
        message: 'Failed to fetch categories.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category._id);
    setFormData({
      name: category.name,
      slug: category.slug || '',
      description: category.description || '',
      icon: category.icon || '',
      image: category.image || '',
      isActive: category.isActive,
    });
    setShowForm(true);
    setSubmitButtonText('Save Changes');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await adminAPI.updateCategory(editingCategoryId, formData);
        // Success Modal for Update
        setModalConfig({
            show: true,
            type: 'success',
            title: 'Updated!',
            message: 'Category updated successfully'
        });
      } else {
        await adminAPI.createCategory(formData);
        // Success Modal for Create
        setModalConfig({
            show: true,
            type: 'success',
            title: 'Created!',
            message: 'Category created successfully'
        });
      }
      
      // Reset Form
      setFormData({
        name: '',
        slug: '', // Added reset for slug
        description: '',
        icon: '',
        image: '', // Added reset for image
        isActive: true
      });
      setShowForm(false);
      setEditingCategoryId(null);
      setSubmitButtonText('✓ Create Category');
      fetchCategories();

    } catch (error) {
      console.error('Error saving category:', error);
      // Error Modal
      setModalConfig({
        show: true,
        type: 'info', // DModal doesn't have 'error' style in your code, so using info/default
        title: 'Error',
        message: 'Failed to save category'
      });
    }
  };

  // 1. Trigger when Delete button is clicked (Opens Modal)
  const initiateDelete = (id) => {
    setDeleteId(id);
    setModalConfig({
        show: true,
        type: 'delete',
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category? This action cannot be undone.'
    });
  };

  // 2. Execute the actual logic when "Confirm" is clicked in Modal
  const handleModalConfirm = async () => {
    // If the modal is currently in 'delete' mode
    if (modalConfig.type === 'delete' && deleteId) {
        try {
            await adminAPI.deleteCategory(deleteId);
            setModalConfig({
                show: true,
                type: 'success',
                title: 'Deleted!',
                message: 'Category deleted successfully'
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            setModalConfig({
                show: true,
                type: 'info',
                title: 'Error',
                message: 'Failed to delete category'
            });
        }
        setDeleteId(null); // Reset ID
    } else {
        // For Success or Info types, clicking button just closes modal
        handleModalClose();
    }
  };

  const handleModalClose = () => {
    setModalConfig({ ...modalConfig, show: false });
    setDeleteId(null);
  };

  return (
    <div>
      <div className="z_admin_table_wrapper">
        <div className="z_admin_table_header">
          <h3 className="z_admin_table_title">Categories Management</h3>
          <button
            className="z_admin_btn z_admin_btn_primary "
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ Add Category'}
          </button>
        </div>

        {showForm && (
          <form className="z_admin_form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>

              {/* Name */}
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Category Name</label>
                <input
                  type="text"
                  className="z_admin_form_input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Icon */}
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Icon</label>
                <input
                  type="text"
                  className="z_admin_form_input"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>

              {/* Image URL */}
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Image URL</label>
                <input
                  type="text"
                  className="z_admin_form_input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* Active Status */}
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Active Status</label>
                <select
                  className="z_admin_form_input"
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Description</label>
              <textarea
                className="z_admin_form_textarea"
                maxLength={70}
                placeholder='Enter a brief description for the category (max 70 characters)'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button type="submit" className="z_admin_btn z_admin_btn_success">
              {submitButtonText}
            </button>
          </form>
        )}

        {loading ? (
          <div className="z_admin_empty_state">
            <div className="z_admin_spinner"></div>
            <p>Loading categories...</p>
          </div>
        ) : categories.length > 0 ? (
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.icon || '🏷️'}</td>
                  <td>{category.name}</td>
                  <td className='text-nowrap'>{category.description || 'N/A'}</td>
                  <td>{category.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <div className="z_admin_actions">
                      <button className="z_admin_btn z_admin_btn_secondary wrap-nowrap" onClick={() => handleEdit(category)}> 
                        <span style={{color: "#fff", fontSize: "16px"}}><FaRegEdit /> Edit</span> 
                      </button>
                      <button
                        className="z_admin_btn z_admin_btn_danger"
                        onClick={() => initiateDelete(category._id)}
                      >
                       <span style={{color: "#fff", fontSize: "16px"}}> <RiDeleteBin6Line /> Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="z_admin_empty_state">
            <p>No categories found</p>
          </div>
        )}
      </div>

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

export default AdminCategories;