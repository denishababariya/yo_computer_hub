import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const dispatch = useDispatch();

  if (!product) {
    return (
      <Container className="py-5">
        <h2>Product not found</h2>
        <Button as={Link} to="/shop" variant="dark" className="mt-3">Back to Shop</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow" />
        </Col>
        <Col md={6}>
          <h1 className="h3">{product.name}</h1>
          <div className="text-muted mb-2">{product.brand} · {product.category}</div>
          <div className="h4 text-theme mb-3">${product.price.toFixed(2)} {product.currency}</div>
          <p>{product.description}</p>
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={() => dispatch(addToCart({ id: product.id, product, qty: 1 }))}>Add to Cart</Button>
            <Button as={Link} to="/checkout" variant="primary">Buy Now</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;