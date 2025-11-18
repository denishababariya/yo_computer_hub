import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter } from 'react-icons/fa';
import './HeroSlide.css';

// Define your slide data here
const slides = [
  {
    id: 0,
    type: 'Video Game',
    imgSrc: require('../../img/remote.png'),
    title: 'G502 HERO —',
    subtitle: 'Gaming Mouse',
    oldPrice: '$74.99',
    currentPrice: '$68.99',
    description: 'Experience precision and speed with the G502 HERO Gaming Mouse.',
  },
  {
    id: 1,
    type: 'Cooling Pad',
    imgSrc: require('../../img/aircc.png'), // Second banner: CPU image
    title: 'Intel Core i9 —',
    subtitle: 'High-Performance CPU',
    oldPrice: '$599.99',
    currentPrice: '$499.99',
    description: 'Unleash extreme power with the latest Intel Core i9 processor.',
  },
  {
    id: 2,
    type: 'headphone',
    imgSrc: require('../../img/head.png'), // Third banner: Headphone image
    title: 'Logitech G PRO X —',
    subtitle: 'Gaming Headset',
    oldPrice: '$129.99',
    currentPrice: '$99.99',
    description: 'Hear every detail with immersive sound and clear communication.',
  },
  {
    id: 3,
    type: 'specker',
    imgSrc: require('../../img/ssp.png'), // Third banner: Headphone image
    title: 'Logitech G PRO X —',
    subtitle: 'Gaming Headset',
    oldPrice: '$129.99',
    currentPrice: '$99.99',
    description: 'Hear every detail with immersive sound and clear communication.',
  },
  // Add more slides as needed
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const activeSlide = slides[activeIndex];

  // Dynamically change the "MOUSE" overlay text based on the active slide type
  const overlayText = activeSlide.type.toUpperCase();

  return (
    <div className="xyz_hero-slide">
      {/* Faint text overlay behind the content, now dynamic */}
      <div className="xyz_text-overlay">{overlayText}</div> 
      
      <Container>
        <Row className="align-items-center xyz_slide-content">
          
          {/* Left Text Content Column */}
          <Col sm={6} className="xyz_text-section">
            <h1 className="xyz_title">{activeSlide.title}</h1>
            <h2 className="xyz_subtitle">{activeSlide.subtitle}</h2>
            
            <div className="xyz_price-section">
              <span className="xyz_old-price">{activeSlide.oldPrice}</span>
              <span className="xyz_current-price">{activeSlide.currentPrice}</span>
            </div>
            
            {/* Added a description for more content variation */}
            <p className="xyz_description">{activeSlide.description}</p>
            
            
           
          </Col>

          {/* Right Image Column */}
          <Col sm={6} className="xyz_image-section">
            <img 
              src={activeSlide.imgSrc} 
              alt={activeSlide.title} 
              className="xyz_product-image" // Changed class name for general product images
            />
          </Col>
        </Row>
      </Container>

      {/* Vertical Right Navigation Dots (Styled as per new image) */}
      <div className="xyz_vertical-dots">
        {slides.map((slide, index) => (
          <span 
            key={slide.id}
            className={`xyz_v-dot ${index === activeIndex ? 'xyz_active-v-dot' : ''}`}
            onClick={() => handleDotClick(index)}
          >
            {/* Inner dot for the active state, if needed for complex designs */}
            {index === activeIndex && <span className="xyz_v-dot-inner"></span>}
          </span>
        ))}
      </div>
      
    </div>
  );
};

export default HeroSlider;