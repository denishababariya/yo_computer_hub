import React, { useRef, useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { categoryAPI } from "../../services/api"; // <-- new import
import Title from "../Title";

const TopCategories = () => {
  // Ref to access the scrollable container element
  const sliderRef = useRef(null);

  // dynamic categories from API
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // categoryAPI.getAll should return JSON (adjust based on your backend shape)
    categoryAPI
      .getAll()
      .then((res) => {
        if (!mounted) return;
        // Accept either { categories: [...] } or an array directly
        const data = Array.isArray(res)
          ? res
          : res.categories || res.data || [];
        setCategories(data);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        if (!mounted) return;
        setError("Failed to load categories");
        setCategories([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Function to handle horizontal scrolling
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth / 2; // Scroll half the container width
      const currentScroll = sliderRef.current.scrollLeft;

      if (direction === "left") {
        sliderRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        sliderRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {/* Required CDN for Bootstrap CSS to make React-Bootstrap components look correct */}

      <section
        className="py-5 d-flex align-items-center top_category"
        style={{ backgroundColor: "#1d1a1aff" }}
      >
        <Container>
          <div className="d-flex justify-content-center">
            <Title text="SHOP BY CATEGORIES" theme="dark" align="center" />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center my-4">
              <Spinner animation="border" role="status" variant="light" />
            </div>
          ) : error ? (
            <div className="text-center text-danger my-4">{error}</div>
          ) : (
            /* Slider Container - Position Relative for Absolute Controls */
            <div className="position-relative">
              {/* Scrollable Content Wrapper */}
              <div
                ref={sliderRef}
                className="d-flex flex-nowrap overflow-x-auto pb-3 gap-md-4 gap-2"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                {categories.length === 0 && (
                  <div className="text-white">No categories available</div>
                )}
                {categories.map((category, index) => {
                  // normalize shape (backend may return different keys)
                  const name =
                    category.name || category.title || `Category ${index + 1}`;
                  const image =
                    category.image ||
                    category.img ||
                    category.thumbnail ||
                    `https://placehold.co/400x400/333333/FFFFFF?text=${encodeURIComponent(
                      name
                    )}`;
                  const link = category.link || category.url || "#";

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 category-card-slide-item"
                    >
                      {/* Square card: image fills whole card. Overlay title appears on hover. Mirror/reflection appears below on hover. */}
                      <Card
                        className="bg-transparent border-0 h-100  text-white category-card-custom"
                        style={{
                          borderRadius: "12px",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer",
                          // keep pointer on card
                        }}
                      >
                        <div
                          className="card-image-wrapper"
                          // pass CSS custom property for reflection background
                          style={{ ["--img"]: `url("${image}")` }}
                          aria-label={name}
                        >
                          {/* background image covers full card */}
                          <div
                            className="card-image"
                            role="img"
                            aria-label={name}
                            style={{ backgroundImage: `url(${image})` }}
                          />
                          {/* overlay title shown on hover */}
                          <div className="category-title-overlay">{name}</div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Custom Navigation Controls (Desktop Only) */}
              <div className="d-none d-md-block">
                <button
                  className="slider-control-prev"
                  onClick={() => scrollSlider("left")}
                  aria-label="Previous Slide"
                >
                  <span className="slider-control-icon">
                    <FaAngleLeft />
                  </span>
                </button>
                <button
                  className="slider-control-next"
                  onClick={() => scrollSlider("right")}
                  aria-label="Next Slide"
                >
                  <span className="slider-control-icon">
                    <FaAngleRight />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Custom CSS for Scrollbar, Responsive Widths, and Controls */}
          <style>
            {`
                            /* Hide scrollbar for aesthetics */
                            .overflow-x-auto::-webkit-scrollbar {
                                display: none;
                            }
                            .overflow-x-auto {
                                -ms-overflow-style: none;  /* IE and Edge */
                                scrollbar-width: none;  /* Firefox */
                            }

                            /* Responsive widths for slider items */
                            .category-card-slide-item {
                                min-width: 87%; 
                                max-width: 87%;
                            }
                            @media (min-width:576px){
                               .category-card-slide-item {
                                min-width: 55%; 
                                max-width: 55%;
                            }
                            }
                            @media (min-width: 768px) { /* md breakpoint */
                                .category-card-slide-item {
                                    min-width: 25%; 
                                    max-width: 34%;
                                }
                            }
    @media (min-width: 991px) { /* md breakpoint */
                                .category-card-slide-item {
                                    min-width: 31.5%; 
                                    max-width: 31.5%;
                                }
                            }
                            @media (min-width: 1200px) { /* xl breakpoint */
                                .category-card-slide-item {
                                    min-width: 23.5%; 
                                    max-width: 23.5%;
                                }
                            }
                                @media (max-width:768px){
                                           .top_category .card {
        max-height: 250px !important;
    }
        .category-card-slide-item {
    min-width: auto;
    height:250px;
}

                                }
  @media (max-width:480px){
                                            .top_category .card {
        min-height: 200px !important;
        max-height: 200px !important;
        padding:0px !important;
    }
        .category-card-slide-item {
    min-width: auto;
    height:200px;
}

                                }

                            /* NEW: Square card + image fills whole card */
                            .category-card-custom {
                                padding: 0;
                                overflow: visible;
                                border-radius: 12px;
                                /* Make card square regardless of content */
                                aspect-ratio: 1 / 1;
                                min-height: 0;
                                display: block;
                            }

                            .card-image-wrapper {
                                position: relative;
                                width: 100%;
                                height: 100%;
                                border-radius: 12px;
                                overflow: hidden;
                            }

                            .card-image {
                                width: 100%;
                                height: 100%;
                                background-size: cover;
                                background-position: center;
                                background-repeat: no-repeat;
                                transition: transform 0.6s ease;
                                will-change: transform;
                                display: block;
                            }

                            /* Mirror/reflection pseudo element (uses --img variable set inline) */
                            .card-image::after {
                                content: "";
                                position: absolute;
                                left: 0;
                                right: 0;
                                height: 100%;
                                bottom: -100%;
                                background-image: var(--img);
                                background-size: cover;
                                background-position: center;
                                transform: scaleY(-1) translateY(10%);
                                filter: blur(6px) brightness(0.75);
                                opacity: 0;
                                transition: opacity 0.45s ease, transform 0.45s ease;
                                pointer-events: none;
                            }

                            /* Hover: flip horizontally (mirror) and show reflection */
                            .category-card-custom:hover .card-image {
                                transform: scaleX(-1);
                            }
                            .category-card-custom:hover .card-image::after {
                                opacity: 0.45;
                                transform: scaleY(-1) translateY(0%);
                            }

                            /* Overlay title (hidden by default, appears on hover) */
                            .category-title-overlay {
                                position: absolute;
                                left: 8px;
                                right: 8px;
                                bottom: 12px;
                                z-index: 5;
                                color: #fff;
                                text-align: center;
                                font-weight: 600;
                                font-size: 1rem;
                                background: linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
                                padding: 6px 10px;
                                border-radius: 8px;
                                opacity: 0;
                                transform: translateY(8px);
                                transition: opacity 0.28s ease, transform 0.28s ease;
                            }
                            .category-card-custom:hover .category-title-overlay {
                                opacity: 1;
                                transform: translateY(0);
                            }
                            
                            /* START: Custom Arrow Styles based on PopularProducts CSS */
                            .slider-control-prev,
                            .slider-control-next {
                                position: absolute;
                                width: 45px;
                                height: 45px;
                                top: 50%;
                                transform: translateY(-50%);
                                background-color: #5588c92e; /* semi-transparent blue */
                                border-radius: 50%;
                                border: none;
                                backdrop-filter: blur(10px);
                                opacity: 0.9;
                                transition: all 0.3s ease;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 10;
                            }

                            .slider-control-prev:hover,
                            .slider-control-next:hover {
                                background-color: #ccd8e5;
                                opacity: 1;
                            }

                            .slider-control-prev {
                                left: -10px;
                            }

                            .slider-control-next {
                                right: -10px;
                            }

                            .slider-control-icon {
                                font-size: 1.5rem;
                                line-height: 1;
                                text-shadow: 0 0 0 #3b82f6; /* Use text shadow to color the character */
                                transition: color 0.3s ease;
                                
                                /* This filter roughly matches the blue tone of the original component's arrow */
                                filter: invert(59%) sepia(14%) saturate(1923%) hue-rotate(185deg) brightness(93%) contrast(90%);
                            }
                            
                            .slider-control-prev:hover .slider-control-icon,
                            .slider-control-next:hover .slider-control-icon {
                                filter: none; /* Reset filter on hover for cleaner look */
                            }
                            /* END: Custom Arrow Styles */
                        `}
          </style>
        </Container>
      </section>
    </>
  );
};

export default TopCategories;
