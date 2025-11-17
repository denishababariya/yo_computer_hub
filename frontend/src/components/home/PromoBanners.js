import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PromoBanners() {
  return (
    <section className="x_main-promo-banners py-4">
      <Container>
        <Row className="g-3">
          <Col md={6}>
            <div 
              className="position-relative rounded overflow-hidden shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                minHeight: '250px',
                display: 'flex',
                alignItems: 'center',
                padding: '2rem'
              }}
            >
              <Row className="align-items-center w-100">
                <Col md={6} className="text-white mb-3 mb-md-0">
                  <h3 className="fw-bold mb-2" style={{ fontSize: '1.8rem' }}>GEFORCE RTX 3060TI</h3>
                  <p className="text-light mb-3">Powerful graphics for ultimate gaming experience</p>
                  <Button as={Link} to="/shop" variant="danger" size="lg">
                    Shop Now
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1606813907291-76b6a0f0e8c2?q=80&w=800&auto=format&fit=crop"
                    alt="NVIDIA GeForce RTX 3060TI"
                    className="img-fluid"
                    style={{
                      maxHeight: '200px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={6}>
            <div 
              className="position-relative rounded overflow-hidden shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                minHeight: '250px',
                display: 'flex',
                alignItems: 'center',
                padding: '2rem'
              }}
            >
              <Row className="align-items-center w-100">
                <Col md={6} className="text-white mb-3 mb-md-0">
                  <h3 className="fw-bold mb-2" style={{ fontSize: '1.8rem' }}>AORUS ELITE AX AM5</h3>
                  <p className="text-light mb-3">Next-gen motherboard for AMD processors</p>
                  <Button as={Link} to="/shop" variant="danger" size="lg">
                    Shop Now
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=800&auto=format&fit=crop"
                    alt="AORUS ELITE AX AM5"
                    className="img-fluid"
                    style={{
                      maxHeight: '200px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PromoBanners;

