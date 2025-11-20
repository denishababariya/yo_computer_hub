import React, { useState } from 'react';
import '../styles/z_style.css';
import contactAPI from '../services/contactAPI';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        setErrorMessage('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Call API to create contact
      const response = await contactAPI.createContact(formData);

      if (response.success) {
        setSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      console.error('Error submitting contact form:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <form className="z_contact_form" onSubmit={handleSubmit}>
            {successMessage && (
              <div style={{
                padding: '12px',
                marginBottom: '15px',
                backgroundColor: '#d4edda',
                color: '#155724',
                borderRadius: '4px',
                border: '1px solid #c3e6cb'
              }}>
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div style={{
                padding: '12px',
                marginBottom: '15px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '4px',
                border: '1px solid #f5c6cb'
              }}>
                {errorMessage}
              </div>
            )}
            <div className="z_contact_row">
              <div className="z_contact_field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="z_contact_input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="z_contact_field">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  className="z_contact_input"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="z_contact_row">
              <div className="z_contact_field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="z_contact_input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="z_contact_field">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="z_contact_input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="z_contact_field_full">
              <label>Want to know more? Drop us a line!</label>
              <textarea
                name="message"
                className="z_contact_textarea"
                rows={2}
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="z_contact_form_footer">
              <button
                type="submit"
                className="z_contact_send_btn"
                disabled={loading}
              >
                <span className="z_contact_send_icon">
                  <span className="z_contact_send_dot"></span>
                </span>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;