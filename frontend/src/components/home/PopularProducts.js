import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import products from '../../data/products';

function PopularProducts() {
  const popularProducts = products.slice(0, 6);

  return (
    <section className="x_main-popular-products py-5 bg-light">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-danger fw-bold m-0" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            POPULAR PRODUCTS
          </h2>
          <Button as={Link} to="/shop" variant="outline-danger" className="d-none d-md-block">
            View More
          </Button>
        </div>
        
        <Row xs={1} sm={2} md={3} className="g-3">
          {popularProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
          {/* Promotional Card */}
          <Col xs={12} sm={12} md={3}>
            <div 
              className="h-100 rounded overflow-hidden shadow-sm position-relative x_main-promo-card"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                minHeight: '350px',
                padding: '2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 className="fw-bold mb-3">OPTIMIZED FOR YOUR BUDGET</h4>
                <p className="text-light mb-4">Find the perfect gaming setup that fits your needs</p>
              </div>
              <div 
                className="mb-3 position-relative overflow-hidden rounded"
                style={{
                  aspectRatio: '16/9',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px'
                }}
              >
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                  }}
                />
              </div>
              <Button as={Link} to="/shop" variant="danger" className="w-100">
                Shop Now
              </Button>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-4 d-md-none">
          <Button as={Link} to="/shop" variant="outline-danger">
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default PopularProducts;

