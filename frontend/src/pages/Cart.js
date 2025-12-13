import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
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
  const subtotal = entries.reduce((s, [, { product, qty }]) => s + product.price * qty, 0);
  const userAuthenticated = isAuthenticated();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className='h-100'  style={{
        backgroundColor: "#111",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        color: "#f8f9fa",
      
        padding: isMobile ? "20px" : "30px",    
      }}
    >
      <Container className="py-4">
        {/* <h2 className="text-center mb-3 xyz_subtitle">YOUR CART</h2> */}
          <Title text="YOUR CART" theme="dark" align="center" />
        {entries.length === 0 ? (
          <div className="wishlist-empty text-center d-flex flex-column align-items-center justify-content-center">

            {/* IMAGE */}
            <img
              src={emptyCart}
              alt="Empty cart"
              className="empty-icon mb-md-4 mb-2"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                opacity: 0.7,
              }}
            />

            {/* TEXT */}
            <p className="empty-text" style={{ fontSize: '1.4rem', fontWeight: '600' }}>
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
                backgroundColor: 'rgba(30, 30, 30, 0.9)', // Slightly opaque dark background
                border: '1px solid #444',
                borderRadius: '8px',
                overflow: 'hidden' // Ensures rounded corners apply
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#2c2c2c', color: '#00d4ff' }}> {/* Dark header with a neon accent color */}
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
                  <tr key={id} style={{ borderBottom: '1px solid #333' }}> {/* Subtle separator */}

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td className='text-nowrap'>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>

                    {/* ===== QTY INPUT ===== */}
                    <td >
                      <Form.Control
                        type="number"
                        min={0}
                        max={50}
                        value={qty}
                        // Styled Form.Control for dark mode
                        style={{
                          width: "70px",
                          backgroundColor: '#444', // Dark input background
                          color: '#fff',
                          border: '1px solid #666'
                        }}
                        onChange={(e) =>
                          dispatch(setQty({ id, qty: parseInt(e.target.value || 0, 10) }))
                        }
                      />
                    </td>

                    <td>${(product.price * qty).toFixed(2)}</td>
                    <td>
                      <Button
                        variant=""
                        size="sm"
                        onClick={() => dispatch(removeFromCart(id))}
                        className='text-light'
                      >
                        <CiCircleRemove size={32} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3 mt-md-0">
              <Button variant="outline-secondary" onClick={() => dispatch(clearCart())}>
                Clear cart
              </Button>
              <div className="h5 mb-0">Subtotal: ${subtotal.toFixed(2)}</div>
            </div>

            {!userAuthenticated && (
              <Alert variant="info" className="mt-3">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Please log in to proceed with checkout.</strong>
              </Alert>
            )}

            <div className="mt-3 d-flex gap-2">
              <Button as={Link} to="/shop" variant="dark">Continue Shopping</Button>
              {userAuthenticated ? (
                <Button as={Link} to="/checkout" variant="danger" className='text-light'>Checkout</Button>
              ) : (
                <Button as={Link} to="/login" variant="danger">Login to Checkout</Button>
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

export default Cart;
