import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../store';
import { orderAPI } from '../services/api';
import { getUser, getToken } from '../utils/auth';

function Checkout() {
  const items = useSelector(selectCartItems);
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!token || !user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [token, user]);

  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const entries = Object.entries(items);
  const cartItems = entries.map(([id, { product, qty }]) => ({
    productId: product._id || product.id,
    productName: product.name,
    price: product.price,
    quantity: qty,
    image: product.image
  }));

  const totalAmount = entries.reduce((s, [, { product, qty }]) => s + product.price * qty, 0);

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) {
        setError('Please login to place an order');
        setLoading(false);
        return;
      }

      if (entries.length === 0) {
        setError('Your cart is empty');
        setLoading(false);
        return;
      }

      const orderData = {
        userId: user.id,
        items: cartItems,
        totalAmount,
        shippingAddress: shippingData,
        paymentMethod
      };

      const response = await orderAPI.create(orderData);

      if (response.success) {
        setSuccess('Order placed successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(response.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-4 text-center">
        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h1 className="mb-3">Login Required</h1>
            <p className="fs-5 mb-md-4 mb-2 text-muted">You need to be logged in to proceed with checkout.</p>
            <div className="d-flex gap-2 justify-content-center">
              <Button 
                variant="danger" 
                size="lg"
                onClick={() => navigate('/login', { state: { from: '/checkout' } })}
              >
                Go to Login
              </Button>
              <Button 
                variant="outline-dark" 
                size="lg"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Checkout</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="g-3">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h5>Shipping Details</h5>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                value={shippingData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={shippingData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                placeholder="123 Main St"
                value={shippingData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                placeholder="Toronto"
                value={shippingData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                placeholder="Ontario"
                value={shippingData.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                name="zipCode"
                placeholder="M5V 3A8"
                value={shippingData.zipCode}
                onChange={handleChange}
              />
            </Form.Group>

            <h5 className="mt-4">Payment Method</h5>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="UPI"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Debit/Credit Card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="danger"
              className="w-100 py-2"
              disabled={loading || entries.length === 0}
            >
              {loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h5>Order Summary</h5>
          <div className="card p-3">
            {entries.map(([id, { product, qty }]) => (
              <div key={id} className="d-flex justify-content-between mb-2">
                <span>{product.name} x {qty}</span>
                <span>${(product.price * qty).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;