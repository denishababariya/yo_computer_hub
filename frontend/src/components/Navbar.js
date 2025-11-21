import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Nav, Form, InputGroup, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { selectWishlistCount, selectCartCount } from "../store";
import { logout as logoutAuth, getToken } from "../utils/auth";

function Navbar4() {
  const [show, setShow] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  // Clear the search input when Shop dispatches a clear event (e.g. filter applied)
  useEffect(() => {
    const onSearchCleared = () => setSearchTerm('');
    window.addEventListener('searchCleared', onSearchCleared);
    return () => window.removeEventListener('searchCleared', onSearchCleared);
  }, []);
  
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleProfileClick = () => {
  setShowProfileDropdown(!showProfileDropdown);
  };
  
  const handleLogout = async () => {
    try {
      // Call logout API
      await authAPI.logout();
      
      // Clear local auth data
      logoutAuth();
      
      // Update isLoggedIn state
      setIsLoggedIn(false);
      
      // Close dropdown
      setShowProfileDropdown(false);
      
      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear local data and redirect
      logoutAuth();
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const q = (value || '').trim();
    // Apply search in real-time as user types
    if (q.length === 0) {
      navigate('/shop');
    } else {
      navigate(`/shop?search=${encodeURIComponent(q)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const q = (searchTerm || '').trim();
    if (q.length === 0) {
      navigate('/shop');
      return;
    }
    navigate(`/shop?search=${encodeURIComponent(q)}`);
  };

  // Close dropdown when clicking outside or when clicking the dropdown area itself
  const profileBtnRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleDocClick = (e) => {
      const target = e.target;
      if (showProfileDropdown) {
        if (profileDropdownRef.current && profileDropdownRef.current.contains(target)) {
          // if clicked inside dropdown area (bar), close it
          setShowProfileDropdown(false);
          return;
        }
        if (profileBtnRef.current && profileBtnRef.current.contains(target)) {
          // clicking the button toggles elsewhere; ignore here
          return;
        }
        // clicked outside
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, [showProfileDropdown]);

  return (
    <div className="z_nav_wrapper z_nav_menu py-3">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="z_nav_logo fw-bold fs-3 text-white">
            <img src={require("../img/logo3.png")} alt="" style={{width:'50px'}} />
          </Link>
          <Nav className="z_nav_items d-none d-lg-flex">
            <NavLink to="/" className="z_nav_link">HOME</NavLink>
            <NavLink to="/about" className="z_nav_link">ABOUT US</NavLink>
            <NavLink to="/Shop" className="z_nav_link">Shop</NavLink>
            <NavLink to="/blog" className="z_nav_link">BLOG</NavLink>
            <NavLink to="/contact" className="z_nav_link">CONTACT US</NavLink>
          </Nav>
          <div className="z_right_section d-flex align-items-center gap-4">
            <Form className="z_search_glass d-none d-md-block" onSubmit={handleSearchSubmit}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    className="z_glass_input"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <Button type="submit" className="z_glass_btn">
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            <div className="z_nav_icons d-flex align-items-center gap-4">
              <Link to="/wishlist" className="z_glow_icon position-relative">
                <i className="bi bi-heart"></i>
                {wishlistCount > 0 && <span className="z_cart_count">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="z_glow_icon position-relative">
                <i className="bi bi-cart"></i>
                {cartCount > 0 && <span className="z_cart_count">{cartCount}</span>}
              </Link>
              <div className="z_profile_dropdown_wrapper position-relative">
                <button 
                  ref={profileBtnRef}
                  className="z_glow_icon z_profile_btn"
                  onClick={handleProfileClick}
                  style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
                >
                  <i className="bi bi-person"></i>
                </button>
                {showProfileDropdown && (
                  <div ref={profileDropdownRef} className="z_profile_dropdown">
                    {isLoggedIn ? (
                      <>
                        <Link to="/account" className="z_dropdown_item" onClick={() => setShowProfileDropdown(false)}>
                          <i className="bi bi-person-circle"></i> My Profile
                        </Link>
                        <button 
                          className="z_dropdown_item z_logout_item"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                      </>
                    ) : (
                      <Link to="/login" className="z_dropdown_item" onClick={() => setShowProfileDropdown(false)}>
                        <i className="bi bi-box-arrow-in-right"></i> Login
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Offcanvas button at end for mobile/tablet */}
            <Button variant="outline-light" className="d-lg-none ms-2" onClick={handleShow}>
              <i className="bi bi-list" style={{fontSize: '1.5rem'}}></i>
            </Button>
          </div>
        </div>
      </Container>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="z_nav_offcanvas_custom bg-dark">
        <Offcanvas.Header closeButton className="z_nav_offcanvas_header align-items-center">
          <Offcanvas.Title>
            <span className="z_nav_logo text-white">YO HUB</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="z_nav_offcanvas_body">
          <Form className="mb-md-4 mb-2" onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(e); handleClose(); }}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search products..."
                className="z_glass_input"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Button type="submit" className="z_glass_btn">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Nav className="flex-column gap-3 mb-md-4 mb-2">
            <NavLink to="/" className={({isActive}) => isActive ? "z_offcan_nav active" : "z_offcan_nav"} onClick={handleClose}>HOME</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "z_offcan_nav active" : "z_offcan_nav"} onClick={handleClose}>ABOUT US</NavLink>
            <NavLink to="/shop" className={({isActive}) => isActive ? "z_offcan_nav active" : "z_offcan_nav"} onClick={handleClose}>SHOP</NavLink>
            <NavLink to="/blog" className={({isActive}) => isActive ? "z_offcan_nav active" : "z_offcan_nav"} onClick={handleClose}>BLOG</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "z_offcan_nav active" : "z_offcan_nav"} onClick={handleClose}>CONTACT US</NavLink>
          </Nav>
          <div className="z_nav_offcanvas_line"></div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Navbar4;
