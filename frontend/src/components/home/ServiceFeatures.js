import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Define the custom design styles
const styles = {
  section: {
    backgroundColor: "#0a0a0a", // Dark background
    paddingTop: "60px",
    paddingBottom: "60px",
  },
  featureBox: {
    backgroundColor: "#1a1a1a", // Slightly lighter dark background for the box
    borderRadius: "10px",
    padding: "30px 20px",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    cursor: "pointer",
    border: "1px solid #333",
  },
  iconWrapper: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "#5588c9 ", // Electric Blue Accent Color
    transition: "color 0.3s ease",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#ffffff", // White text
    marginBottom: "8px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#aaaaaa", // Light grey for description
    margin: 0,
  },
};

function ServiceFeatures() {
  const features = [
    {
      icon: "bi-globe",
      title: "Worldwide Shipping",
      description: "Fast and reliable shipping to your door",
    },
    {
      icon: "bi-arrow-counterclockwise",
      title: "Money Back Guarantee",
      description: "30-day return policy on all products",
    },
    {
      icon: "bi-shield-check",
      title: "Secure Payments",
      description: "Safe and encrypted payment processing",
    },
    {
      icon: "bi-headset",
      title: "Online Support 24/7",
      description: "Round the clock customer support",
    },
  ];

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.backgroundColor = "#007bff30"; // Light blue tint on hover
    e.currentTarget.querySelector("i").style.color = "#fff"; // White icon on hover
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.backgroundColor = styles.featureBox.backgroundColor;
    e.currentTarget.querySelector("i").style.color = styles.iconWrapper.color;
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 375px) {
            .custom-col {
              width: 100% !important; /* 1 column */
            }
          }

          @media (min-width: 376px) and (max-width: 425px) {
            .custom-col {
              width: 50% !important; /* 2 columns */
            }
          }
        `}
      </style>
      <section style={styles.section}>
        <Container>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col
                key={index}
                className="custom-col"
                xs={12}
                sm={6}
                md={3}
                lg={3}
              >
                <div
                  style={styles.featureBox}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Icon */}
                  <div style={styles.iconWrapper}>
                    <i
                      className={`bi ${feature.icon}`}
                      style={{ color: "#5588c9" }}
                    ></i>
                  </div>

                  {/* Title */}
                  <h5 style={styles.title}>{feature.title}</h5>

                  {/* Description */}
                  <p style={styles.description}>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ServiceFeatures;
