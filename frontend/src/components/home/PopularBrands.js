import React from "react";
import { Container } from "react-bootstrap";
import Title from "../Title";
// Assuming Title component is defined elsewhere
// import Title from "../Title"; 

function PopularBrands() {
  const brands = [
    { name: "MSI", url: "https://placehold.co/100x40/FFFFFF/000000?text=MSI" },
    {
      name: "CORSAIR",
      url: "https://placehold.co/120x40/FFFFFF/000000?text=CORSAIR",
    },
    {
      name: "NVIDIA",
      url: "https://placehold.co/130x40/FFFFFF/000000?text=NVIDIA",
    },
    {
      name: "LOGITECH",
      url: "https://placehold.co/140x40/FFFFFF/000000?text=LOGITECH",
    },
    { name: "AMD", url: "https://placehold.co/110x40/FFFFFF/000000?text=AMD" },
    {
      name: "INTEL",
      url: "https://placehold.co/110x40/FFFFFF/000000?text=INTEL",
    },
    {
      name: "SAMSUNG",
      url: "https://placehold.co/130x40/FFFFFF/000000?text=SAMSUNG",
    },
  ];

  // Duplicating the brands is the correct first step for an infinite loop
  const scrollBrands = [...brands, ...brands]; 

  return (
    <section className="x_main-popular-brands bg-dark py-md-5 py-4">
      <Container>
        {/* Placeholder for Title component */}
        <Title text="SHOP BY POPULAR BRANDS" theme="dark" align="center" />
        {/* <h2 className="text-white text-center mb-md-4">SHOP BY POPULAR BRANDS</h2>  */}

        {/* 1. brand-slider needs overflow: hidden;
          2. brand-track needs display: flex; and the animation.
        */}
        <div className="brand-slider py-md-3 py-1"> 
          <div className="brand-track">
            {scrollBrands.map((brand, index) => (
              // Ensure brand-item has a fixed width or max-width for consistent sliding
              <div 
                key={index} // Using index is okay here because the list is static within the map
                className="brand-item m-2 d-flex align-items-center justify-content-center bg-white border rounded shadow-sm x_main-brand-card"
              >
                <img src={brand.url} alt={brand.name} style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PopularBrands;