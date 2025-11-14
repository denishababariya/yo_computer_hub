import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white mt-auto">
      <Container className="py-4">
        <Row className="gy-3">
          <Col md={4}>
            <h5>Yo Computer Hub</h5>
            <p className="text-secondary">Parts, peripherals, and builds at fair Canadian prices.</p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled m-0">
              <li><a href="/shop">Shop</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Newsletter</h6>
            <div className="d-flex gap-2">
              <input className="form-control" placeholder="Email" />
              <button className="btn btn-theme">Join</button>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <div className="text-center text-secondary">© {year} Yo Computer Hub. All rights reserved.</div>
      </Container>
    </footer>
  );
}

export default AppFooter;