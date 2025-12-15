import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store';
import {
  Container,
  Table,
  Button,
  Form,
  Alert,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { setQty, removeFromCart, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { CiCircleRemove } from "react-icons/ci";

import emptyCart from '../img/ecart.png';
import Title from '../components/Title';

function Cart() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const entries = Object.entries(items);
  const subtotal = entries.reduce(
    (s, [, { product, qty }]) => s + product.price * qty,
    0
  );

  const userAuthenticated = isAuthenticated();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  /* 🔔 TOAST STATE */
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        className="h-100"
        style={{
          backgroundColor: "#111",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          color: "#f8f9fa",
          padding: isMobile ? "20px" : "30px",
        }}
      >
        <Container className="py-4">
          <Title text="YOUR CART" theme="dark" align="center" />

          {entries.length === 0 ? (
            <div className="wishlist-empty text-center d-flex flex-column align-items-center justify-content-center">
              <img
                src={emptyCart}
                alt="Empty cart"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'contain',
                  opacity: 0.7,
                }}
              />
              <p className="mt-3" style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                Your cart is empty.
              </p>
              <Button as={Link} to="/shop" variant="dark">
                Go Shopping
              </Button>
            </div>
          ) : (
            <>
              <Table
                responsive
                hover
                variant="dark"
                style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.9)',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#2c2c2c', color: '#00d4ff' }}>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {entries.map(([id, { product, qty }]) => (
                    <tr key={id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </td>

                      <td className="text-nowrap">{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>

                      {/* 🔢 QTY INPUT WITH LIMIT */}
                      <td>
                        <Form.Control
                          type="number"
                          min={1}
                          value={qty}
                          style={{
                            width: "70px",
                            backgroundColor: '#444',
                            color: '#fff',
                            border: '1px solid #666',
                          }}
                          onChange={(e) => {
                            const value = parseInt(e.target.value || 0, 10);

                            if (value > 50) {
                              setNotificationMessage("A maximum of 50 items can be added to the cart.");
                              setShowNotification(true);
                              setTimeout(
                                () => setShowNotification(false),
                                3000
                              );
                              return;
                            }

                            dispatch(setQty({ id, qty: value }));
                          }}
                        />
                      </td>

                      <td>${(product.price * qty).toFixed(2)}</td>

                      <td>
                        <Button
                          variant=""
                          size="sm"
                          onClick={() => dispatch(removeFromCart(id))}
                          className="text-light"
                        >
                          <CiCircleRemove size={32} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear cart
                </Button>
                <div className="h5 mb-0">
                  Subtotal: ${subtotal.toFixed(2)}
                </div>
              </div>

              {!userAuthenticated && (
                <Alert variant="info" className="mt-3">
                  <strong>Please log in to proceed with checkout.</strong>
                </Alert>
              )}

              <div className="mt-3 d-flex gap-2">
                <Button as={Link} to="/shop" variant="dark">
                  Continue Shopping
                </Button>

                {userAuthenticated ? (
                  <Button
                    as={Link}
                    to="/checkout"
                    variant="danger"
                    className="text-light"
                  >
                    Checkout
                  </Button>
                ) : (
                  <Button as={Link} to="/login" variant="danger">
                    Login to Checkout
                  </Button>
                )}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* 🔔 TOAST NOTIFICATION */}
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
            <strong className="me-auto">Cart Alert</strong>
          </Toast.Header>
          <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Cart;
