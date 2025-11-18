import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import img1 from "../Images/41m0HO40Z1L._AC_SX679_-removebg-preview.png";
import img2 from "../Images/remote.png";
import img3 from "../Images/cpu.png";
import img4 from "../Images/air.png";
import img5 from "../Images/batli_mouse.png";


const ComputerAccessoriesSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const accessories = [
        { id: 1, name: "Wireless Gaming Mouse", image: img1, price: "$29.99" },
        { id: 2, name: "Mechanical RGB Keyboard", image: img2, price: "$89.99" },
        { id: 3, name: "Gaming Headset", image: img3, price: "$79.99" },
        { id: 4, name: "Ultra Wide Monitor", image: img4, price: "$349.99" },
        { id: 5, name: "HD Webcam Pro", image: img5, price: "$59.99" }
    ];


    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? accessories.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === accessories.length - 1 ? 0 : prev + 1));
    };

    const getVisibleItems = () => {
        const items = [];
        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + accessories.length) % accessories.length;
            items.push({ ...accessories[index], position: i });
        }
        return items;
    };

    return (
        <div className=" z_slider-container">
            <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .z_slider-container {
          width: 100%;
          height: 70vh;
          background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .z_slider-header {
          text-align: center;
          margin-bottom: 60px;
          z-index: 10;
        }

        .z_slider-title {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .z_slider-wrapper {
          position: relative;
          width: 100%;
          height: 59%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .z_slider-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .z_slider-item {
          position: absolute;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .z_slider-image-wrapper {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .z_slider-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
        }

        .z_slider-item[data-position="0"] {
          z-index: 5;
          transform: translateX(0) scale(1);
          opacity: 1;
        }

        .z_slider-item[data-position="0"] .z_slider-image-wrapper {
          width: 350px;
          height: 350px;
        }

        .z_slider-item[data-position="-1"] {
          z-index: 4;
          transform: translateX(-350px) scale(0.7);
          opacity: 0.6;
        }

        .z_slider-item[data-position="-1"] .z_slider-image-wrapper {
          width: 320px;
          height: 320px;
        }

        .z_slider-item[data-position="1"] {
          z-index: 4;
          transform: translateX(350px) scale(0.7);
          opacity: 0.6;
        }

        .z_slider-item[data-position="1"] .z_slider-image-wrapper {
          width: 320px;
          height: 320px;
        }

        .z_slider-item[data-position="-2"] {
          z-index: 3;
          transform: translateX(-650px) scale(0.5);
          opacity: 0.3;
        }

        .z_slider-item[data-position="-2"] .z_slider-image-wrapper {
          width: 270px;
          height: 270px;
        }

        .z_slider-item[data-position="2"] {
          z-index: 3;
          transform: translateX(650px) scale(0.5);
          opacity: 0.3;
        }

        .z_slider-item[data-position="2"] .z_slider-image-wrapper {
          width: 270px;
          height: 270px;
        }

        .z_slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          color: white;
          backdrop-filter: blur(10px);
          padding: 13.5px;
        }

        .z_slider-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%) scale(1.1);
        }

        .z_slider-btn-prev {
          left: 50px;
        }

        .z_slider-btn-next {
          right: 50px;
        }

        .z_slider-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 60px;
          z-index: 10;
        }

        .z_slider-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .z_slider-dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .z_slider-dot.z_active {
          background: #00d9ff;
          box-shadow:
            0 0 0 0px #00d9ff,   /* inner border */
            0 0 0 3px #fff,       /* outer border */
            0 0 20px #00d9ff
        }

        @media (max-width: 1200px) {
          .z_slider-item[data-position="0"] .z_slider-image-wrapper {
            width: 350px;
            height: 350px;
          }

          .z_slider-item[data-position="-1"],
          .z_slider-item[data-position="1"] {
            transform: translateX(-350px) scale(0.7);
          }

          .z_slider-item[data-position="1"] {
            transform: translateX(350px) scale(0.7);
          }
        }

        @media (max-width: 768px) {
          .z_slider-title {
            font-size: 2rem;
          }

          .z_slider-item[data-position="0"] .z_slider-image-wrapper {
            width: 280px;
            height: 280px;
          }

          .z_slider-item[data-position="-1"],
          .z_slider-item[data-position="1"] {
            transform: translateX(-250px) scale(0.6);
          }

          .z_slider-item[data-position="1"] {
            transform: translateX(250px) scale(0.6);
          }

          .z_slider-item[data-position="-2"],
          .z_slider-item[data-position="2"] {
            opacity: 0;
          }

          .z_slider-btn {
            width: 50px;
            height: 50px;
          }

          .z_slider-btn-prev {
            left: 20px;
          }

          .z_slider-btn-next {
            right: 20px;
          }
        }
          .z_slider-header {
  text-align: center;
  margin-bottom: 40px;
  z-index: 10;
}

.z_slider-title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;

  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #d4d4d4 35%,
    #5dd7ff 100%
  );
  -webkit-background-clip: text;
  color: transparent;

  text-shadow:
    0 6px 15px rgba(0, 200, 255, 0.4),
    0 2px 4px rgba(255,255,255,0.6);
}


/* Smaller on mobile */
@media (max-width: 768px) {
  .z_slider-title {
    font-size: 2rem;
    letter-spacing: 2px;
    padding: 6px 16px;
  }
    .z_slider-btn-next,
    .z_slider-btn-prev{
    display: none;
    }
}

      `}</style>

            <div className="z_slider-header">
                <h1 className="z_slider-title">SEE MORE DETAILS</h1>
            </div>


            <div className="z_slider-wrapper">
                <button
                    className="z_slider-btn z_slider-btn-prev"
                    onClick={handlePrev}
                >
                    <FaChevronLeft size={28} />
                </button>

                <div className="z_slider-track">
                    {getVisibleItems().map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="z_slider-item"
                            data-position={item.position}
                            onClick={() => {
                                if (item.position !== 0) {
                                    if (item.position > 0) {
                                        handleNext();
                                    } else {
                                        handlePrev();
                                    }
                                }
                            }}
                        >
                            <div className="z_slider-image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="z_slider-image"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="z_slider-btn z_slider-btn-next"
                    onClick={handleNext}
                >
                    <FaChevronRight size={28} />
                </button>
            </div>

            <div className="z_slider-dots">
                {accessories.map((_, index) => (
                    <div
                        key={index}
                        className={`z_slider-dot ${currentIndex === index ? 'z_active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ComputerAccessoriesSlider;