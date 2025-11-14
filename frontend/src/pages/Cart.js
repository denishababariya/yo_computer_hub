import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { setQty, removeFromCart, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const entries = Object.entries(items);
  const subtotal = entries.reduce((s, [, { product, qty }]) => s + product.price * qty, 0);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Cart</h1>
      {entries.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Button as={Link} to="/shop" variant="dark">Go Shopping</Button>
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
                  <td style={{maxWidth:120}}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={qty}
                      onChange={(e) => dispatch(setQty({ id, qty: parseInt(e.target.value || 0, 10) }))}
                    />
                  </td>
                  <td>${(product.price * qty).toFixed(2)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeFromCart(id))}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
            <div className="h5 mb-0">Subtotal: ${subtotal.toFixed(2)} CAD</div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <Button as={Link} to="/shop" variant="dark">Continue Shopping</Button>
            <Button as={Link} to="/checkout" variant="danger">Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;