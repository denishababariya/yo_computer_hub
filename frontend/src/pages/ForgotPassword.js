import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email) {
        // Store email in localStorage for OTP verification
        localStorage.setItem('resetEmail', email);
        setLoading(false);
        setSuccess('OTP has been sent to your email address');
        setTimeout(() => {
          navigate('/verify-otp');
        }, 2000);
      } else {
        setError('Please enter your email address');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Forgot Password</h2>
                <p className="text-muted">
                  Enter your email address and we'll send you an OTP to reset your password.
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
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                  <i className="bi bi-arrow-left me-2"></i>
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

