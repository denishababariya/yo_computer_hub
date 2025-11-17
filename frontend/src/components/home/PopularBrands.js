import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PopularBrands() {
  const brands = [
    {
      name: 'MSI',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/MSI-Logo.png',
      url: '/shop?brand=msi'
    },
    {
      name: 'Corsair',
      logo: 'https://logos-world.net/wp-content/uploads/2021/09/Corsair-Logo.png',
      url: '/shop?brand=corsair'
    },
    {
      name: 'NVIDIA',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/NVIDIA-Logo.png',
      url: '/shop?brand=nvidia'
    },
    {
      name: 'Logitech',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Logitech-Logo.png',
      url: '/shop?brand=logitech'
    },
    {
      name: 'AMD',
      logo: 'https://logos-world.net/wp-content/uploads/2021/03/AMD-Logo.png',
      url: '/shop?brand=amd'
    }
  ];

  return (
    <section className="x_main-popular-brands py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            SHOP BY POPULAR BRANDS
          </h2>
        </div>
        <Row className="g-3 g-md-4 align-items-center justify-content-center">
          {brands.map((brand, index) => (
            <Col key={index} xs={6} sm={4} md={4} lg={2} xl={2}>
              <div 
                className="d-flex align-items-center justify-content-center p-4 bg-white border rounded shadow-sm h-100 x_main-brand-card"
                style={{ minHeight: '100px', transition: 'all 0.3s ease' }}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="img-fluid"
                  style={{ 
                    maxHeight: '60px', 
                    maxWidth: '100%', 
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    transition: 'all 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-muted fw-bold">${brand.name}</span>`;
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PopularBrands;

