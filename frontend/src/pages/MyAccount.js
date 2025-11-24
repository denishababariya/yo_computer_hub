import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import { FaCamera } from 'react-icons/fa';
import { userAPI } from '../services/userAPI';
import { authAPI } from '../services/api';
import { logout as logoutAuth } from '../utils/auth';

const navTabs = [
  { name: "MY PROFILE", key: "profile" },
  { name: "MY ORDER", key: "order" },
  { name: "ADDRESS BOOK", key: "address" },
  { name: "LOG OUT", key: "logout" }
];

const initialProfile = {
  avatar: "",
  // name: "Jay Patel",
  // email: "jay.patel@email.com",
  // phone: "+91 98765 43210",
  // dob: "1998-05-12",
  // gender: "Male",
  // address: "203, Sunrise Avenue, Ahmedabad, Gujarat, India"
};

const dummyOrders = [
  {
    id: 'ORD123456',
    date: '2024-05-01',
    status: 'Delivered',
    items: [
      { name: 'HP Laptop', price: '₹45,000', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop' },
      { name: 'Wireless Mouse', price: '₹7,000', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop' }
    ],
    total: '₹52,000',
  },
  {
    id: 'ORD123457',
    date: '2024-04-18',
    status: 'Shipped',
    items: [
      { name: 'Logitech Keyboard', price: '₹2,500', image: 'https://images.unsplash.com/photo-1587829191301-2d5c0f6ba3b8?w=300&h=300&fit=crop' }
    ],
    total: '₹2,500',
  },
  {
    id: 'ORD123458',
    date: '2024-03-22',
    status: 'Cancelled',
    items: [
      { name: 'Dell Monitor', price: '₹12,000', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop' }
    ],
    total: '₹12,000',
  },
];
const dummyAddresses = [
  {
    name: 'Home',
    address: '203, Sunrise Avenue, Ahmedabad, Gujarat, India',
    phone: '+91 98765 43210',
  },
  {
    name: 'Office',
    address: '2nd Floor, Tech Park, SG Highway, Ahmedabad',
    phone: '+91 91234 56789',
  },
  {
    name: 'Parents',
    address: 'B-12, Green Residency, Vadodara, Gujarat',
    phone: '+91 99887 66554',
  },
  {
    name: 'Friend',
    address: 'Flat 7, River View, Surat, Gujarat',
    phone: '+91 90000 12345',
  },
];

function MyAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogout, setShowLogout] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(initialProfile);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressIdx, setEditingAddressIdx] = useState(null);
  const [addressForm, setAddressForm] = useState({ name: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);

  // Get userId from localStorage (set during login)
  const userId = localStorage.getItem('userId') || 'demo-user-id';

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getCompleteAccountData(userId);

      if (response.success && response.data) {
        setProfile(response.data.profile);
        setEditProfile(response.data.profile);
        setOrders(response.data.orders || []);
        setAddresses(response.data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = e => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const response = await userAPI.updateProfile(userId, editProfile);
      if (response.success) {
        setProfile(response.data);
        setShowEdit(false);
        alert('Profile updated successfully');
      } 
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB');
          return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageData = event.target.result;

          // Update edit profile state
          setEditProfile({ ...editProfile, avatar: imageData });

          // Update main profile state
          setProfile({ ...profile, avatar: imageData });

          // Save to backend immediately
          try {
            const updatedProfileData = {
              ...profile,
              avatar: imageData
            };
            const response = await userAPI.updateProfile(userId, updatedProfileData);
            if (response.success) {
              alert('Profile picture updated successfully');
            }
          } catch (error) {
            console.error('Error updating avatar:', error);
            alert('Failed to update profile picture');
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddressFormChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddNewAddress = () => {
    setEditingAddressIdx(null);
    setAddressForm({ name: '', address: '', phone: '' });
    setShowAddressForm(true);
  };

  const handleEditAddress = (idx) => {
    setEditingAddressIdx(idx);
    setAddressForm(addresses[idx]);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (idx) => {
    try {
      const addressId = addresses[idx]._id;
      const response = await userAPI.deleteAddress(userId, addressId);
      if (response.success) {
        setAddresses(response.data);
        alert('Address deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  const handleSaveAddress = async () => {
    if (!addressForm.name.trim() || !addressForm.address.trim() || !addressForm.phone.trim()) {
      alert('Please fill all required fields');
      return;
    }

    try {
      let response;
      if (editingAddressIdx !== null) {
        const addressId = addresses[editingAddressIdx]._id;
        response = await userAPI.updateAddress(userId, addressId, addressForm);
      } else {
        response = await userAPI.addAddress(userId, addressForm);
      }

      if (response.success) {
        setAddresses(response.data);
        setShowAddressForm(false);
        setAddressForm({ name: '', address: '', phone: '' });
        alert(editingAddressIdx !== null ? 'Address updated successfully' : 'Address added successfully');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  return (
    <section className="z_acc_section py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <div className="z_acc_sidebar">
              <div className="z_acc_title">My Accounts</div>
              <ul className="z_acc_nav_list">
                {navTabs.map(tab => (
                  <li key={tab.key}>
                    <button
                      className={`z_acc_nav_btn${activeTab === tab.key ? " active" : ""}`}
                      onClick={() => {
                        if (tab.key === "logout") setShowLogout(true);
                        else setActiveTab(tab.key);
                      }}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="z_acc_tab_box">
              <div className="z_acc_tab_panel">
                {activeTab === "profile" && (
                  <>
                    <div className="z_acc_tab_heading">MY PROFILE</div>
                    <div className="z_profile_container">
                      <div className="row g-4">
                        {/* Profile Avatar Section */}
                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="z_profile_avatar_section">
                            <div className="z_profile_avatar_wrap">
                              <img src={profile.avatar} alt="Profile" className="z_profile_avatar" />
                              <button
                                className="z_profile_camera_icon"
                                onClick={handleCameraClick}
                                title="Change Profile Picture"
                                type="button"
                              >
                                <FaCamera size={20} />
                              </button>
                            </div>
                            <h4 className="z_profile_name_heading">{profile.name}</h4>
                            <p className="z_profile_email_heading">{profile.email}</p>
                          </div>
                        </div>

                        {/* Profile Details Section */}
                        <div className="col-12 col-md-8 col-lg-9">
                          <div className="z_profile_details_section">
                            <div className="z_profile_header">
                              <h5 className="z_profile_section_title">Personal Information</h5>
                              <button
                                className="btn btn-sm btn-primary z_profile_edit_btn_new"
                                title="Edit Profile"
                                onClick={() => setShowEdit(true)}
                              >
                                <FiEdit2 size={16} /> Edit Profile
                              </button>
                            </div>

                            <div className="z_profile_details_grid">
                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Full Name</label>
                                <p className="z_profile_detail_value">{profile.name}</p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Email Address</label>
                                <p className="z_profile_detail_value">{profile.email}</p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Phone Number</label>
                                <p className="z_profile_detail_value">{profile.phone}</p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Date of Birth</label>
                                <p className="z_profile_detail_value">{profile.dob}</p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Gender</label>
                                <p className="z_profile_detail_value">{profile.gender}</p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">Address</label>
                                <p className="z_profile_detail_value">{profile.address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "order" && (
                  <>
                    <div className="z_acc_tab_heading">MY ORDER</div>
                    <div className="z_order_card">
                      {orders.length === 0 ? (
                        <div className="z_order_empty">No orders yet. Start shopping now!</div>
                      ) : (
                        <div className="z_order_list">
                          {orders.map(order => (
                            <div className="z_order_item_card" key={order.id}>
                              <div className="z_order_header">
                                <div className="z_order_id_date">
                                  <h5 className="z_order_id">Order #{order.id}</h5>
                                  <p className="z_order_date">{order.date}</p>
                                </div>
                                <div className={`z_order_status z_status_${order.status.toLowerCase()}`}>
                                  {order.status}
                                </div>
                              </div>

                              <div className="z_order_products">
                                {order.items.map((item, idx) => (
                                  <div className="z_product_item" key={idx}>
                                    <img src={item.image} alt={item.name} className="z_product_image" />
                                    <div className="z_product_details">
                                      <p className="z_product_name">{item.name}</p>
                                      <p className="z_product_price">{item.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="z_order_footer">
                                <div className="z_order_total">
                                  <span className="z_total_label">Total Amount:</span>
                                  <span className="z_total_value">{order.total}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {activeTab === "address" && (
                  <>
                    <div className="z_acc_tab_heading">ADDRESS BOOK</div>

                    <div className="z_address_card">
                      {addresses.length === 0 ? (
                        <div className="z_address_empty">
                          No addresses saved. Add a new address!
                        </div>
                      ) : (
                        <div className="row g-4">
                          {addresses.map((addr, idx) => (
                            <div className="col-12 col-sm-6 col-lg-6" key={idx}>
                              <div className="z_address_item">
                                <div className="z_address_header">
                                  <h5 className="z_address_name">{addr.name}</h5>
                                  <span className="z_address_badge">{addr.name}</span>
                                </div>

                                <div className="z_address_body">
                                  <div className="z_address_field">
                                    <label className="z_address_label">Address</label>
                                    <p className="z_address_value">{addr.address}</p>
                                  </div>

                                  <div className="z_address_field">
                                    <label className="z_address_label">Phone</label>
                                    <p className="z_address_value">{addr.phone}</p>
                                  </div>
                                </div>

                                <div className="z_address_actions">
                                  <button
                                    className="btn btn-sm btn-outline-primary z_address_edit_btn"
                                    onClick={() => handleEditAddress(idx)}
                                  >
                                    <i className="bi bi-pencil"></i> Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger z_address_delete_btn"
                                    onClick={() => handleDeleteAddress(idx)}
                                  >
                                    <i className="bi bi-trash"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="z_address_add_btn_wrapper mt-4">
                        <button
                          className="btn btn-primary z_address_add_btn"
                          onClick={handleAddNewAddress}
                        >
                          <i className="bi bi-plus-circle"></i> Add New Address
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab !== "profile" && activeTab !== "order" && activeTab !== "address" && (
                  <div className="z_acc_tab_content">{navTabs.find(t => t.key === activeTab).name}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLogout && (
        <div className="z_logout_modal_bg">
          <div className="z_logout_modal">
            <div className="z_logout_modal_title">Are you sure you want to logout?</div>
            <div className="z_logout_modal_actions">
              <button
                className="z_logout_btn z_logout_confirm"
                onClick={async () => {
                  try {
                    // Call logout API
                    await authAPI.logout();

                    // Clear local auth data
                    logoutAuth();

                    // Redirect to login
                    navigate('/login');
                  } catch (error) {
                    console.error('Logout error:', error);
                    // Even if API fails, clear local data and redirect
                    logoutAuth();
                    navigate('/login');
                  }
                }}
              >
                Logout
              </button>
              <button className="z_logout_btn z_logout_cancel" onClick={() => setShowLogout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="z_logout_modal_bg">
          <div className="z_logout_modal">
            <div className="z_logout_modal_title">Edit Profile</div>

            <div className="container">
              <div className="row g-3 mt-2">

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="name"
                    value={editProfile.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="email"
                    value={editProfile.email}
                    onChange={handleEditChange}
                    placeholder="Email"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleEditChange}
                    placeholder="Phone"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="dob"
                    value={editProfile.dob}
                    onChange={handleEditChange}
                    type="date"
                    placeholder="Date of Birth"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="gender"
                    value={editProfile.gender}
                    onChange={handleEditChange}
                    placeholder="Gender"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="address"
                    value={editProfile.address}
                    onChange={handleEditChange}
                    placeholder="Address"
                  />
                </div>

              </div>
            </div>

            <div className="z_logout_modal_actions mt-5">
              <button className="z_logout_btn z_logout_confirm" onClick={handleEditSave}>Save</button>
              <button className="z_logout_btn z_logout_cancel" onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddressForm && (
        <div className="z_logout_modal_bg">
          <div className="z_logout_modal">
            <div className="z_logout_modal_title">
              {editingAddressIdx !== null ? 'Edit Address' : 'Add New Address'}
            </div>

            <div className="container">
              <div className="row g-3 mt-2">

                <div className="col-12">
                  <label className="z_form_label">Address Type <span className="z_required">*</span></label>
                  <input
                    className="form-control z_edit_input"
                    name="name"
                    value={addressForm.name}
                    onChange={handleAddressFormChange}
                    placeholder="e.g., Home, Office, Parents"
                  />
                </div>

                <div className="col-12">
                  <label className="z_form_label">Address <span className="z_required">*</span></label>
                  <textarea
                    className="form-control z_edit_input"
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressFormChange}
                    placeholder="Enter full address"
                    rows="3"
                  />
                </div>

                <div className="col-12">
                  <label className="z_form_label">Phone Number <span className="z_required">*</span></label>
                  <input
                    className="form-control z_edit_input"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressFormChange}
                    placeholder="e.g., +91 98765 43210"
                  />
                </div>

              </div>
            </div>

            <div className="z_logout_modal_actions mt-5">
              <button className="z_logout_btn z_logout_confirm" onClick={handleSaveAddress}>
                {editingAddressIdx !== null ? 'Update' : 'Add'} Address
              </button>
              <button className="z_logout_btn z_logout_cancel" onClick={() => setShowAddressForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default MyAccount;