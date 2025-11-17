import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function JoinCommunity() {
  const communityImages = [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop'
  ];

  return (
    <section className="x_main-join-community py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            JOIN OUR COMMUNITY
          </h2>
        </div>
        <Row className="g-2 g-md-3">
          {communityImages.map((image, index) => (
            <Col key={index} xs={4} sm={4} md={4} lg={2} xl={2}>
              <div 
                className="position-relative overflow-hidden rounded x_main-community-image"
                style={{
                  aspectRatio: '1',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default JoinCommunity;

