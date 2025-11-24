import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { authAPI } from '../services/api';
import { FaArrowLeftLong } from 'react-icons/fa6';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [phone] = useState(() => localStorage.getItem('resetPhone') || '');
  const [resetToken] = useState(() => localStorage.getItem('resetToken') || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!phone || !resetToken) {
      navigate('/forgot-password');
    }
  }, [navigate, phone, resetToken]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!phone || !resetToken) {
      setError('Session expired. Please restart the process.');
      setLoading(false);
      return;
    }

    try {
      await authAPI.resetPassword({
        phone,
        token: resetToken,
        password: formData.password
      });
      setSuccess('Password has been reset successfully!');
      localStorage.removeItem('resetPhone');
      localStorage.removeItem('resetToken');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (apiError) {
      setError(apiError.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-md-5 py-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-md-4 mb-2">
                <h2 className="fw-bold mb-2">Reset Password</h2>
                <p className="text-muted">
                  Enter your new password below.
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-3">
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <PasswordInput
                  label="New Password"
                  name="password"
                  placeholder="Enter your new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted d-block mb-3">
                  Password must be at least 6 characters
                </Form.Text>

                <PasswordInput
                  label="Confirm New Password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="danger"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading}
                  style={{ borderRadius: '8px', fontSize: '1rem' }}
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/login" className="text-danger fw-semibold text-decoration-none">
                  <FaArrowLeftLong className='me-2'/>
                  Back to Login
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;

