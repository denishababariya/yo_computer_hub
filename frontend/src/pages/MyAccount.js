import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const navTabs = [
  { name: "MY PROFILE", key: "profile" },
  { name: "MY ORDER", key: "order" },
  { name: "ADDRESS BOOK", key: "address" },
  { name: "LOG OUT", key: "logout" }
];

const initialProfile = {
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  name: "Jay Patel",
  email: "jay.patel@email.com",
  phone: "+91 98765 43210",
  dob: "1998-05-12",
  gender: "Male",
  address: "203, Sunrise Avenue, Ahmedabad, Gujarat, India"
};

function MyAccount() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogout, setShowLogout] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(initialProfile);

  const handleEditChange = e => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    setProfile(editProfile);
    setShowEdit(false);
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
                        if(tab.key === "logout") setShowLogout(true);
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
        <div className="z_profile_card">
          <button className="z_profile_edit_btn" title="Edit Profile" onClick={() => setShowEdit(true)}>
            <FiEdit2 size={22} />
          </button>
          <div className="z_profile_avatar_wrap">
            <img src={profile.avatar} alt="Profile" className="z_profile_avatar" />
            <span className="z_profile_camera_icon"><FaCamera size={20} /></span>
          </div>
          <div className="z_profile_info">
            <div className="z_profile_row"><div className="z_profile_label">Name:</div><div className="z_profile_value">{profile.name}</div></div>
            <div className="z_profile_row"><div className="z_profile_label">Email:</div><div className="z_profile_value">{profile.email}</div></div>
            <div className="z_profile_row"><div className="z_profile_label">Phone:</div><div className="z_profile_value">{profile.phone}</div></div>
            <div className="z_profile_row"><div className="z_profile_label">Date of Birth:</div><div className="z_profile_value">{profile.dob}</div></div>
            <div className="z_profile_row"><div className="z_profile_label">Gender:</div><div className="z_profile_value">{profile.gender}</div></div>
            <div className="z_profile_row"><div className="z_profile_label">Address:</div><div className="z_profile_value">{profile.address}</div></div>
          </div>
        </div>
      </>
    )}
    {activeTab === "order" && (
      <>
        <div className="z_acc_tab_heading">MY ORDER</div>
        <div className="z_order_card">
          <div className="z_order_title">My Orders</div>
          <div className="z_order_empty">No orders yet. Start shopping now!</div>
        </div>
      </>
    )}
    {activeTab === "address" && (
      <>
        <div className="z_acc_tab_heading">ADDRESS BOOK</div>
        <div className="z_address_card">
          <div className="z_address_title">Address Book</div>
          <div className="z_address_empty">No addresses saved. Add a new address!</div>
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
              <button className="z_logout_btn z_logout_confirm" onClick={() => {/* handle logout */}}>Logout</button>
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

    </section>
  );
}

export default MyAccount;