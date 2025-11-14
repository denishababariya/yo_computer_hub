import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const posts = [
  { id: 1, title: 'Best GPUs for 2025 Gaming', excerpt: 'A quick guide to choosing the right GPU for your needs.' },
  { id: 2, title: 'How to Pick a Power Supply', excerpt: 'Wattage, efficiency ratings, and headroom explained simply.' },
  { id: 3, title: 'NVMe vs SATA SSDs', excerpt: 'When to upgrade and what you can expect in real-world speeds.' },
];

function Blog() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">Blog</h1>
      <Row className="g-3">
        {posts.map(p => (
          <Col md={4} key={p.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>{p.excerpt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;