import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Checkout() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">Checkout</h1>
      <Row className="g-3">
        <Col md={6}>
          <Form>
            <h5>Billing Details</h5>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control placeholder="John Doe" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="john@example.com" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="123 Main St" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Toronto" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <Form>
            <h5>Payment</h5>
            <Form.Group className="mb-2">
              <Form.Label>Card Number</Form.Label>
              <Form.Control placeholder="1234 5678 9012 3456" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Expiry</Form.Label>
                  <Form.Control placeholder="MM/YY" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control placeholder="123" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" className="mt-2">Place Order</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;