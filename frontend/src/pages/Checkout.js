import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Modal, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../store';
import { orderAPI } from '../services/api';
import { clearCart } from '../store/cartSlice';
import { getUser, getToken } from '../utils/auth';
import { userAPI } from '../services/userAPI';

function Checkout() {
  const items = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUser();
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [phoneError, setPhoneError] = useState("");

  const handleChangep = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits
      const phoneValue = value.replace(/\D/g, "");

      if (phoneValue.length < 10) {
        setPhoneError("Phone number must be 10 digits.");
      } else if (phoneValue.length > 10) {
        setPhoneError("Only 10 digits are allowed.");
      } else {
        setPhoneError("");
      }

      setShippingData({
        ...shippingData,
        phone: phoneValue,
      });

      return;
    }

    setShippingData({
      ...shippingData,
      [name]: value,
    });
  };

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

  // Address selection modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');

  const openAddressModal = async () => {
    if (!user?.id) {
      setAddressError('Login required to load addresses');
      setShowAddressModal(true);
      return;
    }
    setShowAddressModal(true);
    setAddressError('');
    setAddressLoading(true);
    try {
      const resp = await userAPI.getAddresses(user.id);
      if (resp?.success) {
        setAddresses(resp.data || []);
      } else {
        setAddressError(resp?.message || 'Failed to load addresses');
      }
    } catch (err) {
      setAddressError(err.message || 'Failed to load addresses');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSelectAddress = (addr) => {
    if (!addr) return;
    setShippingData((prev) => ({
      ...prev,
      name: addr.fullname || prev.name,
      phone: addr.phone || prev.phone,
      address: addr.fullAddress || addr.address || prev.address
    }));
    setShowAddressModal(false);
  };


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
    setSuccess('');
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

      /* ==============================
         🟢 CASH ON DELIVERY FLOW
      =============================== */
      if (paymentMethod === "cod") {

        const resp = await orderAPI.createRazorpay({
          ...orderData,
          paymentMethod: "cod",
        });

        if (!resp.success) {
          setError(resp.message || "Failed to place COD order");
          setLoading(false);
          return;
        }

        setSuccess("Your order has been placed with Cash on Delivery.");
        dispatch(clearCart());

        setTimeout(() => navigate("/orders"), 1500);
        setLoading(false);
        return; // ⛔ Razorpay open nahi thase
      }


      /* ==============================
         🔵 ONLINE PAYMENT FLOW
      =============================== */

      const resp = await orderAPI.createRazorpay(orderData);

      if (!resp.success) {
        setError(resp.message || 'Failed to initiate payment');
        setLoading(false);
        return;
      }

      const { razorpayOrder, order, key } = resp.data;

      const loadRzp = () =>
        new Promise((resolve, reject) => {
          if (window.Razorpay) return resolve();
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

      await loadRzp();

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Yo Computer Hub',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        prefill: {
          name: shippingData.name,
          email: shippingData.email,
          contact: shippingData.phone
        },
        theme: { color: "#5588c9" },
        handler: async function (response) {
          try {
            const verifyResp = await orderAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id
            });

            if (verifyResp.success) {
              setSuccess("Payment successful and order placed!");
              dispatch(clearCart());
              setTimeout(() => navigate('/orders'), 1500);
            } else {
              setError(verifyResp.message || 'Payment verification failed');
            }
          } catch (err) {
            setError(err.message || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            setError('Payment process was cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

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
    <div className='x_che'>
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
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>

                  <Form.Control
                    name="phone"
                    placeholder="Enter your phone number"
                    value={shippingData.phone}
                    onChange={handleChangep}
                    isInvalid={!!phoneError}
                    maxLength={10}
                  />

                  <Form.Control.Feedback type="invalid">
                    {phoneError}
                  </Form.Control.Feedback>
                </Form.Group>

              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="address"
                    placeholder="123 Main St"
                    value={shippingData.address}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={openAddressModal}
                    disabled={!user}
                    style={{ borderColor: "#dee2e6", color: "#dee2e6" }}
                  >
                    Select Address
                  </Button>
                </InputGroup>
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
              <Form.Group className="mb-3 fg_radio">
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
                className="w-100 py-2 text-light fw-bold"
                disabled={loading || entries.length === 0}
              >
                {loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                {loading ? 'Processing...' : 'Place Order'}
              </Button>

            </Form>
          </Col>

          <Col md={6}>
            <h5>Order Summary</h5>
            <div className="table-responsive">
              <div className="table-scroll">
                <table className="table table-bordered  fixed-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody className="scroll-body">
                    {entries.map(([id, { product, qty }]) => (
                      <tr key={id}>
                        <td><img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        /></td>
                        <td className="text-nowrap">
                          {product.name.length > 60
                            ? product.name.substring(0, 60) + "..."
                            : product.name}
                        </td>
                        <td>{qty}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td className="fw-semibold">${(product.price * qty).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="total-box fw-bold mt-2 d-flex justify-content-between">
              <div>Total:</div>
              <div>${totalAmount.toFixed(2)}</div>
            </div>

          </Col>
        </Row>

        {/* Address Selection Modal */}
        <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Select Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addressLoading && (
              <div className="d-flex justify-content-center py-3">
                <Spinner animation="border" />
              </div>
            )}
            {addressError && <Alert variant="danger">{addressError}</Alert>}
            {!addressLoading && !addressError && (
              <div>
                {addresses.length === 0 ? (
                  <Alert variant="warning" className="mb-0">No saved addresses found. Please add one from your account.</Alert>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr._id || addr.id}
                      className="border rounded p-3 mb-3"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSelectAddress(addr)}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-light text-dark">{addr.name || 'Address'}</span>
                      </div>
                      <div className="fw-semibold">{addr.fullname || user?.name}</div>
                      <div className="text-muted">{addr.phone}</div>
                      <div className="small">{addr.fullAddress || addr.address}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddressModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div >
  );
}

export default Checkout;