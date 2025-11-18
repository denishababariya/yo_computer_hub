import React, { useState } from 'react';
import { Card, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { selectWishlistIds } from '../store';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistIds);
  const productId = product._id || product.id;
  const wished = wishlist.includes(productId);
  const [showActions, setShowActions] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const onSale = product.originalPrice && product.originalPrice > product.price;
  const rating = product.rating || 0;
  const reviews = product.reviews?.length || 0;
  const inStock = product.stock > 0;
  
  // Render star rating with red stars
  const renderStars = () => {
    if (rating === 0 && reviews === 0) {
      return (
        <div className="d-flex align-items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-muted" style={{ fontSize: '0.85rem' }}>★</span>
          ))}
          <span className="text-muted small ms-1">No reviews</span>
        </div>
      );
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5 && rating % 1 < 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="d-flex align-items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-danger" style={{ fontSize: '0.85rem' }}>★</span>
        ))}
        {hasHalfStar && (
          <span className="text-danger" style={{ fontSize: '0.85rem', opacity: 0.6 }}>★</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-muted" style={{ fontSize: '0.85rem' }}>★</span>
        ))}
        <span className="text-muted small ms-1">
          {reviews === 1 ? '1 review' : `${reviews} reviews`}
        </span>
      </div>
    );
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(productId));
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Compare functionality - can be implemented later
    alert('Compare functionality coming soon!');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality
    window.open(`/shop/${productId}`, '_blank');
  };

  const discountPercent = onSale 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="product-card h-100 border-0 shadow-sm x_main-product-card position-relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{ borderRadius: '8px', overflow: 'hidden' }}
    >
      <div className="product-thumb position-relative overflow-hidden" style={{ height: '250px', background: '#f8f9fa' }}>
        {/* Category Badge - Top Left */}
        <Badge 
          bg="dark"
          className="position-absolute top-0 start-0 m-2 px-2 py-1 fw-bold"
          style={{ 
            fontSize: '0.7rem', 
            letterSpacing: '1px',
            borderRadius: '4px',
            zIndex: 3
          }}
        >
          {product.category.toUpperCase()}
        </Badge>

        {/* Interactive Icons - Top Right */}
        <div 
          className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2"
          style={{ 
            zIndex: 3,
            opacity: showActions ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}
        >
          <button
            className="btn btn-light btn-sm p-2 rounded-circle border-0 shadow-sm"
            style={{ 
              width: '32px', 
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: wished ? '#5588c9' : 'rgba(255,255,255,0.9)',
              color: wished ? 'white' : '#666'
            }}
            onClick={handleWishlist}
            title="Add to Wishlist"
          >
            <i className={`bi ${wished ? 'bi-heart-fill' : 'bi-heart'}`} style={{ fontSize: '0.9rem' }}></i>
          </button>
          <button
            className="btn btn-light btn-sm p-2 rounded-circle border-0 shadow-sm"
            style={{ 
              width: '32px', 
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#666'
            }}
            onClick={handleCompare}
            title="Compare"
          >
            <i className="bi bi-arrow-repeat" style={{ fontSize: '0.9rem' }}></i>
          </button>
          <button
            className="btn btn-light btn-sm p-2 rounded-circle border-0 shadow-sm"
            style={{ 
              width: '32px', 
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#666'
            }}
            onClick={handleQuickView}
            title="Quick View"
          >
            <i className="bi bi-arrows-fullscreen" style={{ fontSize: '0.9rem' }}></i>
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/shop/${productId}`} className="d-block h-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-100 h-100"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.35s ease',
              display: 'block'
            }}
          />
        </Link>

        {/* Discount Badge - Below Image (if on sale) - Only show when not hovering */}
        {onSale && discountPercent > 0 && !showActions && (
          <Badge 
            className="position-absolute bottom-0 start-0 m-2 px-3 py-2 fw-bold"
            style={{ 
              fontSize: '0.8rem', 
              letterSpacing: '0.5px',
              borderRadius: '6px',
              zIndex: 2,
              backgroundColor: '#ff8c00',
              color: '#000',
              border: 'none',
              transition: 'opacity 0.3s ease'
            }}
          >
            SAVE {discountPercent}%
          </Badge>
        )}

        {/* Add to Cart Button - Bottom Center (on hover) */}
        <div 
          className="product-actions position-absolute bottom-0 start-50 translate-middle-x mb-3"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
            transition: 'all 0.3s ease',
            zIndex: 4,
            width: 'calc(100% - 2rem)',
            pointerEvents: showActions ? 'auto' : 'none'
          }}
        >
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart({ id: productId, product, qty: 1 }));
              // Remove from wishlist if product is in wishlist
              if (wished) {
                dispatch(toggleWishlist(productId));
                setNotificationMessage(`${product.name} added to cart and removed from wishlist`);
              } else {
                setNotificationMessage(`${product.name} added to cart`);
              }
              setShowNotification(true);
              // Auto-hide notification after 3 seconds
              setTimeout(() => setShowNotification(false), 3000);
            }}
            className="w-100 fw-semibold"
            style={{ 
              borderRadius: '6px',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#5588c9',
              border: 'none'
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>

      <Card.Body className="p-3">
        {/* Product Name */}
        <Card.Title 
          className="fs-6 mb-2 fw-normal" 
          style={{ 
            minHeight: '2.5rem',
            lineHeight: '1.4',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            color: '#333',
            fontSize: '0.95rem'
          }}
        >
          {product.name}
        </Card.Title>
        
        {/* Star Rating */}
        <div className="mb-2">
          {renderStars()}
        </div>
        
        {/* Price and Stock Status */}
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex flex-column">
            {onSale ? (
              <>
                <div className="fw-bold fs-5 text-danger" style={{ lineHeight: '1.2' }}>
                  ${product.price.toFixed(2)}
                </div>
                <del className="text-muted small" style={{ fontSize: '0.85rem' }}>
                  ${product.originalPrice?.toFixed(2)}
                </del>
              </>
            ) : (
              <div className="fw-bold fs-5" style={{ lineHeight: '1.2', color: '#333' }}>
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          {inStock && (
            <Button
              variant="success"
              size="sm"
              className="px-3 fw-semibold"
              disabled
              style={{ 
                borderRadius: '6px',
                fontSize: '0.75rem',
                backgroundColor: '#90EE90',
                color: '#000',
                border: 'none',
                cursor: 'default',
                fontWeight: 600
              }}
            >
              In Stock
            </Button>
          )}
        </div>
      </Card.Body>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3" style={{ position: 'fixed', zIndex: 9999 }}>
        <Toast show={showNotification} onClose={() => setShowNotification(false)} delay={3000} autohide>
          <Toast.Header closeButton style={{ backgroundColor: '#5588c9', color: 'white' }}>
            <strong className="me-auto">Cart Updated</strong>
          </Toast.Header>
          <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
}

export default ProductCard;