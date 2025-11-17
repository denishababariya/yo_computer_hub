import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import products from '../../data/products';

function BestSellers() {
  const [activeTab, setActiveTab] = useState('all');
  
  const bestSellers = products.slice(0, 8);
  const gamingHeadsets = products.filter(p => p.category.toLowerCase().includes('headset') || p.name.toLowerCase().includes('headset')).slice(0, 8);
  const gamingMouse = products.filter(p => p.category.toLowerCase().includes('mouse') || p.name.toLowerCase().includes('mouse')).slice(0, 8);
  const monitors = products.filter(p => p.category.toLowerCase().includes('monitor') || p.name.toLowerCase().includes('monitor')).slice(0, 8);
  const gamingChairs = products.filter(p => p.category.toLowerCase().includes('chair') || p.name.toLowerCase().includes('chair')).slice(0, 8);

  const renderProducts = (productList) => {
    const productsToShow = productList.length > 0 ? productList : bestSellers;
    return (
      <Row xs={1} sm={2} md={3} lg={4} className="g-3 mt-3">
        {productsToShow.map(product => (
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
          <h2 className="text-danger fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            BEST SELLERS
          </h2>
        </div>
        
        <Tabs 
          activeKey={activeTab} 
          onSelect={(k) => setActiveTab(k)} 
          className="mb-4 justify-content-center border-0"
          variant="pills"
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

