import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopCategories() {
  const categories = [
    {
      id: 1,
      name: 'Gaming Controllers',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=controllers'
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=mouse'
    },
    {
      id: 3,
      name: 'Gaming Chairs',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=chairs'
    },
    {
      id: 4,
      name: 'Gaming Headsets',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=headsets'
    },
    {
      id: 5,
      name: 'Keyboards',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=keyboards'
    },
    {
      id: 6,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=accessories'
    }
  ];

  return (
    <section className="x_main-top-categories py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold mb-2" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            TOP CATEGORIES
          </h2>
        </div>
        <Row className="g-3 g-md-4">
          {categories.map((category) => (
            <Col key={category.id} xs={6} sm={6} md={4} lg={4} xl={2}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden x_main-category-card">
                <div 
                  className="position-relative overflow-hidden"
                  style={{ 
                    aspectRatio: '1',
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                    }}
                  >
                    <h6 className="text-white fw-bold mb-2">{category.name}</h6>
                    <Button 
                      as={Link} 
                      to={category.link} 
                      size="sm" 
                      variant="danger"
                      className="align-self-start"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default TopCategories;

