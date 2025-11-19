import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    headline: 'G502 HERO —',
    title: 'Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=mice',
    oldPrice: '$74.99',
    newPrice: '$68.99',
    accent: '#00d1ff'
  }
];

function HeroBanner() {
  return (
    <section className="x_main-hero position-relative overflow-hidden">
      <Carousel fade interval={5000} indicators controls={false} className="hero-carousel">
        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="position-absolute top-0 start-0 w-100 h-100 hero-bg" />
            <div className="hero-bg-word">MOUSE</div>

            <Container className="position-relative" style={{ zIndex: 1 }}>
              <Row className="align-items-center min-vh-50 py-md-5 py-4">
                <Col lg={6} className="text-center mb-md-4 mb-2 mb-lg-0">
                  <div className="position-relative" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="img-fluid hero-product-image"
                      style={{
                        borderRadius: '12px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        transform: 'translateY(0)',
                        transition: 'transform 0.3s ease',
                        filter: 'drop-shadow(0 0 18px rgba(0, 209, 255, 0.35))'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                    />
                  </div>
                </Col>
                <Col lg={6} className="text-white text-center text-lg-start">
                  <div className="hero-content">
                    <div className="banner-headline">{slide.headline}</div>
                    <h1 className="banner-title">{slide.title}</h1>
                    <div className="hero-price" style={{ '--accent': slide.accent }}>
                      <span className="old-price">{slide.oldPrice}</span>
                      <span className="new-price">{slide.newPrice}</span>
                    </div>
                    <Button 
                      as={Link} 
                      to={slide.link} 
                      size="lg" 
                      className="hero-shop-btn px-5 py-3"
                      style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600,
                        backgroundColor: 'transparent',
                        color: 'var(--accent)',
                        border: '1px solid var(--accent)',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 209, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      Shop Now <span style={{ marginLeft: '8px', color: 'var(--accent)' }}>→</span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>

      <style>{`
        .x_main-hero {
          min-height: 70vh;
          background-color: #1d1f22;
        }
        
        .hero-carousel {
          min-height: 70vh;
        }
        
        .hero-carousel .carousel-item {
          min-height: 70vh;
          position: relative;
        }
        
        .hero-carousel .carousel-indicators {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          z-index: 3;
        }
        .hero-carousel .carousel-indicators [data-bs-target] {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.35);
          border: 2px solid rgba(255,255,255,0.6);
          padding: 0;
        }
        .hero-carousel .carousel-indicators .active {
          background-color: #00d1ff;
          border-color: #00d1ff;
        }
        
        .hero-product-image { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-8px) } }
        
        .min-vh-50 {
          min-height: 70vh;
        }
        
        .hero-content { animation: fadeInUp 0.8s ease-out; }
        @keyframes fadeInUp { from{ opacity:0; transform: translateY(30px) } to{ opacity:1; transform: translateY(0) } }

        .hero-bg { background: #1d1f22; }
        .hero-bg-word {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-weight: 800;
          font-size: clamp(5rem, 14vw, 18rem);
          color: rgba(255,255,255,0.06);
          letter-spacing: 0.12em;
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }

        .banner-headline {
          color: #ffffff;
          font-size: 1.4rem;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .banner-title {
          color: #ffffff;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 14px;
        }
        .hero-price {
          display: flex;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 22px;
        }
        .old-price { color: #b3b3b3; text-decoration: line-through; }
        .new-price { color: #00d1ff; font-weight: 700; }
        
        @media (max-width: 991px) {
          .x_main-hero {
            min-height: 60vh;
          }
          
          .hero-carousel .carousel-item {
            min-height: 60vh;
          }
          
          .min-vh-50 {
            min-height: 60vh;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroBanner;

