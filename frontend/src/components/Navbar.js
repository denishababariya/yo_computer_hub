import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount, selectWishlistCount } from '../store';

function AppNavbar() {
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector(selectWishlistCount);
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="border-bottom border-secondary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Yo Computer Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/wishlist">Wishlist <Badge bg="primary">{wishCount}</Badge></Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart <Badge bg="danger">{cartCount}</Badge></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;