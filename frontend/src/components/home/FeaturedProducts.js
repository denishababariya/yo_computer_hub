import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mouse from "../../img/featured_products_mouse.png";

function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      title: 'X5 GAMING MOUSE',
      price: '$59.99',
      image: mouse,
      link: '/shop'
    },
    {
      id: 2,
      title: 'Axtel AX-FHD Webcam Pro',
      price: '$349.99',
      image: 'https://resource.logitech.com/content/dam/logitech/en/products/webcams/mx-brio/buy/migration-assets-for-delorean-2025/gallery/mx-brio-3qtr-front-right-pale-gray.png',
      link: '/shop'
    },
    {
      id: 3,
      title: 'E910 5.8G WIRELESS HEADSET',
      price: '$89.99',
      image: 'https://www.pngall.com/wp-content/uploads/4/Wireless-Headphone-PNG-HD-Quality.png',
      link: '/shop'
    }
  ];

  return (
    <section className="x_main-featured-products py-md-5 py-4">
      <Container>
        <Row className="g-4">
          {featuredProducts.map((product) => (
            <Col key={product.id} lg={4} sm={6}>
              
              <div 
                className="position-relative rounded overflow-hidden shadow-lg x_main-featured-card"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)),
                    url('https://t3.ftcdn.net/jpg/01/93/30/78/360_F_193307850_Ohzn4ILra9FbnqNaEgR0Dz0iprl0crJr.jpg')
                  `,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.8rem',
                  color: 'white',
                  borderRadius: '12px'
                }}
              >
                
                {/* Title */}
                <div>
                  <h3 
                    className="fw-bold mb-3" 
                    style={{ fontSize: '1.4rem', lineHeight: '1.2' }}
                  >
                    {product.title}
                  </h3>

                  {/* Product Image */}
                  <div
                    className="mb-3"
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: '10px',
                    }}
                  />
                </div>

                {/* Price + Button */}
                <div className="d-flex justify-content-between align-items-center mt-md-3 mt-0">
                  <div className="fw-bold fs-4 text-danger">
                    {product.price}
                  </div>

                  <Button
                    as={Link}
                    to={product.link}
                    variant="danger"
                   
                    className="px-3 py-2"
                    style={{ fontWeight: "600", fontSize: "0.95rem" }}
                  >
                    Add Now
                  </Button>
                </div>

              </div>

            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
