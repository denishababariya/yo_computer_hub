import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTwitter } from "react-icons/fa";
import "./HeroSlide.css";

// Define your slide data here
const slides = [
  {
    id: 0,
    type: "Video Game",
    imgSrc: require("../../img/remote.png"),

    // 🔥 New Updated Content
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
    imgSrc: require("../../img/aircc.png"), // Keep same
    title: "UltraCool X5 —",
    subtitle: "Laptop Cooling Pad",
    oldPrice: "$49.99",
    currentPrice: "$34.99",
    description:
      "Keep your laptop chilled with high-airflow fans and silent cooling performance.",
  },
  {
    id: 2,
  type: "headphone",
  imgSrc: require("../../img/head.png"), // keep same

  // 🔥 NEW CONTENT BELOW
  title: "HyperX Cloud Alpha-",
  subtitle: "Pro Gaming Headset",
  oldPrice: "$149.99",
  currentPrice: "$119.99",
  description:
    "Enjoy superior sound separation, long-lasting comfort, and crystal-clear communication — perfect for competitive gaming."

  },
  {
   id: 3,
  type: "speaker",
  imgSrc: require("../../img/ssp.png"),
  title: "SoundBlaster Z —",
  subtitle: "Premium Gaming Speaker",
  oldPrice: "$159.99",
  currentPrice: "$119.99",
  description:
    "Experience rich bass, crystal-clear audio, and immersive sound for gaming and entertainment."
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
              <span className="xyz_current-price">
                {activeSlide.currentPrice}
              </span>
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
            className={`xyz_v-dot ${
              index === activeIndex ? "xyz_active-v-dot" : ""
            }`}
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
