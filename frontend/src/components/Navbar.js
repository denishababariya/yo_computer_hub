import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount, selectWishlistCount } from '../store';
import { getUser, logout } from '../utils/auth';

function AppNavbar() {
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector(selectWishlistCount);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getUser();
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    'HEADSETS',
    'KEYBOARDS',
    'MOUSE',
    'GAMING CONTROLLERS',
    'MONITORS',
    'MICROPHONES',
    'POWER',
    'ACCESSORIES',
    'SALE'
  ];

  return (
    <>
      {/* Red Top Bar */}
      <div className="bg-danger text-white py-1 text-center" style={{ fontSize: '0.75rem' }}>
        <Container fluid="xxl">
          <small>Free Shipping on All Orders Over $50</small>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="border-0">
        <Container fluid="xxl">
          {/* Logo with Red Triangle in A */}
          <Navbar.Brand as={NavLink} to="/" className="fw-bold me-4" style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
            <span style={{ position: 'relative' }}>
              R
              <span style={{ position: 'relative', display: 'inline-block' }}>
                A
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '-2px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    color: '#e4002b',
                    fontSize: '0.6em'
                  }}
                >
                  ▲
                </span>
              </span>
              ZOX
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            {/* Main Navigation */}
            <Nav className="me-auto align-items-center">
              <Nav.Link as={NavLink} to="/" className="text-danger fw-semibold d-flex align-items-center">
                Home <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shop" className="text-white d-flex align-items-center">
                Shop <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/pages" className="text-white d-flex align-items-center">
                Pages <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog" className="text-white">
                Blog
              </Nav.Link>
            </Nav>

            {/* Search Bar */}
            <Form onSubmit={handleSearch} className="d-none d-lg-flex me-3" style={{ minWidth: '300px', maxWidth: '400px', flex: 1 }}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search products or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-0"
                  style={{ 
                    borderRadius: '25px 0 0 25px',
                    paddingLeft: '20px',
                    fontSize: '0.9rem'
                  }}
                />
                <Button 
                  variant="light" 
                  type="submit"
                  style={{ 
                    borderRadius: '0 25px 25px 0',
                    border: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            {/* Language Selector */}
            <Dropdown className="d-none d-md-block me-3">
              <Dropdown.Toggle 
                variant="dark" 
                id="language-dropdown"
                className="border-0 bg-transparent text-white d-flex align-items-center"
                style={{ fontSize: '0.9rem' }}
              >
                {language} <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7rem' }}></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLanguage('English')}>English</Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('Spanish')}>Spanish</Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('French')}>French</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Icons */}
            <Nav className="d-flex align-items-center gap-3">
              {isLoggedIn && user ? (
                <Dropdown className="text-white">
                  <Dropdown.Toggle 
                    variant="dark" 
                    className="border-0 bg-transparent text-white d-flex align-items-center"
                    style={{ fontSize: '1rem' }}
                    id="user-dropdown"
                  >
                    <i className="bi bi-person" style={{ fontSize: '1.2rem' }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>{user.name || user.email}</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-white p-1" title="Login">
                  <i className="bi bi-person" style={{ fontSize: '1.2rem' }}></i>
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/wishlist" className="text-white p-1 position-relative" title="Wishlist">
                <i className="bi bi-heart" style={{ fontSize: '1.2rem' }}></i>
                {wishCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-circle"
                    style={{ fontSize: '0.6rem', padding: '2px 4px' }}
                  >
                    {wishCount}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="text-white p-1 position-relative" title="Cart">
                <i className="bi bi-cart" style={{ fontSize: '1.2rem' }}></i>
                {cartCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-circle"
                    style={{ fontSize: '0.6rem', padding: '2px 4px' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Secondary Navigation Bar - Categories */}
      <div className="bg-white border-bottom py-2">
        <Container fluid="xxl">
          <Nav className="d-flex flex-wrap align-items-center gap-3 gap-md-4" style={{ fontSize: '0.85rem' }}>
            {categories.map((category, index) => (
              <Nav.Link 
                key={index}
                as={Link}
                to={`/shop?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-dark fw-bold text-uppercase px-0"
                style={{ 
                  letterSpacing: '0.5px',
                  fontSize: '0.8rem',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#e4002b'}
                onMouseLeave={(e) => e.target.style.color = '#333'}
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </div>
    </>
  );
}

export default AppNavbar;
