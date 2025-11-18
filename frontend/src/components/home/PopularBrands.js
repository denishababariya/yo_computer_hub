import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PopularBrands() {
  const brands = [
    { name: "MSI", url: "https://placehold.co/100x40/FFFFFF/000000?text=MSI" },
    { name: "CORSAIR", url: "https://placehold.co/120x40/FFFFFF/000000?text=CORSAIR" },
    { name: "NVIDIA", url: "https://placehold.co/130x40/FFFFFF/000000?text=NVIDIA" },
    { name: "LOGITECH", url: "https://placehold.co/140x40/FFFFFF/000000?text=LOGITECH" },
    { name: "AMD", url: "https://placehold.co/110x40/FFFFFF/000000?text=AMD" },
    { name: "INTEL", url: "https://placehold.co/110x40/FFFFFF/000000?text=INTEL" },
    { name: "SAMSUNG", url: "https://placehold.co/130x40/FFFFFF/000000?text=SAMSUNG" },
  ];


  const scrollBrands = [...brands, ...brands];

  return (
    <section className="x_main-popular-brands py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold mb-3" style={{ letterSpacing: '2px' }}>
            SHOP BY POPULAR BRANDS
          </h2>
        </div>
        <div className="brand-slider py-3">
          <div className="brand-track">
            {scrollBrands.map((brand, index) => (

              <div
                className="brand-item m-2 d-flex align-items-center justify-content-center bg-white border rounded shadow-sm  x_main-brand-card"           
              >
                <img
                  src={brand.url} alt={brand.name}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PopularBrands;

