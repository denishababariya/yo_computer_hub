import React, { useState } from "react";
import { Container, Nav, Form, InputGroup, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function Navbar4() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="z_nav_wrapper z_nav_menu py-3">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="z_nav_logo fw-bold fs-3 text-white">
            LOGO
          </Link>
          <Nav className="z_nav_items d-none d-lg-flex">
            <NavLink to="/" className="z_nav_link">HOME</NavLink>
            <NavLink to="/about" className="z_nav_link">ABOUT US</NavLink>
            <NavLink to="/Shop" className="z_nav_link">Shop</NavLink>
            <NavLink to="/blog" className="z_nav_link">BLOG</NavLink>
            <NavLink to="/contact" className="z_nav_link">CONTACT US</NavLink>
          </Nav>
          <div className="z_right_section d-flex align-items-center gap-4">
            <Form className="z_search_glass d-none d-md-block">
              <InputGroup>
                <Form.Control type="text" placeholder="Search products..." className="z_glass_input" />
                <Button className="z_glass_btn">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
            <div className="z_nav_icons d-flex align-items-center gap-4">
              <Link to="/wishlist" className="z_glow_icon">
                <i className="bi bi-heart"></i>
              </Link>
              <Link to="/cart" className="z_glow_icon position-relative">
                <i className="bi bi-cart"></i>
                <span className="z_cart_count">3</span>
              </Link>
              <Link to="/account" className="z_glow_icon">
                <i className="bi bi-person"></i>
              </Link>
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
          <Form className="mb-4">
            <InputGroup>
              <Form.Control type="text" placeholder="Search products..." className="z_glass_input" />
              <Button className="z_glass_btn">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Nav className="flex-column gap-3 mb-4">
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
 
 