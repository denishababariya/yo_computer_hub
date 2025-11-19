import React, { useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/x_app.css';

const blogPosts = [
  {
    id: 1,
    title: 'WHY GHOST OF TSUSHIMA COULD BECOME YOUR NEW FAVOURITE GAME',
    date: 'April 14, 2024',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    category: 'Gaming'
  },
  {
    id: 2,
    title: 'WHY GHOST OF TSUSHIMA COULD BECOME YOUR NEW FAVOURITE GAME',
    date: 'April 14, 2024',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop',
    category: 'Gaming'
  },
  {
    id: 3,
    title: 'WHY GHOST OF TSUSHIMA COULD BECOME YOUR NEW FAVOURITE GAME',
    date: 'April 14, 2024',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop',
    category: 'Gaming'
  },
  {
    id: 4,
    title: 'TOP 10 GAMING KEYBOARDS FOR 2024',
    date: 'April 10, 2024',
    excerpt: 'Discover the best gaming keyboards that will elevate your gaming experience. From mechanical to RGB, we\'ve got you covered...',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=800&auto=format&fit=crop',
    category: 'Hardware'
  },
  {
    id: 5,
    title: 'BEST GAMING HEADSETS FOR COMPETITIVE PLAY',
    date: 'April 8, 2024',
    excerpt: 'Find the perfect headset for competitive gaming. Sound quality, comfort, and microphone clarity are key factors...',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'Hardware'
  },
  {
    id: 6,
    title: 'HOW TO BUILD YOUR FIRST GAMING PC',
    date: 'April 5, 2024',
    excerpt: 'A complete guide to building your first gaming PC. Step-by-step instructions and component recommendations...',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop',
    category: 'Tutorial'
  }
];

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <Container className="py-md-5 py-4 x_blog">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Latest Blog Posts</h1>
        <p className="text-muted">Stay updated with the latest gaming news and reviews</p>
      </div>

      <Row className="g-4 mb-5">
        {currentPosts.map((post) => (
          <Col key={post.id} md={4} xs={12}>
            <Card className="h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '8px' }}>
              <Link to={`/blog/${post.id}`} className="text-decoration-none">
                <div 
                  className="position-relative overflow-hidden"
                  style={{ 
                    aspectRatio: '16/9',
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="position-absolute top-0 start-0 p-2"
                  >
                    {post.category}
                  </div>
                </div>
              </Link>
              <Card.Body className="p-4">
                <Card.Title 
                  className="fw-bold mb-2"
                >
                  <Link to={`/blog/${post.id}`} className="text-dark text-decoration-none">
                    {post.title}
                  </Link>
                </Card.Title>
                <Card.Text 
                  className="text-muted small mb-2 date"
                >
                  {post.date}
                </Card.Text>
                <Card.Text 
                  className="text-muted"
                  style={{ 
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {post.excerpt}
                </Card.Text>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="read-more-link"
                >
                  Read More <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination className="mb-0">
          <Pagination.Prev 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          />
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            );
          })}
          <Pagination.Next 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          />
        </Pagination>
      </div>
    </Container>
  );
}

export default Blog;
