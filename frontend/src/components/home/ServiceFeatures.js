import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ServiceFeatures() {
  const features = [
    {
      icon: 'bi-globe',
      title: 'Worldwide Shipping',
      description: 'Fast and reliable shipping to your door'
    },
    {
      icon: 'bi-arrow-counterclockwise',
      title: 'Money Back Guarantee',
      description: '30-day return policy on all products'
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure Payments',
      description: 'Safe and encrypted payment processing'
    },
    {
      icon: 'bi-headset',
      title: 'Online Support 24/7',
      description: 'Round the clock customer support'
    }
  ];

  return (
    <section className="x_main-service-features py-5">
      <Container>
        <Row className="g-3 g-md-4">
          {features.map((feature, index) => (
            <Col key={index} xs={6} sm={6} md={3} lg={3}>
              <Card className="h-100 border-0 shadow-sm text-center x_main-feature-card">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i 
                      className={`bi ${feature.icon}`} 
                      style={{ 
                        fontSize: '3rem', 
                        color: 'var(--color-red)'
                      }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted small mb-0">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ServiceFeatures;

