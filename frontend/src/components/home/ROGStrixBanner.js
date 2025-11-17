import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ROGStrixBanner() {
  return (
    <section className="x_main-rog-banner py-5">
      <Container>
        <div 
          className="rounded overflow-hidden shadow-lg position-relative"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
            minHeight: '300px',
            padding: '3rem 2rem'
          }}
        >
          <Row className="align-items-center">
            <Col md={6} className="text-white mb-4 mb-md-0">
              <Badge bg="danger" className="mb-3 px-3 py-2" style={{ fontSize: '0.9rem' }}>
                NEW ARRIVAL
              </Badge>
              <h2 className="display-5 fw-bold mb-3">ROG STRIX PRO XG32UQ</h2>
              <div className="d-flex gap-4 mb-3">
                <div>
                  <div className="fs-3 fw-bold text-danger">240Hz</div>
                  <div className="small text-light">Refresh Rate</div>
                </div>
                <div>
                  <div className="fs-3 fw-bold text-danger">1ms</div>
                  <div className="small text-light">Response Time</div>
                </div>
                <div>
                  <div className="fs-3 fw-bold text-danger">G-SYNC</div>
                  <div className="small text-light">Compatible</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="fs-2 fw-bold text-danger">$399.99</div>
                <div className="text-light text-decoration-line-through">$499.99</div>
              </div>
              <Button 
                as={Link} 
                to="/shop" 
                variant="danger" 
                size="lg"
                className="px-5 py-3"
              >
                Shop Now
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"
                alt="ROG Strix Pro XG32UQ Monitor"
                className="img-fluid"
                style={{
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.4))',
                  transform: 'perspective(1000px) rotateY(-10deg)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-10deg) scale(1)'}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default ROGStrixBanner;

