import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { selectWishlistIds } from '../store';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistIds);
  const wished = wishlist.includes(product.id);

  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <div className="product-thumb position-relative overflow-hidden">
        <Link to={`/shop/${product.id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>
        {onSale && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">Sale</Badge>
        )}
        <div className="product-actions d-flex gap-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => dispatch(addToCart({ id: product.id, product, qty: 1 }))}
          >
            Add to Cart
          </Button>
          <Button
            size="sm"
            variant={wished ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(toggleWishlist(product.id))}
          >
            {wished ? 'Wishlisted' : 'Wishlist'}
          </Button>
          <Button as={Link} size="sm" variant="dark" to={`/shop/${product.id}`}>
            Details
          </Button>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="fs-6 mb-1 text-truncate">{product.name}</Card.Title>
        <Card.Text className="mb-2 text-muted small">{product.brand} · {product.category}</Card.Text>
        <div className="d-flex align-items-center gap-2">
          <div className="fw-bold text-theme">${product.price.toFixed(2)} {product.currency}</div>
          {onSale && <del className="text-muted small">${product.compareAtPrice.toFixed(2)}</del>}
        </div>
        {typeof product.rating === 'number' && (
          <div className="small text-warning">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))} <span className="text-muted">({product.reviews})</span></div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;