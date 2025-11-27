import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PromoBanners() {
  return (
    <section className="x_main-promo-banners py-4">
      <Container>
        <Row className="g-3">
          <Col lg={6}>
            <div
              className="position-relative rounded overflow-hidden shadow-lg"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://ap-razox.myshopify.com/cdn/shop/files/Mask_group_8.jpg?v=1713173088&width=690")',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '80%',
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <Row className="align-items-center w-100">
                <Col xl={6} lg={9} className="text-white mb-3 mb-md-0">
                  <h3 className="fw-bold mb-2" style={{ fontSize: '1.8rem' }}>GEFORCE RTX 3060TI</h3>
                  <p className="text-light mb-3">Powerful graphics for ultimate gaming experience</p>
                  <Button as={Link} to="/shop" variant="danger" size="lg" className='py-1 fw-500'>
                    Shop Now <FaCaretRight />
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>

          <Col lg={6}>
            <div
              className="position-relative rounded overflow-hidden shadow-lg"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://ap-razox.myshopify.com/cdn/shop/files/Mask_group_9.jpg?v=1713173088&width=690")',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '80%',
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <Row className="align-items-center w-100">
                <Col xl={6} lg={9} className="text-white mb-3 mb-md-0">
                  <h3 className="fw-bold mb-2" style={{ fontSize: '1.8rem' }}>AORUS ELITE AX AM5</h3>
                  <p className="text-light mb-3">Next-gen motherboard for AMD processors</p>
                  <Button as={Link} to="/shop" variant="danger" size="lg" className='py-1 fw-500'>
                    Shop Now <FaCaretRight />
                  </Button>
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

