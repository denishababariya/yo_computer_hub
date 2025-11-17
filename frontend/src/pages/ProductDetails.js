import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { productAPI } from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id);
        if (response.success) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="mt-3">Loading product...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Product not found'}</Alert>
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
          <div className="text-muted mb-2">{product.category}</div>
          <div className="h4 text-danger mb-3">${product.price.toFixed(2)}</div>
          <p>{product.description}</p>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <>
              <h6>Specifications:</h6>
              <ul className="mb-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </>
          )}

          <div className="d-flex gap-2">
            <Button variant="danger" onClick={() => dispatch(addToCart({ id: product._id || product.id, product, qty: 1 }))}>Add to Cart</Button>
            <Button as={Link} to="/checkout" variant="primary">Buy Now</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;