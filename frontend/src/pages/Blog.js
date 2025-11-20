import React, { useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import blog1 from "../img/blog_mouse_img.jpg"
import blog2 from "../img/blog_speaker_img.jpg"
import blog3 from "../img/blog_computer_accessories_img.jpg"
import blog8 from "../img/blog_monitor_img.jpg"
import blog6 from "../img/blog_future_computer_accessories.jpg"
import blog9 from "../img/blog_pc_performance_img.jpg"
import blog10 from "../img/blog_wfh_img.jpg"
import blog11 from "../img/blog_wireless_parts.jpg"
import blog12 from "../img/blog_desk_organization.jpg"
import '../styles/x_app.css';

// Sample blog posts data (kept the same)
const blogPosts = [
  {
    id: 1,
    title: 'WHY A GOOD MOUSE CAN COMPLETELY CHANGE YOUR WORK EXPERIENCE',
    date: 'April 14, 2024',
    excerpt: 'From smooth scrolling to precise tracking, the right mouse improves accuracy, reduces strain, and boosts productivity...',
    image: blog1,
    category: 'Accessories'
  },
  {
    id: 2,
    title: 'TOP 10 KEYBOARDS FOR FAST TYPING & LONG WORK HOURS',
    date: 'April 10, 2024',
    excerpt: 'Discover the best mechanical and membrane keyboards designed for comfort, speed, and long-lasting durability...',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories'
  },
  {
    id: 3,
    title: 'MUST-HAVE COMPUTER ACCESSORIES FOR 2024',
    date: 'April 10, 2024',
    excerpt: 'External SSDs, ergonomic chairs, USB hubs, and more — essential accessories to upgrade your entire setup...',
    image: blog3,
    category: 'Accessories'
  },
  {
    id: 4,
    title: 'WHY GOOD DESKTOP SPEAKERS CAN TRANSFORM YOUR SETUP',
    date: 'April 14, 2024',
    excerpt: 'Clear sound, deeper bass, and a better workspace — premium speakers enhance music, meetings, and entertainment...',
    image: blog2,
    category: 'Audio'
  },

  {
    id: 5,
    title: 'BEST HEADSETS FOR OFFICE WORK, CALLS & DAILY USE',
    date: 'April 8, 2024',
    excerpt: 'Comfort, audio clarity, and noise-cancelling mics — here’s what makes a great headset for meetings and daily use...',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'Audio'
  },
  {
    id: 6,
    title: 'THE FUTURE OF COMPUTER ACCESSORIES — WHAT’S COMING NEXT?',
    date: 'April 1, 2024',
    excerpt: 'AI keyboards, smart mice, wireless charging pads — here’s what to expect from next-generation computer accessories...',
    image: blog6,
    category: 'Tech News'
  },
  {
    id: 7,
    title: 'HOW TO BUILD YOUR FIRST PC — ACCESSORIES YOU REALLY NEED',
    date: 'April 5, 2024',
    excerpt: 'Before assembling your PC, here are the must-have accessories — keyboard, mouse, cables, cooling, and more...',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop',
    category: 'Tutorial'
  },

  {
    id: 8,
    title: 'MONITOR SETTINGS THAT REDUCE EYE STRAIN & IMPROVE CLARITY',
    date: 'April 3, 2024',
    excerpt: 'Simple adjustments to brightness, contrast, and refresh rate can make your daily screen time much more comfortable...',
    image: blog8,
    category: 'Hardware'
  },

  {
    id: 9,
    title: '9 WAYS TO BOOST PC PERFORMANCE WITHOUT NEW PARTS',
    date: 'March 28, 2024',
    excerpt: 'Cable management, storage optimization, cleaning components — small accessories can instantly improve performance...',
    image: blog9,
    category: 'Tutorial'
  },
  {
    id: 10,
    title: 'BEST BUDGET ACCESSORIES FOR WORK FROM HOME SETUPS',
    date: 'March 25, 2024',
    excerpt: 'Laptop stands, webcams, microphones, and desk mats — affordable accessories that make your home office professional...',
    image: blog10,
    category: 'Accessories'
  },
  {
    id: 11,
    title: 'ARE WIRELESS MICE & KEYBOARDS RELIABLE IN 2024?',
    date: 'March 22, 2024',
    excerpt: 'Modern wireless accessories provide long battery life, strong connectivity, and lag-free performance — here’s what to know...',
    image: blog11,
    category: 'Hardware'
  },
  {
    id: 12,
    title: 'BEST DESK ORGANIZATION ACCESSORIES FOR A CLEAN WORKSPACE',
    date: 'March 20, 2024',
    excerpt: 'Cable organizers, monitor stands, desk trays — keep your setup clean, efficient, and productivity focused...',
    image: blog12,
    category: 'Accessories'
  }
];

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <>
      <div className='x_blog_dark_theme x_blog_cards'>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mb-3">Latest Blog Posts</h1>
            <p className="text-light-subtle">Explore expert guides, product reviews, and the newest computer accessories</p>
          </div>

          <Row className="g-4 mb-5">
            {currentPosts.map((post) => (
              <Col key={post.id} sm={6} md={4} xs={12}>
                <Card className="h-100 x_blog_card">
                  <Link to={`/blog/${post.id}`} className="text-decoration-none">
                    <div
                      className="x_card_image_container"
                      style={{
                        backgroundImage: `url(${post.image})`,
                      }}
                    >
                      <div className="x_card_category_badge">
                        {post.category}
                      </div>
                    </div>
                  </Link>
                  <Card.Body className="x_card_body">
                    <Card.Title className="fw-bold mb-2 x_card_title">
                      <Link to={`/blog/${post.id}`} className="x_card_title_link">
                        {post.title}
                      </Link>
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2 x_card_date">
                      {post.date}
                    </Card.Text>
                    <Card.Text className="x_card_excerpt">
                      {post.excerpt}
                    </Card.Text>
                    <Link
                      to={`/blog/${post.id}`}
                      className="x_read_more_link"
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
            <Pagination className="mb-0 x_pagination">
              <Pagination.Prev
              className='a_pagination_icon'
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
              className='a_pagination_icon'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              />
            </Pagination>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Blog;