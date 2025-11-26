import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Define the custom design styles
const styles = {
  section: {
    backgroundColor: "#0a0a0a",
    paddingTop: "60px",
    paddingBottom: "60px",
  },
  featureBox: {
    backgroundColor: "#1a1a1a",
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
    color: "#5588c9",
    transition: "color 0.3s ease",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: "8px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#aaaaaa",
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

  // Hover Effects
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.backgroundColor = "#007bff30";
    e.currentTarget.querySelector("i").style.color = "#fff";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.backgroundColor = styles.featureBox.backgroundColor;
    e.currentTarget.querySelector("i").style.color = styles.iconWrapper.color;
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 375px) {
            .custom-col {
              width: 100% !important;
            }
               .feature-box-fixed {
              height: 180px !important;
            }
          }

          @media (min-width: 376px) and (max-width: 425px) {
            .custom-col {
              width: 50% !important;
            }
          }

            @media (max-width: 991px) {
            .feature-box-fixed {
              height: 230px ;
            }
          }

          /* FIXED HEIGHT ON DESKTOP (>=1024px) */
          @media (min-width: 1024px) {
            .feature-box-fixed {
              height: 230px !important;
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
                  className="feature-box-fixed"
                  style={styles.featureBox}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={styles.iconWrapper}>
                    <i className={`bi ${feature.icon}`}></i>
                  </div>

                  <h5 style={styles.title}>{feature.title}</h5>
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
