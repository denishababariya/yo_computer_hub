import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import ProductCard from "../ProductCard";
import { productAPI } from "../../services/api";

function BestSellers() {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        const products = await productAPI.getAll();
        const data = products.data;
        // Ensure each product has an `id` field (map _id -> id)
        const normalized = (
          Array.isArray(data) ? data : data.products || []
        ).map((p) => ({
          id: p._id || p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          category: p.category,
          image: p.image,
          images: p.images || [],
          stock: p.stock,
          rating: p.rating,
          reviews: p.reviews || [],
          specifications: p.specifications || {},
          createdAt: p.createdAt,
        }));
        if (mounted) setProducts(normalized);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const bestSellers = products.slice(0, 8);
  const gamingHeadsets = products
    .filter(
      (p) =>
        (p.category || "").toLowerCase().includes("headset") ||
        (p.name || "").toLowerCase().includes("headset")
    )
    .slice(0, 8);
  const gamingMouse = products
    .filter(
      (p) =>
        (p.category || "").toLowerCase().includes("mouse") ||
        (p.name || "").toLowerCase().includes("mouse")
    )
    .slice(0, 8);
  const monitors = products
    .filter(
      (p) =>
        (p.category || "").toLowerCase().includes("monitor") ||
        (p.name || "").toLowerCase().includes("monitor")
    )
    .slice(0, 8);
  const gamingChairs = products
    .filter(
      (p) =>
        (p.category || "").toLowerCase().includes("chair") ||
        (p.name || "").toLowerCase().includes("chair")
    )
    .slice(0, 8);

  const renderProducts = (productList) => {
    const productsToShow = productList.length > 0 ? productList : bestSellers;
    if (loading) {
      return <div className="text-center py-4">Loading products...</div>;
    }
    if (productsToShow.length === 0) {
      return <div className="text-center py-4">No products found.</div>;
    }
    return (
      <Row xs={1} sm={2} md={3} lg={4} className="g-3 mt-3">
        {productsToShow.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <section className="x_main-best-sellers py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2
            className="text-danger fw-bold mb-3"
            style={{ fontSize: "2rem", letterSpacing: "2px" }}
          >
            BEST SELLERS
          </h2>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 justify-content-center custom-tabs"
        >
          <Tab eventKey="all" title="All">
            {renderProducts(bestSellers)}
          </Tab>
          <Tab eventKey="headset" title="Gaming Headset">
            {renderProducts(gamingHeadsets)}
          </Tab>
          <Tab eventKey="mouse" title="Gaming Mouse">
            {renderProducts(gamingMouse)}
          </Tab>
          <Tab eventKey="monitor" title="Monitor">
            {renderProducts(monitors)}
          </Tab>
          <Tab eventKey="chair" title="Gaming Chair">
            {renderProducts(gamingChairs)}
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
}

export default BestSellers;
