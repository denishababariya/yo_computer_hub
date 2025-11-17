import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      if (formData.email && formData.password) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          loggedIn: true
        }));
        setLoading(false);
        navigate('/');
        window.location.reload();
      } else {
        setError('Please fill in all fields');
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
                <h2 className="fw-bold mb-2">Login</h2>
                <p className="text-muted">Welcome back! Please login to your account.</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '8px', padding: '0.75rem' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '8px', padding: '0.75rem' }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="text-muted"
                  />
                  <Link to="/forgot-password" className="text-danger text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="danger"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading}
                  style={{ borderRadius: '8px', fontSize: '1rem' }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-danger fw-semibold text-decoration-none">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

