import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FaArrowLeftLong } from 'react-icons/fa6';

function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!phone.trim()) {
        setError('Phone number is required');
        setLoading(false);
        return;
      }

      // Validate 10-digit phone
      if (!/^[0-9]{10}$/.test(phone.trim())) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      // Auto-attach +91 before sending
      const finalPhone = `+91${phone.trim()}`;
      console.log(finalPhone,"fp");
      

      await authAPI.sendOtp({ phone: finalPhone });

      localStorage.setItem('resetPhone', finalPhone);
      localStorage.removeItem('resetToken');

      setSuccess('OTP has been sent to your phone number');

      setTimeout(() => {
        navigate('/verify-otp');
      }, 1500);

    } catch (apiError) {
      setError(apiError.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="py-md-5 py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-md-5 p-3 py-4">
              <div className="text-center mb-md-4 mb-2">
                <h2 className="fw-bold mb-2">Forgot Password</h2>
                <p className="text-muted">
                  Enter the phone number linked to your account. We’ll text you an OTP via Twilio to reset your password.
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
                <Form.Group className="mb-md-4 mb-2">
                  <Form.Label className="fw-semibold">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    required
                    style={{ borderRadius: '8px', padding: '0.75rem' }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="danger"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading}
                  style={{ borderRadius: '8px', fontSize: '1rem' }}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/login" className="text-danger fw-semibold text-decoration-none">
                  <FaArrowLeftLong className='me-2' />
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

export default ForgotPassword;

