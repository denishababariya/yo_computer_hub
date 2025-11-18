import React, { useState, useEffect } from "react";
import mouse1 from "../Images/air.png";
import mouse2 from "../Images/41m0HO40Z1L._AC_SX679_-removebg-preview.png";
import mouse3 from "../Images/cpu.png";
import mouse6 from "../Images/remote.png";
import mouse5 from "../Images/specker 1.png";
import mouse4 from "../Images/WHITEBG-removebg-preview.png";


const Showmore = () => {
  const slides = [mouse1, mouse2, mouse3, mouse4, mouse5, mouse6];
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [current, slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Show 5 items: center + 2 left + 2 right
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      visible.push(slides[(current + i + slides.length) % slides.length]);
    }
    return visible;
  };

  return (
    <section  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
      <div className="z_background_img">
        <h2 className="z_slide_title text-center">SEE MORE DETAILS</h2>
        <div className="z_slide_wrapper">
          <button className="z_slide_arrow z_slide_left" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="z_slide_track">
            {getVisibleSlides().map((img, idx) => {
              // Center slide is always index 2
              const isActive = idx === 2;
              return (
                <div
                  className={`z_slide_item ${isActive ? "z_slide_active" : "z_slide_inactive"}`}
                  key={idx}
                >
                  <img src={img} alt="product" className="z_slide_image" />
                </div>
              );
            })}
          </div>
          <button className="z_slide_arrow z_slide_right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        <div className="z_slide_dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`z_slide_dot ${current === index ? "z_slide_dot_active" : ""}`}
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showmore;