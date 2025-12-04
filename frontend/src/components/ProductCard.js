import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { selectWishlistIds } from "../store";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistIds);

  const productId = product._id || product.id;
  const wished = wishlist.includes(productId);

  const [showActions, setShowActions] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const onSale = product.originalPrice && product.originalPrice > product.price;
  const rating = product.rating || 0;
  const reviews = product.reviews?.length || 0;
  const inStock = product.stock > 0;

  // ⭐ RENDER STAR RATING
  const renderStars = () => {
    if (rating === 0 && reviews === 0) {
      return (
        <div className="d-flex align-items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-muted" style={{ fontSize: "0.85rem" }}>
              ★
            </span>
          ))}
          <span className="small ms-1" style={{ color: "rgb(139 152 165)" }}>
            No reviews
          </span>
        </div>
      );
    }

    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="d-flex align-items-center gap-1">
        {[...Array(full)].map((_, i) => (
          <span key={i} className="text-danger" style={{ fontSize: "0.85rem" }}>
            ★
          </span>
        ))}

        {half && (
          <span className="text-danger" style={{ fontSize: "0.85rem", opacity: 0.6 }}>
            ★
          </span>
        )}

        {[...Array(empty)].map((_, i) => (
          <span key={i} className="text-muted" style={{ fontSize: "0.85rem" }}>
            ★
          </span>
        ))}

        <span className="small ms-1" style={{ color: "#8b98a5" }}>
          {reviews === 1 ? "1 review" : `${reviews} reviews`}
        </span>
      </div>
    );
  };

  // Wishlist
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(productId));
  };

  // Quick view opens product page
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/shop/${productId}`, "_blank");
  };

  return (
    <>
      {/* ⭐ PRODUCT CARD */}
      <Card
        className="product-card h-100 border-0 shadow-sm x_main-product-card position-relative"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#2d343aff",
          color: "#e5e5e5",
          boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
        }}
      >
        <div
          className="product-thumb position-relative overflow-hidden"
          style={{
            height: "250px",
            background: "linear-gradient(180deg, #1c1f22, #111)",
          }}
        >
          {/* ⭐ ACTION ICONS */}
          <div
            className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2"
            style={{
              zIndex: 3,
              opacity: showActions ? 1 : 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* WISHLIST */}
            <button
              className="btn btn-light btn-sm p-2 rounded-circle border-0 shadow-sm"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: wished ? "#5588c9" : "rgba(255,255,255,0.9)",
                color: wished ? "white" : "#666",
              }}
              onClick={handleWishlist}
            >
              <i className={`bi ${wished ? "bi-heart-fill" : "bi-heart"}`} style={{ fontSize: "0.9rem" }}></i>
            </button>

            {/* QUICK VIEW */}
            <button
              className="btn btn-light btn-sm p-2 rounded-circle border-0 shadow-sm"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "rgba(255,255,255,0.9)",
                color: "#666",
              }}
              onClick={handleQuickView}
            >
              <i className="bi bi-arrows-fullscreen" style={{ fontSize: "0.9rem" }}></i>
            </button>
          </div>

          {/* PRODUCT IMAGE */}
          <Link to={`/shop/${productId}`} className="d-block h-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-100 h-100"
              style={{ objectFit: "cover", transition: "transform 0.35s ease" }}
            />
          </Link>

          {/* ADD TO CART */}
          <div
            className="product-actions position-absolute bottom-0 start-50 translate-middle-x mb-3"
            style={{
              opacity: showActions ? 1 : 0,
              transform: showActions
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(10px)",
              transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              zIndex: 4,
              width: "calc(100% - 2rem)",
              pointerEvents: showActions ? "auto" : "none",
            }}
          >
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                dispatch(addToCart({ id: productId, product, qty: 1 }));

                if (wished) {
                  dispatch(toggleWishlist(productId));
                  setNotificationMessage(`${product.name} added to cart and removed from wishlist`);
                } else {
                  setNotificationMessage(`${product.name} added to cart`);
                }

                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
              }}
              className="w-100 fw-semibold"
              style={{
                borderRadius: "6px",
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#5588c9",
                border: "none",
              }}
            >
              Add To Cart
            </Button>
          </div>
        </div>

        {/* CARD BODY */}
        <Card.Body className="p-3">
          <Card.Title className="fs-5 mb-0 fw-semibold product-title">
            {product.name}
          </Card.Title>

          <div className="mb-2">{renderStars()}</div>

          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex flex-column">
              {onSale ? (
                <>
                  <div className="fw-bold fs-5 text-theme">${product.price.toFixed(2)}</div>
                  <del className="small product-old-price">${product.originalPrice?.toFixed(2)}</del>
                </>
              ) : (
                <div className="fw-bold fs-5 text-theme">${product.price.toFixed(2)}</div>
              )}
            </div>

            {inStock && (
              <Button size="sm" disabled className="product-stock-btn">
                In Stock
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* ⭐ GLOBAL TOAST – ALWAYS TOP RIGHT */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: "fixed", zIndex: 20000 }}
      >
        <Toast
          show={showNotification}
          onClose={() => setShowNotification(false)}
          autohide
          delay={3000}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Cart Updated</strong>
          </Toast.Header>
          <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ProductCard;
