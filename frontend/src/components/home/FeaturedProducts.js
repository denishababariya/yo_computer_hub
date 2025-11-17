import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      title: 'X5 GAMING MOUSE',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop',
      link: '/shop'
    },
    {
      id: 2,
      title: 'NXSYS AERO GAMING CHAIR',
      price: '$349.99',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=800&auto=format&fit=crop',
      link: '/shop'
    },
    {
      id: 3,
      title: 'E910 5.8G WIRELESS HEADSET',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      link: '/shop'
    }
  ];

  return (
    <section className="x_main-featured-products py-5">
      <Container>
        <Row className="g-3 g-md-4">
          {featuredProducts.map((product) => (
            <Col key={product.id} md={4} xs={12}>
              <div 
                className="position-relative rounded overflow-hidden shadow-lg x_main-featured-card"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  color: 'white'
                }}
              >
                <div>
                  <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                    {product.title}
                  </h3>
                  <div 
                    className="mb-3"
                    style={{
                      aspectRatio: '16/9',
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold fs-4 text-danger">{product.price}</div>
                  </div>
                  <Button 
                    as={Link} 
                    to={product.link} 
                    variant="danger" 
                    size="lg"
                    className="px-4"
                  >
                    Add Now
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedProducts;

