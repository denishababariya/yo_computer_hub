import React from "react";
import { Container, Nav, Form, InputGroup, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function Navbar4() {
  return (
    <div className="z_nav_wrapper z_nav_menu py-3">
      <Container>
        <div className=" d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <Link to="/" className="z_nav_logo fw-bold fs-3 text-white">
            LOGO
          </Link>

          {/* NAV LINKS */}
          <Nav className="z_nav_items d-none d-lg-flex gap-4">
            <NavLink to="/" className="z_nav_link">HOME</NavLink>
            <NavLink to="/about" className="z_nav_link">ABOUT US</NavLink>
            <NavLink to="/portfolio" className="z_nav_link">PORTFOLIO</NavLink>
            <NavLink to="/services" className="z_nav_link">SERVICES</NavLink>
            <NavLink to="/contact" className="z_nav_link">CONTACT US</NavLink>
          </Nav>

          {/* SEARCH + ICONS */}
          <div className="z_right_section d-flex align-items-center gap-4">

            {/* SEARCH BAR - GLASS EFFECT */}
            <Form className="z_search_glass d-none d-md-block">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  className="z_glass_input"
                />
                <Button className="z_glass_btn">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            {/* ICONS */}
            <div className="z_nav_icons d-flex align-items-center gap-4">

              <Link to="/wishlist" className="z_glow_icon">
                <i className="bi bi-heart"></i>
              </Link>

              <Link to="/cart" className="z_glow_icon position-relative">
                <i className="bi bi-cart"></i>
                <span className="z_cart_count">3</span>
              </Link>

              <Link to="/profile" className="z_glow_icon">
                <i className="bi bi-person"></i>
              </Link>

            </div>

          </div>


        </div>
      </Container>
    </div>
  );
}

export default Navbar4;
