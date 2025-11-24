import React, { useState, useEffect } from 'react';
import adminAPI from '../services/adminAPI';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    categoryId: '',
    image: '',
    stock: '',
    rating: '',
    tags: '',
    isFeatured: false,
    isBestSeller: false,
    specifications: {},
    images: [],
    videos: []
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formTitle, setFormTitle] = useState('Add New Product');
  const [submitButtonText, setSubmitButtonText] = useState('✓ Create Product');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [page, search]);

  const fetchCategories = async () => {
    try {
      const data = await adminAPI.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllProducts(page, 10, search);
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.deleteProduct(id);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      alt: '',
      isPrimary: false
    }));
    setImagePreview([...imagePreview, ...previews]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      title: '',
      type: 'direct',
      thumbnail: ''
    }));
    setVideoPreview([...videoPreview, ...previews]);
  };

  const removeImage = (index) => {
    setImagePreview(imagePreview.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideoPreview(videoPreview.filter((_, i) => i !== index));
  };

  const handleImageAltChange = (index, alt) => {
    const updated = [...imagePreview];
    updated[index].alt = alt;
    setImagePreview(updated);
  };

  const handleImagePrimaryChange = (index) => {
    const updated = imagePreview.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    setImagePreview(updated);
  };

  const handleVideoTitleChange = (index, title) => {
    const updated = [...videoPreview];
    updated[index].title = title;
    setVideoPreview(updated);
  };

  const handleVideoTypeChange = (index, type) => {
    const updated = [...videoPreview];
    updated[index].type = type;
    setVideoPreview(updated);
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setFormTitle(`Edit: ${product.name}`);
    setSubmitButtonText('💾 Save Changes');
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      categoryId: product.categoryId,
      image: product.image,
      stock: product.stock,
      rating: product.rating ,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      isFeatured: !!product.isFeatured,
      isBestSeller: !!product.isBestSeller,
      specifications: product.specifications || {},
      images: product.images || [],
      videos: product.videos || []
    });
    setImagePreview(product.images ? product.images.map(img => ({
      url: img.url,
      alt: img.alt || '',
      isPrimary: !!img.isPrimary
    })) : []);
    setVideoPreview(product.videos ? product.videos.map(vid => ({
      url: vid.url,
      title: vid.title || '',
      type: vid.type || 'direct',
      thumbnail: vid.thumbnail || ''
    })) : []);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingProductId(null);
    setFormTitle('Add New Product');
    setSubmitButtonText('✓ Create Product');
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      categoryId: '',
      image: '',
      stock: '',
      rating: '',
      tags: '',
      isFeatured: false,
      isBestSeller: false,
      specifications: {},
      images: [],
      videos: []
    });
    setImagePreview([]);
    setVideoPreview([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("originalPrice", formData.originalPrice);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("isFeatured", formData.isFeatured);
      formDataToSend.append("isBestSeller", formData.isBestSeller);
      formDataToSend.append("rating", formData.rating);
  
      // ✅ tags must be array — backend expects JSON.parse
      formDataToSend.append("tags", JSON.stringify(formData.tags.split(",")));
  
      // ✅ specifications must be JSON
      formDataToSend.append("specifications", JSON.stringify(formData.specifications));
  
      // ✅ MAIN IMAGE - multer expects field name = "image"
      if (imagePreview[0]?.file) {
        formDataToSend.append("image", imagePreview[0].file);
      }
  
      // ✅ Additional images
      imagePreview.forEach((img) => {
        if (img.file) formDataToSend.append("images", img.file);
      });
  
      // ✅ Videos upload
      videoPreview.forEach((vid) => {
        if (vid.file) formDataToSend.append("videos", vid.file);
      });
  
      if (editingProductId) {
        await adminAPI.updateProduct(editingProductId, formDataToSend);
        alert("✅ Product updated successfully");
      } else {
        await adminAPI.createProduct(formDataToSend);
        alert("✅ Product created successfully");
      }
  
      resetForm();
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
      alert("❌ Failed to save product");
    }
  };
  
  

  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbhCAelFcME2bxvvcN_Grufcw4HdyzEbtGA&s";
  return (
    <div>
      <div className="z_admin_table_wrapper">
        <div className="z_admin_table_header">
          <h3 className="z_admin_table_title">Products Management</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="z_admin_search_box"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <button
              className="z_admin_btn z_admin_btn_primary"
              onClick={() => {
                if (showForm) {
                  resetForm();
                }
                setShowForm(!showForm);
              }}
            >
              {showForm ? '✕ Cancel' : '+ Add Product'}
            </button>
          </div>
        </div>

        {showForm && (
          <form className="z_admin_form" onSubmit={handleSubmit}>
            <h3 style={{ color: '#00d4ff', marginTop: 0, marginBottom: '20px' }}>{formTitle}</h3>
            {/* Basic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Product Name *</label>
                <input
                  type="text"
                  className="z_admin_form_input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Category *</label>
                <select
                  className="z_admin_form_select"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Price *</label>
                <input
                  type="number"
                  className="z_admin_form_input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Original Price</label>
                <input
                  type="number"
                  className="z_admin_form_input"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                />
              </div>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Stock *</label>
                <input
                  type="number"
                  className="z_admin_form_input"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
              <div className="z_admin_form_group">
                <label className="z_admin_form_label">Rating</label>
                <input
                  type="number"
                  className="z_admin_form_input"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Description *</label>
              <textarea
                className="z_admin_form_textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Main Image URL */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Main Image URL *</label>
              <input
                type="text"
                className="z_admin_form_input"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </div>

            {/* Tags */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Tags (comma separated)</label>
              <input
                type="text"
                className="z_admin_form_input"
                placeholder="e.g., keyboard, wireless, mechanical"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            {/* Checkboxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <label htmlFor="isFeatured" style={{ margin: 0, color: '#fff', cursor: 'pointer' }}>Is Featured</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                />
                <label htmlFor="isBestSeller" style={{ margin: 0, color: '#fff', cursor: 'pointer' }}>Is Best Seller</label>
              </div>
            </div>

            {/* Images Upload */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Product Images</label>
              <input
                type="file"
                className="z_admin_form_input"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ color: '#00d4ff', marginBottom: '10px' }}>Uploaded Images:</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {imagePreview.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>
                        <img
                          src={`http://localhost:9000${img.url}`}
                          alt={img?.name}
                          
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: img.isPrimary ? '3px solid #00d4ff' : '1px solid #333',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleImagePrimaryChange(idx)}
                          title="Click to set as primary"

                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ff4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✕
                        </button>
                        <input
                          type="text"
                          placeholder="Alt text"
                          value={img.alt}
                          onChange={(e) => handleImageAltChange(idx, e.target.value)}
                          style={{
                            width: '50px',
                            marginTop: '5px',
                            padding: '4px',
                            fontSize: '0.75rem',
                            backgroundColor: '#333',
                            border: '1px solid #555',
                            color: '#fff',
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Videos Upload */}
            <div className="z_admin_form_group">
              <label className="z_admin_form_label">Product Videos</label>
              <input
                type="file"
                className="z_admin_form_input"
                multiple
                accept="video/*"
                onChange={handleVideoUpload}
              />
              {videoPreview.map((vid, idx) => (
                <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>

                  {/* PLAYABLE VIDEO PREVIEW */}
                  <video
                    src={`http://localhost:9000${vid.url}`}
                    controls
                    style={{
                      width: '280px',
                      height: '280px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '1px solid #555',
                      background: '#000'
                    }}
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeVideo(idx)}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#ff4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ✕
                  </button>

                  {/* Title + Type Inputs */}
                  <div style={{ marginTop: '5px', fontSize: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Title"
                      value={vid.title}
                      onChange={(e) => handleVideoTitleChange(idx, e.target.value)}
                      style={{
                        width: '80px',
                        padding: '4px',
                        marginBottom: '3px',
                        backgroundColor: '#333',
                        border: '1px solid #555',
                        color: '#fff',
                        borderRadius: '3px'
                      }}
                    />
                    <select
                      value={vid.type}
                      onChange={(e) => handleVideoTypeChange(idx, e.target.value)}
                      style={{
                        width: '80px',
                        padding: '4px',
                        backgroundColor: '#333',
                        border: '1px solid #555',
                        color: '#fff',
                        borderRadius: '3px'
                      }}
                    >
                      <option value="direct">Direct</option>
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="demo">Demo</option>
                    </select>
                  </div>

                </div>
              ))}

            </div>

            <button type="submit" className="z_admin_btn z_admin_btn_success">
              {submitButtonText}
            </button>
          </form>
        )}

        {loading ? (
          <div className="z_admin_empty_state">
            <div className="z_admin_spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <table className="z_admin_table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{getCategoryName(product.categoryId)}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="z_admin_actions">
                        <button
                          type="button"
                          className="z_admin_btn z_admin_btn_secondary"
                          onClick={() => handleEditProduct(product)}
                        >
                          ✎ Edit
                        </button>
                        <button
                          type="button"
                          className="z_admin_btn z_admin_btn_danger"
                          onClick={() => handleDelete(product._id)}
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
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
