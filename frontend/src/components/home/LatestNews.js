import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LatestNews() {
  const news = [
    {
      id: 1,
      title: "Why Ghost Of Tsushima Could Become Your New Favourite Game",
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      date: "January 25, 2024",
      category: "Gaming"
    },
    {
      id: 2,
      title: "Best Gaming Peripherals for 2024",
      image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800&auto=format&fit=crop',
      date: "January 22, 2024",
      category: "Hardware"
    },
    {
      id: 3,
      title: "Top 10 Gaming Chairs for Long Sessions",
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop',
      date: "January 20, 2024",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Next-Gen Graphics Cards: What to Expect",
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
      date: "January 18, 2024",
      category: "Hardware"
    }
  ];

  return (
    <section className="x_main-latest-news py-md-5 py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-md-4 mb-2">
          <h2 className="text-danger fw-bold m-0" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            LATEST NEWS
          </h2>
          <Button as={Link} to="/blog" variant="outline-danger" className="d-none d-md-block">
            View All Posts
          </Button>
        </div>
        
        <Row className="g-3 g-md-4">
          {news.map(item => (
            <Col key={item.id} xs={12} sm={6} md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden x_main-news-card">
                <div 
                  className="position-relative overflow-hidden"
                  style={{
                    aspectRatio: '16/9',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="position-absolute top-0 start-0 p-2"
                    style={{
                      background: 'rgba(228, 0, 43, 0.9)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.category}
                  </div>
                </div>
                <Card.Body className="p-3">
                  <h6 className="fw-bold mb-2" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                    {item.title}
                  </h6>
                  <small className="text-muted">{item.date}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4 d-md-none">
          <Button as={Link} to="/blog" variant="outline-danger">
            View All Posts
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default LatestNews;

