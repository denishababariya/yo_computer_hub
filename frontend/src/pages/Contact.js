import React from 'react';
import '../styles/z_style.css';

function Contact() {
  return (
    <div className="z_contact_bg">
      <div className="container">
        <div className="z_contact_heading">Contact</div>
        <div className="z_contact_content">
          <div className="z_contact_left">
            <div className="z_contact_btn_group">
              <button className="z_contact_btn_active">Retail Enquiries</button>
            </div>
            <div className="z_contact_address">
              <div>416.781.9105</div>
              <div>240 Spinnaker Way</div>
              <div>Units 2-6</div>
              <div>Concord, ON Canada</div>
              <div>L4K 4P9</div>
            </div>
          </div>
          <form className="z_contact_form">
            <div className="z_contact_row">
              <div className="z_contact_field">
                <label>Name</label>
                <input type="text" className="z_contact_input" />
              </div>
              <div className="z_contact_field">
                <label>Company</label>
                <input type="text" className="z_contact_input" />
              </div>
            </div>
            <div className="z_contact_row">
              <div className="z_contact_field">
                <label>Email</label>
                <input type="email" className="z_contact_input" />
              </div>
              <div className="z_contact_field">
                <label>Phone</label>
                <input type="text" className="z_contact_input" />
              </div>
            </div>
            <div className="z_contact_field_full">
              <label>Want to know more? Drop us a line!</label>
              <textarea className="z_contact_textarea" rows={2}></textarea>
            </div>
            <div className="z_contact_form_footer">
              <button className="z_contact_send_btn">
                <span className="z_contact_send_icon">
                  <span className="z_contact_send_dot"></span>
                </span>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;