import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HeroSlide.css";

const slides = [
  {
    id: 0,
    type: "Video Game",
    imgSrc: require("../../img/remote.png"),
    title: "Ultimate Pro Controller —",
    subtitle: "Wireless Gamepad",
    oldPrice: "$89.99",
    currentPrice: "$69.99",
    description:
      "Dominate every match with ultra-responsive controls and ergonomic comfort.",
  },
  {
    id: 1,
    type: "Cooling Pad",
    imgSrc: require("../../img/aircc.png"),
    title: "UltraCool X5 —",
    subtitle: "Laptop Cooling Pad",
    oldPrice: "$49.99",
    currentPrice: "$34.99",
    description:
      "Keep your laptop chilled with high-airflow fans and silent cooling performance.",
  },
  {
    id: 2,
    type: "Headphone",
    imgSrc: require("../../img/head.png"),
    title: "HyperX Cloud Alpha —",
    subtitle: "Pro Gaming Headset",
    oldPrice: "$149.99",
    currentPrice: "$119.99",
    description:
      "Enjoy superior sound separation, long-lasting comfort, and crystal-clear communication — perfect for competitive gaming.",
  },
  {
    id: 3,
    type: "Speaker",
    imgSrc: require("../../img/ssp.png"),
    title: "SoundBlaster Z —",
    subtitle: "Premium Gaming Speaker",
    oldPrice: "$159.99",
    currentPrice: "$119.99",
    description:
      "Experience rich bass, crystal-clear audio, and immersive sound for gaming and entertainment.",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      triggerSlideChange((activeIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const triggerSlideChange = (index) => {
    setFade(true); // Start fade-out
    setTimeout(() => {
      setActiveIndex(index);
      setFade(false); // Fade-in
    }, 300); // Fade duration should match CSS
  };

  const overlayText = slides[activeIndex].type.toUpperCase();

  return (
    <div className="xyz_hero-slide">
      
      {/* Dynamic faint background text */}
      <div className="xyz_text-overlay">{overlayText}</div>

      <Container>
        <Row
          className={`align-items-center xyz_slide-content ${
            fade ? "fade-out" : "fade-in"
          }`}
        >
          <Col sm={6} className="xyz_text-section">
            <h1 className="xyz_title">{slides[activeIndex].title}</h1>
            <h2 className="xyz_subtitle">{slides[activeIndex].subtitle}</h2>

            <div className="xyz_price-section">
              <span className="xyz_old-price">{slides[activeIndex].oldPrice}</span>
              <span className="xyz_current-price">
                {slides[activeIndex].currentPrice}
              </span>
            </div>

            <p className="xyz_description">{slides[activeIndex].description}</p>
          </Col>

          <Col sm={6} className="xyz_image-section">
            <img
              src={slides[activeIndex].imgSrc}
              alt={slides[activeIndex].title}
              className="xyz_product-image"
            />
          </Col>
        </Row>
      </Container>

      {/* Right navigation dots */}
      <div className="xyz_vertical-dots">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`xyz_v-dot ${
              index === activeIndex ? "xyz_active-v-dot" : ""
            }`}
            onClick={() => triggerSlideChange(index)}
          >
            {index === activeIndex && <span className="xyz_v-dot-inner"></span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
