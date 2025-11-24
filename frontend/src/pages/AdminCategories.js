import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: ''
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState('✓ Create Category');

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
      alert('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon || ''
    });
    setShowForm(true);
    setSubmitButtonText('Save Changes');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await adminAPI.updateCategory(editingCategoryId, formData);
        alert('Category updated successfully');
      } else {
        await adminAPI.createCategory(formData);
        alert('Category created successfully');
      }
      setFormData({
        name: '',
        description: '',
        icon: ''
      });
      setShowForm(false);
      setEditingCategoryId(null);
      setSubmitButtonText('✓ Create Category');
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await adminAPI.deleteCategory(id);
        alert('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <div className="z_admin_table_wrapper">
        <div className="z_admin_table_header">
          <h3 className="z_admin_table_title">Categories Management</h3>
          <button
            className="z_admin_btn z_admin_btn_primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ Add Category'}
          </button>
        </div>

        {showForm && (
          <form className="z_admin_form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
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
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Icon</label>
                <input
                  type="text"
                  className="z_admin_form_input"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 📦"
                />
              </div>
            </div>
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Description</label>
              <textarea
                className="z_admin_form_textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <button type="submit" className="z_admin_btn z_admin_btn_success">
              ✓ Create Category
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.icon || '🏷️'}</td>
                  <td>{category.name}</td>
                  <td>{category.description || 'N/A'}</td>
                  <td>
                    <div className="z_admin_actions">
                      <button className="z_admin_btn z_admin_btn_secondary" onClick={() => handleEdit(category)}>✎ Edit</button>
                      <button
                        className="z_admin_btn z_admin_btn_danger"
                        onClick={() => handleDelete(category._id)}
                      >
                        🗑️ Delete
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
    </div>
  );
};

export default AdminCategories;
