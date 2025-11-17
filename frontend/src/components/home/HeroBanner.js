import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    category: 'WIRELESS CONTROLLER',
    title: 'EVOLVE YOUR EXPERIENCE',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=controllers',
    bgGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #2d1b4e 100%)'
  },
  {
    id: 2,
    category: 'ELITE X5 GAMING KEYBOARDS',
    title: 'TUNE UP YOUR GAME',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=keyboards',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)'
  },
  {
    id: 3,
    category: 'GAMING HEADSETS',
    title: 'IMMERSE YOURSELF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=headsets',
    bgGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
  },
  {
    id: 4,
    category: 'GAMING MICE',
    title: 'PRECISION AT YOUR FINGERTIPS',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=mice',
    bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
  }
];

function HeroBanner() {
  return (
    <section className="x_main-hero position-relative overflow-hidden">
      <Carousel 
        fade 
        interval={5000} 
        indicators 
        controls
        className="hero-carousel"
      >
        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: slide.bgGradient,
                zIndex: 0
              }}
            >
              {/* Animated gradient overlay */}
              <div 
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                  animation: 'pulse 4s ease-in-out infinite'
                }}
              />
            </div>
            
            {/* Carbon fiber texture overlay */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.03) 0px, transparent 1px, transparent 2px, rgba(59, 130, 246, 0.03) 3px),
                  repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.03) 0px, transparent 1px, transparent 2px, rgba(59, 130, 246, 0.03) 3px),
                  repeating-linear-gradient(45deg, rgba(147, 51, 234, 0.02) 0px, transparent 1px, transparent 2px, rgba(147, 51, 234, 0.02) 3px)
                `,
                backgroundSize: '20px 20px, 20px 20px, 40px 40px',
                opacity: 0.4
              }}
            />

            {/* Glowing lines effect */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: `
                  linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 20%, transparent 40%),
                  linear-gradient(0deg, transparent 0%, rgba(147, 51, 234, 0.1) 30%, transparent 60%),
                  linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)
                `,
                backgroundSize: '200% 200%, 200% 200%, 300% 300%',
                animation: 'glowMove 8s ease-in-out infinite',
                opacity: 0.6
              }}
            />

            <Container className="position-relative" style={{ zIndex: 1 }}>
              <Row className="align-items-center min-vh-50 py-5">
                <Col lg={6} className="text-center mb-4 mb-lg-0">
                  <div className="position-relative" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="img-fluid hero-product-image"
                      style={{
                        borderRadius: '12px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                        transition: 'transform 0.3s ease',
                        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'}
                    />
                  </div>
                </Col>
                <Col lg={6} className="text-white text-center text-lg-start">
                  <div className="hero-content">
                    <p 
                      className="text-uppercase mb-2" 
                      style={{ 
                        fontSize: '0.9rem', 
                        letterSpacing: '2px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500
                      }}
                    >
                      {slide.category}
                    </p>
                    <h1 
                      className="display-3 fw-bold mb-4" 
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        lineHeight: '1.2',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)'
                      }}
                    >
                      {slide.title}
                    </h1>
                    <Button 
                      as={Link} 
                      to={slide.link} 
                      size="lg" 
                      className="hero-shop-btn px-5 py-3"
                      style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600,
                        backgroundColor: '#fff',
                        color: '#000',
                        border: '1px solid #000',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      Shop Now <span style={{ marginLeft: '8px', color: '#ff6600' }}>→</span>
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
        }
        
        .hero-carousel {
          min-height: 70vh;
        }
        
        .hero-carousel .carousel-item {
          min-height: 70vh;
          position: relative;
        }
        
        .hero-carousel .carousel-indicators {
          bottom: 30px;
          z-index: 2;
        }
        
        .hero-carousel .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.8);
          margin: 0 5px;
        }
        
        .hero-carousel .carousel-indicators button.active {
          background-color: #fff;
          border-color: #fff;
        }
        
        .hero-carousel .carousel-control-prev,
        .hero-carousel .carousel-control-next {
          width: 50px;
          height: 50px;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          backdrop-filter: blur(10px);
          z-index: 2;
        }
        
        .hero-carousel .carousel-control-prev {
          left: 20px;
        }
        
        .hero-carousel .carousel-control-next {
          right: 20px;
        }
        
        .hero-carousel .carousel-control-prev-icon,
        .hero-carousel .carousel-control-next-icon {
          width: 20px;
          height: 20px;
        }
        
        .hero-product-image {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes glowMove {
          0%, 100% { 
            background-position: 0% 0%, 0% 0%, 0% 0%;
          }
          50% { 
            background-position: 100% 100%, 100% 100%, 100% 100%;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(0px);
          }
          50% { 
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(-10px);
          }
        }
        
        .min-vh-50 {
          min-height: 70vh;
        }
        
        .hero-content {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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

