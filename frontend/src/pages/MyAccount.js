import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
// Note: Assuming these services/utils are correctly implemented elsewhere
import { userAPI } from "../services/userAPI";
import { authAPI } from "../services/api";
import { logout as logoutAuth } from "../utils/auth";
import emptyAdd from "../img/no_add.png";
import emptyOrd from "../img/em_ord.png";
import DModal from "../components/DModal";

const navTabs = [
  { name: "MY PROFILE", key: "profile" },
  { name: "MY ORDER", key: "order" },
  { name: "ADDRESS BOOK", key: "address" },
  { name: "LOG OUT", key: "logout" },
];

const initialProfile = {
  avatar: "",
  name: "Jay Patel",
  email: "jay.patel@email.com",
  phone: "9876543210",
  dob: "1998-05-12",
  gender: "Male",
  address: "203, Sunrise Avenue, Ahmedabad, Gujarat, India",
};

// 🆕 Gender options array
const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editingAddressIdx, setEditingAddressIdx] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const userId = localStorage.getItem("userId") || "demo-user-id";

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
      console.error("Error fetching user data:", error);
      setProfile(initialProfile);
      setEditProfile(initialProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    let newValue = value;

    if (name === "name") {
      const nameRegex = /^[a-zA-Z\s.-]*$/;
      if (!nameRegex.test(value)) {
        error = "Name can only contain letters, spaces, dots, or hyphens.";
      }
    } else if (name === "phone") {
      newValue = value.replace(/[^0-9+]/g, "");

      if (value !== "" && value.replace(/[^0-9+]/g, "") !== value) {
        error = "Phone number should only contain numbers.";
      }

      if (newValue.length > 15) {
        newValue = newValue.substring(0, 15);
      }
    }

    setEditProfile((prev) => ({ ...prev, [name]: newValue }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleEditSave = async () => {
    // Clear previous errors
    const errors = {};

    // Check for existing validation errors
    if (validationErrors.name || validationErrors.phone) {
      alert("Please correct the validation errors before saving.");
      return;
    }

    // Validate all required fields
    if (!editProfile.name || !editProfile.name.trim()) {
      errors.name = "Name is required";
    }

    if (!editProfile.email || !editProfile.email.trim()) {
      errors.email = "Email is required";
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editProfile.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!editProfile.phone || !editProfile.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (editProfile.phone.replace(/[^0-9]/g, "").length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }

    if (!editProfile.dob || !editProfile.dob.trim()) {
      errors.dob = "Date of Birth is required";
    }

    if (!editProfile.gender || editProfile.gender === "") {
      errors.gender = "Please select a gender";
    }

    if (!editProfile.address || !editProfile.address.trim()) {
      errors.address = "Address is required";
    }

    // If there are validation errors, update state and show alert
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // alert('Please fill all required fields correctly.');
      return;
    }

    try {
      const response = await userAPI.updateProfile(userId, editProfile);
      if (response.success) {
        setProfile(response.data);
        setShowEdit(false);
        setValidationErrors({});
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Image size should be less than 5MB");
          return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageData = event.target.result;
          setEditProfile({ ...editProfile, avatar: imageData });
          setProfile({ ...profile, avatar: imageData });

          try {
            const updatedProfileData = { ...profile, avatar: imageData };
            await userAPI.updateProfile(userId, updatedProfileData);
            alert("Profile picture updated successfully");
          } catch (error) {
            console.error("Error updating avatar:", error);
            alert("Failed to update profile picture");
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    setEditingAddressIdx(null);
    setAddressForm({ name: "", address: "", phone: "" });
    setShowAddressForm(true);
  };

  const handleEditAddress = (idx) => {
    setEditingAddressIdx(idx);
    setAddressForm(addresses[idx]);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (idx) => {
    setDeleteIndex(idx);
    setShowDeleteModal(true);
  };
  const confirmDeleteAddress = async () => {
    try {
      const addressId = addresses[deleteIndex]._id;

      if (addressId) {
        const response = await userAPI.deleteAddress(userId, addressId);

        if (response.success) {
          setAddresses(response.data);
        }
      } else {
        setAddresses((prev) => prev.filter((_, i) => i !== deleteIndex));
      }

      setShowDeleteModal(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSaveAddress = async () => {
    // Basic Validation
    if (!addressForm.name.trim()) {
      alert("Please select Address Type");
      return;
    }
    if (!addressForm.address.trim()) {
      alert("Please enter address");
      return;
    }
    if (!addressForm.phone.trim() || addressForm.phone.length !== 10) {
      alert("Please enter valid 10-digit phone number");
      return;
    }

    try {
      let response;

      // 🟦 UPDATE Address
      if (editingAddressIdx !== null) {
        const addressId = addresses[editingAddressIdx]._id;

        response = await userAPI.updateAddress(userId, addressId, addressForm);

        if (response.success) {
          setAddresses(response.data); // backend returns updated array
          alert("Address updated successfully");
        }
      } else {
        // 🟩 ADD NEW Address → Backend push into array
        response = await userAPI.addAddress(userId, addressForm);

        if (response.success) {
          setAddresses(response.data); // updated full array from backend
          alert("Address added successfully");
        }
      }

      setShowAddressForm(false);
      setAddressForm({ name: "", address: "", phone: "" });
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    }
  };

  const handlePayOrder = async (orderId) => {
    try {
      const order = orders.find((o) => o.id === orderId);

      // 1. Create Razorpay order on backend
      const createOrder = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.total,
          orderId: orderId,
        }),
      }).then((res) => res.json());

      if (!createOrder.success) {
        alert("Unable to create payment. Try again!");
        return;
      }

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: createOrder.order.amount,
        currency: "INR",
        name: "Your Brand",
        description: "Order Payment",
        order_id: createOrder.order.id,

        handler: async function (response) {
          // 2. Verify payment on backend
          const verifyRes = await fetch(
            "http://localhost:5000/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userOrderId: orderId,
              }),
            }
          ).then((res) => res.json());

          if (verifyRes.success) {
            alert("Payment Successful!");

            // Update front-end order status instantly
            setOrders((prev) =>
              prev.map((o) => (o.id === orderId ? { ...o, status: "Paid" } : o))
            );
          } else {
            alert("Payment failed to verify!");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed!");
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
                {navTabs.map((tab) => (
                  <li key={tab.key}>
                    <button
                      className={`z_acc_nav_btn${
                        activeTab === tab.key ? " active" : ""
                      }`}
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
                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="z_profile_avatar_section">
                            <div className="z_profile_avatar_wrap">
                              <img
                                src={profile.avatar}
                                alt="Profile"
                                className="z_profile_avatar"
                              />
                              <button
                                className="z_profile_camera_icon"
                                onClick={handleCameraClick}
                                title="Change Profile Picture"
                                type="button"
                              >
                                <FaCamera size={20} />
                              </button>
                            </div>
                            <h4 className="z_profile_name_heading">
                              {profile.name}
                            </h4>
                            <p className="z_profile_email_heading">
                              {profile.email}
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-8 col-lg-9">
                          <div className="z_profile_details_section">
                            <div className="z_profile_header">
                              <h5 className="z_profile_section_title">
                                Personal Information
                              </h5>
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
                                <label className="z_profile_detail_label">
                                  Full Name
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.name}
                                </p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">
                                  Email Address
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.email}
                                </p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">
                                  Phone Number
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.phone}
                                </p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">
                                  Date of Birth
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.dob}
                                </p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">
                                  Gender
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.gender}
                                </p>
                              </div>

                              <div className="z_profile_detail_item">
                                <label className="z_profile_detail_label">
                                  Address
                                </label>
                                <p className="z_profile_detail_value">
                                  {profile.address}
                                </p>
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
                        <div className=" text-center d-flex flex-column align-items-center justify-content-center ">
                          <img
                            src={emptyOrd}
                            alt="Empty Wishlist"
                            className="empty-icon mb-md-2 mb-2"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "contain",
                              opacity: 0.7,
                            }}
                          />
                          <p
                            className="empty-text"
                            style={{ fontSize: "1.2rem", fontWeight: "00" }}
                          >
                            No orders yet. Start shopping now!
                          </p>
                        </div>
                      ) : (
                        <div className="z_order_list">
                          {orders.map((order) => (
                            <div className="z_order_item_card" key={order.id}>
                              <div className="z_order_header">
                                <div className="z_order_id_date">
                                  <h5 className="z_order_id">
                                    Order #{order.id}
                                  </h5>
                                  <p className="z_order_date">{order.date}</p>
                                </div>
                                <div
                                  className={`z_order_status text-secondary z_status_${order.status.toLowerCase()}`}
                                >
                                  {order.status}
                                </div>
                              </div>

                              <div className="z_order_products">
                                {order.items.map((item, idx) => (
                                  <div className="z_product_item" key={idx}>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="z_product_image"
                                    />
                                    <div className="z_product_details">
                                      <p className="z_product_name">
                                        {item.name}
                                      </p>
                                      <p className="z_product_price">
                                        {item.price}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="z_order_footer">
                                {/* 🆕 NEW: Pay button for pending orders */}
                                {order.status.toLowerCase() === "pending" && (
                                  <button
                                    className="btn btn-success z_pay_order_btn"
                                    onClick={() => handlePayOrder(order.id)}
                                    style={{
                                      marginLeft: "15px",
                                      padding: "8px 20px",
                                      fontWeight: "600",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <i className="bi bi-credit-card"></i> Pay
                                    Now
                                  </button>
                                )}

                                <div className="z_order_total">
                                  <span className="z_total_label">
                                    Total Amount:
                                  </span>
                                  <span className="z_total_value">
                                    {order.total}
                                  </span>
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
                        <div className=" text-center d-flex flex-column align-items-center justify-content-center ">
                          <img
                            src={emptyAdd}
                            alt="Empty Wishlist"
                            className="empty-icon mb-md-2 mb-2"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "contain",
                              opacity: 0.7,
                            }}
                          />
                          <p
                            className="empty-text"
                            style={{ fontSize: "1.2rem", fontWeight: "00" }}
                          >
                            No addresses saved. Add a new address!
                          </p>
                        </div>
                      ) : (
                        <div className="row g-4">
                          {addresses.map((addr, idx) => (
                            <div className="col-12 col-sm-6 col-lg-6" key={idx}>
                              <div className="z_address_item">
                                <div className="z_address_header">
                                  <h5 className="z_address_name">
                                    {addr.name}
                                  </h5>
                                  <span className="z_address_badge">
                                    {addr.name}
                                  </span>
                                </div>

                                <div className="z_address_body">
                                  <div className="z_address_field">
                                    <label className="z_address_label">
                                      Address
                                    </label>
                                    <p className="z_address_value">
                                      {addr.address}
                                    </p>
                                  </div>

                                  <div className="z_address_field">
                                    <label className="z_address_label">
                                      Phone
                                    </label>
                                    <p className="z_address_value">
                                      {addr.phone}
                                    </p>
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

                {activeTab !== "profile" &&
                  activeTab !== "order" &&
                  activeTab !== "address" && (
                    <div className="z_acc_tab_content">
                      {navTabs.find((t) => t.key === activeTab).name}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLogout && (
        <div className="z_logout_modal_bg">
          <div className="z_logout_modal_big">
            <button
              className="z_logout_close_btn"
              onClick={() => setShowLogout(false)}
            >
              ✕
            </button>

            <div className="z_logout_modal_body">
              <div className="z_logout_left">
                <img
                  src={profile.avatar}
                  alt="User"
                  className="z_logout_user_img"
                />
              </div>

              <div className="z_logout_right">
                <h2 className="z_logout_title">Logout</h2>
                <p className="z_logout_message">
                  Are you sure you want to logout?
                  <br />
                  You will need to login again to access your account.
                </p>

                <div className="z_logout_footer">
                  <button
                    className="z_logout_btn_confirm"
                    onClick={async () => {
                      try {
                        await authAPI.logout();
                        logoutAuth();
                        navigate("/login");
                      } catch (error) {
                        console.error("Logout error:", error);
                        logoutAuth();
                        navigate("/login");
                      }
                    }}
                  >
                    Logout
                  </button>

                  <button
                    className="z_logout_btn_cancel"
                    onClick={() => setShowLogout(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <DModal
        show={showDeleteModal}
        type="delete"
        title="Delete Address"
        message="Are you sure you want to delete this address?"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteAddress}
      />

      {/* 🆕 MODIFIED: Edit Profile Modal with Gender Dropdown */}
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
                    placeholder="Full Name"
                  />
                  {validationErrors.name && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="email"
                    value={editProfile.email}
                    onChange={handleEditChange}
                    placeholder="Email Address"
                  />
                  {validationErrors.email && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleEditChange}
                    placeholder="Phone Number (Digits Only)"
                  />
                  {validationErrors.phone && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.phone}
                    </p>
                  )}
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
                  {validationErrors.dob && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.dob}
                    </p>
                  )}
                </div>

                {/* 🆕 Gender Dropdown Selection */}
                <div className="col-12 col-md-6">
                  <select
                    className="form-control z_edit_input"
                    name="gender"
                    value={editProfile.gender}
                    onChange={handleEditChange}
                    style={{
                      appearance: "auto",
                      cursor: "pointer",
                    }}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.gender && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.gender}
                    </p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    className="form-control z_edit_input"
                    name="address"
                    value={editProfile.address}
                    onChange={handleEditChange}
                    placeholder="Address"
                  />
                  {validationErrors.address && (
                    <p
                      className="text-danger small mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {validationErrors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="z_logout_modal_actions mt-5">
              <button
                className="z_logout_btn z_logout_confirm"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="z_logout_btn z_logout_cancel"
                onClick={() => {
                  setShowEdit(false);
                  setValidationErrors({});
                  setEditProfile(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddressForm && (
        <div className="z_logout_modal_bg">
          <div className="z_logout_modal">
            <div className="z_logout_modal_title">
              {editingAddressIdx !== null ? "Edit Address" : "Add New Address"}
            </div>

            <div className="container">
              <div className="row g-3 mt-2">
                {/* Address Type */}
                <div className="col-12">
                  <label className="z_form_label">
                    Address Type <span className="z_required">*</span>
                  </label>
                  <select
                    className="form-control z_edit_input"
                    name="name"
                    value={addressForm.name}
                    onChange={handleAddressFormChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="z_form_label">
                    Address <span className="z_required">*</span>
                  </label>
                  <textarea
                    className="form-control z_edit_input"
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressFormChange}
                    placeholder="Enter full address"
                    rows="3"
                  />
                </div>

                {/* Phone */}
                <div className="col-12">
                  <label className="z_form_label">
                    Phone Number <span className="z_required">*</span>
                  </label>
                  <input
                    className="form-control z_edit_input"
                    name="phone"
                    maxLength={10}
                    value={addressForm.phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      setAddressForm((prev) => ({ ...prev, phone: onlyNums }));
                    }}
                    placeholder="Enter 10-digit phone number"
                  />
                </div>
              </div>
            </div>

            <div className="z_logout_modal_actions mt-5">
              <button
                className="z_logout_btn z_logout_confirm"
                onClick={handleSaveAddress}
              >
                {editingAddressIdx !== null ? "Update" : "Add"} Address
              </button>
              <button
                className="z_logout_btn z_logout_cancel"
                onClick={() => setShowAddressForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyAccount;
