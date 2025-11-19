import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
import { setQty, removeFromCart, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

import emptyCart from '../img/ecart.png';


function Cart() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const entries = Object.entries(items);
  const subtotal = entries.reduce((s, [, { product, qty }]) => s + product.price * qty, 0);
  const userAuthenticated = isAuthenticated();

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3 xyz_subtitle">YOUR CART</h2>
      {entries.length === 0 ? (
        <div className="wishlist-empty text-center d-flex flex-column align-items-center justify-content-center">

          {/* IMAGE */}
          <img
            src={emptyCart}
            alt="Empty cart"
            className="empty-icon mb-4"
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
          <Table responsive hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([id, { product, qty }]) => (
                <tr key={id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>

                  {/* ===== UPDATED WIDTH HERE ===== */}
                  <td style={{ maxWidth: 70 }}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={qty}
                      style={{ width: "70px" }}   // 👈 reduced width
                      onChange={(e) =>
                        dispatch(setQty({ id, qty: parseInt(e.target.value || 0, 10) }))
                      }
                    />
                  </td>

                  <td>${(product.price * qty).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(id))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
            <div className="h5 mb-0">Subtotal: ${subtotal.toFixed(2)} CAD</div>
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
              <Button as={Link} to="/checkout" variant="danger" className='text-dark'>Checkout</Button>
            ) : (
              <Button as={Link} to="/login" variant="danger">Login to Checkout</Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
