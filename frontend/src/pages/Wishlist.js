import React from 'react';
import { useSelector } from 'react-redux';
import { selectWishlistIds } from '../store';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

// ⭐ Import your empty wishlist image
import emptyWishlist from '../img/ewish.png';

function Wishlist() {
  const ids = useSelector(selectWishlistIds);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3 xyz_subtitle">WISHLIST</h2>

      {list.length === 0 ? (
        <div className="wishlist-empty text-center d-flex flex-column align-items-center justify-content-center">

          {/* IMAGE */}
          <img
            src={emptyWishlist}
            alt="Empty Wishlist"
            className="empty-icon mb-4"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'contain',
              opacity: 0.7,
            }}
          />

          {/* TEXT */}
          <p className="empty-text" style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Your wishlist is empty
          </p>
          <p className="empty-sub" style={{ color: '#777' }}>
            Add products to see them here!
          </p>

        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {list.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Wishlist;
