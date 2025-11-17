import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 1872,
    hours: 6,
    minutes: 13,
    seconds: 13
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
              days -= 1;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="x_main-special-offer py-5 position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0e2a47 0%, #1a1a3a 50%, #2d1b4e 100%)'
      }}
    >
      {/* Diagonal lines overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(228, 0, 43, 0.1) 10px, rgba(228, 0, 43, 0.1) 20px)',
          opacity: 0.3
        }}
      />
      
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center">
          <Col lg={6} className="text-white mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              GET SPECIAL PRICE UP TO 50% OFF
            </h2>
            <p className="lead mb-4 text-light">
              Limited time offer on gaming controllers and accessories
            </p>
            
            {/* Countdown Timer */}
            <div className="d-flex gap-2 gap-md-3 mb-4 flex-wrap">
              <div className="text-center bg-dark bg-opacity-50 rounded p-3" style={{ minWidth: '80px' }}>
                <div className="display-6 fw-bold text-danger">{timeLeft.days}</div>
                <div className="small text-light">Days</div>
              </div>
              <div className="text-center bg-dark bg-opacity-50 rounded p-3" style={{ minWidth: '80px' }}>
                <div className="display-6 fw-bold text-danger">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="small text-light">Hrs</div>
              </div>
              <div className="text-center bg-dark bg-opacity-50 rounded p-3" style={{ minWidth: '80px' }}>
                <div className="display-6 fw-bold text-danger">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="small text-light">Mins</div>
              </div>
              <div className="text-center bg-dark bg-opacity-50 rounded p-3" style={{ minWidth: '80px' }}>
                <div className="display-6 fw-bold text-danger">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="small text-light">Secs</div>
              </div>
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
          <Col lg={6} className="text-center">
            <div 
              className="position-relative"
              style={{
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop"
                alt="Gaming Controller"
                className="img-fluid"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  transform: 'rotate(-15deg)',
                  transition: 'transform 0.3s ease',
                  filter: 'drop-shadow(0 10px 30px rgba(147, 51, 234, 0.3))'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-10deg) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-15deg) scale(1)'}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SpecialOffer;

