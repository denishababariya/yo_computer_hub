import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWishlistIds } from '../store';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

// ⭐ Import your empty wishlist image
import emptyWishlist from '../img/ewish.png';

function Wishlist() {
  const ids = useSelector(selectWishlistIds);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products
        const response = await productAPI.getAll({ limit: 10000 });

        const allProducts = Array.isArray(response) ? response : response?.data || [];

        // Filter products that are in wishlist
        const wishedProducts = allProducts.filter(p =>
          ids.includes(p._id) || ids.includes(p.id)
        );

        setWishlistProducts(wishedProducts);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
        setWishlistProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (ids.length > 0) {
      fetchWishlistProducts();
    } else {
      setWishlistProducts([]);
      setLoading(false);
    }
  }, [ids]);

  return (
    <section className='wishlist-bg' >
      <Container className="py-4">
        <h2 className="text-center mb-3 xyz_subtitle">WISHLIST</h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading wishlist...</p>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="wishlist-empty text-center d-flex flex-column align-items-center justify-content-center">

            {/* IMAGE */}
            <img
              src={emptyWishlist}
              alt="Empty Wishlist"
              className="empty-icon mb-md-4 mb-2"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                opacity: 0.7,
              }}
            />

            {/* TEXT */}
            <p className="empty-text" style={{ fontSize: '1.4rem', fontWeight: '600', color: '#e5e5e5' }}>
              Your wishlist is empty
            </p>
            <p className="empty-sub" style={{ color: '#777' }}>
              Add products to see them here!
            </p>

          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {wishlistProducts.map((p) => (
              <Col key={p._id || p.id}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default Wishlist;
