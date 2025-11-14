import React from 'react';
import { useSelector } from 'react-redux';
import { selectWishlistIds } from '../store';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const ids = useSelector(selectWishlistIds);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <Container className="py-4">
      <h1 className="mb-3">Wishlist</h1>
      {list.length === 0 ? (
        <Alert variant="info">Your wishlist is empty.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {list.map((p) => (
            <Col key={p.id}><ProductCard product={p} /></Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Wishlist;