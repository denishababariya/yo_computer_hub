import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white mt-auto position-relative">
      {/* Top Footer Section */}
      <div className="border-bottom border-secondary py-4">
        <Container fluid="xxl">
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                {/* <i className="bi bi-telephone me-3" style={{ fontSize: '1.5rem' }}></i> */}
                <a href="tel:+14165550199"  style={{ fontSize: '1.1rem', textDecoration: 'none' }}>
                  <i className="bi bi-telephone me-3" style={{ fontSize: '1.5rem' }}></i>
                  
                </a>

                <div>
                  <div className="fw-semibold mb-1">Order And Service</div>
                  <div className="text-danger fw-bold" style={{ fontSize: '1.1rem' }}>
                    (416) 555 - 0199
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h6 className="fw-bold mb-2">Subscribe to our mailing list</h6>
                <p className="text-secondary small mb-3">
                  Sign up for special perks starting now with a 10% Off Coupon!
                </p>
                <Form onSubmit={handleSubscribe} className="d-flex gap-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-dark border-0"
                    style={{ flex: 1, borderRadius: '4px' }}
                  />
                  <Button
                    type="submit"
                    variant="dark"
                    className="px-4 border border-white d-flex align-items-center"
                    style={{ borderRadius: '4px' }}
                  >
                    Subscribe <i className="bi bi-arrow-right ms-2 text-danger"></i>
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Section */}
      <Container fluid="xxl" className="py-md-5 py-4">
        <Row className="gy-4">
          <Col lg={3} md={4} sm={6} xs={6}>
            <h6 className="fw-bold mb-3">Customer Support</h6>
            <ul className="list-unstyled m-0">
              <li className="mb-2"><Link to="/helpcenter" className="text-secondary text-decoration-none">Help Center</Link></li>
              <li className="mb-2"><Link to="/account" className="text-secondary text-decoration-none">My Account</Link></li>
              <li className="mb-2"><Link to="/wishlist" className="text-secondary text-decoration-none">Wish List</Link></li>
              <li className="mb-2"><Link to="/privacypolicy" className="text-secondary text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={4} sm={6} xs={6}>
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled m-0">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-secondary text-decoration-none">Blog</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link></li>
              <li className="mb-2"><Link to="/term" className="text-secondary text-decoration-none">Terms of Service</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={4} sm={6} xs={6}>
            <h6 className="fw-bold mb-3">Shopping</h6>
            <ul className="list-unstyled m-0">
              <li className="mb-2"><Link to="/shop" className="text-secondary text-decoration-none">Shop</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-secondary text-decoration-none">Cart</Link></li>
              <li className="mb-2"><Link to="/checkout" className="text-secondary text-decoration-none">Checkout</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-secondary text-decoration-none">FAQ</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={4} sm={6} xs={12}>
            <di v className="mb-md-4 mb-2">
              <div className="mb-2" style={{ fontSize: '0.95rem' }}>
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </div>
              <Link to="/contact" className="text-danger text-decoration-none fw-semibold">
                Send Message <i className="bi bi-arrow-right"></i>
              </Link>
            </di>
            <div className="mb-3 text-secondary small">
              Mon - Fri: 9am - 5pm
            </div>
            <div className="d-flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white rounded p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', textDecoration: 'none' }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white rounded p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white rounded p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', textDecoration: 'none' }}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white rounded p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', textDecoration: 'none' }}
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="mt-4 pt-4 border-top border-secondary align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="text-secondary small">
              Copyright © {year} Yo Computer Hub. All Rights Reserved.
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end align-items-center">
              <span className="text-secondary small">Payment Methods:</span>
              <div className="d-flex gap-2">
                <i className="bi bi-credit-card-2-front text-secondary" style={{ fontSize: '1.5rem' }} title="Mastercard"></i>
                <i className="bi bi-paypal text-secondary" style={{ fontSize: '1.5rem' }} title="PayPal"></i>
                <i className="bi bi-credit-card text-secondary" style={{ fontSize: '1.5rem' }} title="Visa"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="position-fixed bottom-0 end-0 m-4 text-white border-0 rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: '45px',
          height: '45px',
          zIndex: 1000,
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          backgroundColor: 'rgb(51, 51, 51)',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#5588c9'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
        title="Scroll to top"
      >
        <i className="bi bi-chevron-up bg-transparent" style={{ fontSize: '1.2rem' }}></i>
      </button>
    </footer>
  );
}

export default AppFooter;
