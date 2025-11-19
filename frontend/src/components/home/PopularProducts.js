import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Carousel,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { productAPI } from "../../services/api";
import Title from "../Title";

function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await productAPI.getAll();
        const data = Array.isArray(res) ? res : res.products || res.data || [];
        const normalized = data.map((p) => ({
          id: p._id || p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          category: p.category || "Uncategorized",
          image: p.image,
          images: p.images || [],
          stock: p.stock,
          rating: p.rating,
          reviews: p.reviews || [],
          specifications: p.specifications || {},
          createdAt: p.createdAt,
        }));
        if (!mounted) return;
        setProducts(normalized);
      } catch (err) {
        console.error("Failed to load products", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const maxCount = 6;
    const byCategory = new Map();
    for (const p of products) {
      const key = (p.category || "Uncategorized").trim().toLowerCase();
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key).push(p);
    }

    const picked = [];
    for (const arr of byCategory.values()) {
      if (picked.length >= maxCount) break;
      if (arr.length > 0) picked.push(arr[0]);
    }

    for (const p of products) {
      if (picked.length >= maxCount) break;
      if (!picked.find((x) => x.id === p.id)) picked.push(p);
    }

    setDisplayProducts(picked.slice(0, maxCount));
  }, [products]);

  return (
    <section className="x_main-popular-products py-md-5 py-4  bg-dark" >
      {/* ⭐ ADDING CAROUSEL ARROW CSS HERE */}
      <style>{`
        .review-carousel {
  padding: 0 15px;
}

.review-carousel .carousel-item {
  padding: 20px 0;
}

/* Indicators */
.review-carousel .carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #5587c9da;
  border: 2px solid #5588c9a6;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.review-carousel .carousel-indicators button.active {
  background-color: #5588c9;
  border-color: #5588c9;
  width: 30px;
  border-radius: 5px;
}

/* Arrows now always visible */
.review-carousel .carousel-control-prev,
.review-carousel .carousel-control-next {
  width: 45px;
  height: 45px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #5588c92e;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  opacity: 0.9;
  transition: all 0.3s ease;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.review-carousel .carousel-control-prev:hover,
.review-carousel .carousel-control-next:hover {
  background-color: #ccd8e5;
  opacity: 1;
}

.review-carousel .carousel-control-prev {
  left: -10px;
}

.review-carousel .carousel-control-next {
  right: -10px;
}

/* Arrow icon */
.review-carousel .carousel-control-prev-icon,
.review-carousel .carousel-control-next-icon {
  width: 18px;
  height: 18px;
  filter: invert(59%) sepia(14%) saturate(1923%) hue-rotate(185deg)
    brightness(93%) contrast(90%);
}

      `}</style>

      <Container>
        <div className="d-flex justify-content-md-between justify-content-center align-items-center mb-md-4 mb-2">
          {/* <h2
            className="text-danger fw-bold m-0"
            style={{ fontSize: "2rem", letterSpacing: "2px" }}
          >
            POPULAR PRODUCTS
          </h2> */}
           <Title  text="POPULAR PRODUCTS" theme="dark" align="center" />
       
        </div>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" role="status" />
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-4">No products found.</div>
        ) : isMobile ? (
          <Carousel
            indicators={false}
            controls={true}
            navs={true}
            interval={3000}
            className="review-carousel"
          >
            {displayProducts.map((product) => (
              <Carousel.Item key={product.id}>
                <div className="d-flex justify-content-center py-3">
                  <div style={{ width: "90%" }}>
                    <ProductCard product={product} />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Row xs={1} sm={2} md={3} className="g-3">
            {displayProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard  product={product} />
              </Col>
            ))}
          </Row>
        )}

     
      </Container>
    </section>
  );
}

export default PopularProducts;
