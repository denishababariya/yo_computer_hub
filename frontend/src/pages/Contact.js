import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Contact() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">Contact Us</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Your name" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="you@example.com" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="How can we help?" />
            </Form.Group>
            <Button variant="primary">Send</Button>
          </Form>
        </Col>
        <Col md={6}>
          <div className="p-3 bg-light rounded h-100">
            <h5>Yo Computer Hub</h5>
            <p className="mb-1">Toronto, Canada</p>
            <p className="mb-1">support@yocomputerhub.example</p>
            <p>Mon–Fri 9am–6pm</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;