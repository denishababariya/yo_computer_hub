import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

function Shop() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = useMemo(() => {
    let list = category === 'All' ? products : products.filter(p => p.category === category);
    if (sort === 'price-asc') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h1 className="mb-0">Shop</h1>
        <div className="d-flex gap-2">
          <Form.Select value={category} onChange={(e)=>setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
          <Form.Select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="popular">Sort: Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Form.Select>
        </div>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {filtered.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Shop;