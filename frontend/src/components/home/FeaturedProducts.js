import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      title: 'X5 GAMING MOUSE',
      price: '$59.99',
      image: 'https://w7.pngwing.com/pngs/519/268/png-transparent-computer-mouse-e-blue-auroza-type-im-computer-keyboard-e-blue-auroza-gaming-mouse-black-blue-gaming-keypad-computer-mouse-electronics-computer-keyboard-computer.png',
      link: '/shop'
    },
    {
      id: 2,
      title: 'acer NITRO 5',
      price: '$349.99',
      image: 'https://pngimg.com/uploads/laptop/laptop_PNG101804.png',
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
        <Row className="g-3 g-md-4">
          {featuredProducts.map((product) => (
            <Col key={product.id} md={4} xs={12}>
             <div 
  className="position-relative rounded overflow-hidden shadow-lg x_main-featured-card"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)),
      url('https://media.tenor.com/TZaIBNauQfAAAAAM/stars-galaxy.gif')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem',
    color: 'white'
  }}
>
  <div>
    <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
      {product.title}
    </h3>

    <div 
      className="mb-3"
      style={{
        aspectRatio: '16/9',
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat:'no-repeat',
        borderRadius: '8px',
      }}
    />
  </div>

  <div className="d-flex justify-content-between align-items-center">
    <div>
      <div className="fw-bold fs-4 text-danger">{product.price}</div>
    </div>

    <Button 
      as={Link} 
      to={product.link} 
      variant="danger" 
      size="lg"
      className="px-4"
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

