import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Title from '../Title';

function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
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
      className="x_main-special-offer py-md-5 py-4 position-relative overflow-hidden"
      style={{
        background: '#0b0f1a',
        borderTop: '3px solid #5588c9',
        borderBottom: '3px solid #5588c9',
      }}
    >
      {/* Background Image + Dark Overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)),
            url('https://demo1.leotheme.com/leo_anoa_demo/themes/leo_anoa/assets/img/modules/leoslideshow/slide01.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      <div className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center text-center text-md-start">

          {/* Offer Content */}
          <Col lg={8} className="mx-auto text-white">
             <Title text="SPECIAL GAMING OFFER" theme="dark" align="left" />
            {/* <h2 
              className="fw-bold mb-3"
              style={{
                fontSize: '2.2rem',
                color: '#5588c9',
                textShadow: '0 0 10px rgba(85,136,201,0.6)',
              }}
            >
            
            </h2> */}

            <p className="lead mb-md-4 mb-2 text-light">
              Grab the latest gaming gear at exclusive discounted prices.
            </p>

            {/* Countdown */}
            <div 
              className="d-flex justify-content-center justify-content-md-start gap-2 gap-md-3 flex-wrap mb-md-4 mb-2"
            >
              {['Days','Hours','Minutes','Seconds'].map((label, index) => {
                const values = [
                  timeLeft.days,
                  String(timeLeft.hours).padStart(2, '0'),
                  String(timeLeft.minutes).padStart(2, '0'),
                  String(timeLeft.seconds).padStart(2, '0')
                ];
                return (
                  <div
                    key={index}
                    className="text-center p-2 p-md-3 rounded"
                    style={{
                      minWidth: '70px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(85,136,201,0.4)',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 0 10px rgba(85,136,201,0.3)',
                    }}
                  >
                    <div 
                      className="fw-bold"
                      style={{ fontSize: '1.4rem', color: '#5588c9' }}
                    >
                      {values[index]}
                    </div>
                    <div className="small text-light">{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <Button
              as={Link}
              to="/shop"
              size="lg"
              className="px-4 py-3 fw-bold"
              style={{
                backgroundColor: '#5588c9',
                border: 'none',
                boxShadow: '0 0 15px rgba(85,136,201,0.7)',
                width: '100%',
                maxWidth: '220px'
              }}
            >
              Shop Now
            </Button>

          </Col>
        </Row>
      </div>
    </section>
  );
}

export default SpecialOffer;
