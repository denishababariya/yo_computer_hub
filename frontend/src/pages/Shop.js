import React, { useMemo, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import FilterOffcanvas from '../components/FilterOffcanvas';
import { productAPI } from '../services/api';

function Shop() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceMin: 0,
    priceMax: 10000,
    sort: 'popular'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll();
        console.log('API Response:', response);
        
        if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
          const maxPrice = Math.max(...response.data.map(p => p.price || 0));
          setFilters(prev => ({
            ...prev,
            priceMin: 0,
            priceMax: Math.ceil(maxPrice + 100)
          }));
          setError('');
        } else {
          console.warn('No products in response:', response);
          setProducts([]);
          setError('No products available');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Error: ${err.message}`);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const priceCeiling = products.length > 0
    ? Math.ceil(Math.max(...products.map(p => p.price || 0)) + 100)
    : 1000;

  const handleFilterChange = (newFilters) => {
    const merged = { ...filters, ...newFilters };
    let min = typeof merged.priceMin === 'number' ? merged.priceMin : 0;
    let max = typeof merged.priceMax === 'number' ? merged.priceMax : priceCeiling;
    if (min < 0) min = 0;
    if (max > priceCeiling) max = priceCeiling;
    if (min > max) {
      if (newFilters.priceMin !== undefined) {
        max = min;
      } else {
        min = max;
      }
    }
    setFilters({ ...merged, priceMin: min, priceMax: max });
  };

  const filtered = useMemo(() => {
    // If no products, return empty
    if (!products || products.length === 0) return [];
    
    let list = [...products];
    
    // Apply category filter only if not 'All'
    if (filters.category && filters.category !== 'All') {
      list = list.filter(p => p.category === filters.category);
    }
    
    // Apply price range filter
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      list = list.filter(p => {
        const price = p.price || 0;
        return price >= filters.priceMin && price <= filters.priceMax;
      });
    }
    
    // Apply sorting
    if (filters.sort === 'price-asc') {
      list = list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (filters.sort === 'price-desc') {
      list = list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    return list;
  }, [filters, products]);

  return (
    <Container fluid className="py-4" style={{ backgroundColor: '#fff' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Header */}
      <Row className="mb-4">
        <Col xs={12}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h1 className="mb-2" style={{ color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>Shop</h1>
              <p className="text-muted mb-0">Showing {filtered.length} products</p>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setShowFilters(true)}
              className="d-md-none fw-semibold"
              style={{
                borderColor: '#0d6efd',
                color: '#0d6efd',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem'
              }}
            >
              <i className="bi bi-funnel me-2"></i>
              Filters
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Filters Sidebar - Desktop Only */}
        <Col md={3} className="d-none d-md-block">
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            position: 'sticky',
            top: '20px'
          }}>
            <h5 className="fw-bold mb-3" style={{ color: '#333', textTransform: 'uppercase', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
              <i className="bi bi-funnel me-2" style={{ color: '#0d6efd' }}></i>
              Filter & Sort
            </h5>
            <hr />

            {/* Category Filter */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '0.9rem' }}>Categories</h6>
              <div className="d-flex flex-column gap-2">
                {categories.map(cat => (
                  <div key={cat} className="filter-check">
                    <input
                      type="radio"
                      id={`cat-${cat}`}
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={() => handleFilterChange({ ...filters, category: cat })}
                    />
                    <label htmlFor={`cat-${cat}`}>{cat}</label>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            {/* Price Range Filter */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: '#333', fontSize: '0.9rem' }}>Price Range</h6>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <label style={{ fontSize: '0.85rem', color: '#666' }}>Min</label>
                </div>
                <Form.Range
                  min={0}
                  max={priceCeiling}
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange({ priceMin: parseInt(e.target.value) })}
                  className="price-range-slider"
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <label style={{ fontSize: '0.85rem', color: '#666' }}>Max</label>
                </div>
                <Form.Range
                  min={filters.priceMin}
                  max={priceCeiling}
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange({ priceMax: parseInt(e.target.value) })}
                  className="price-range-slider"
                />
              </div>

              {/* Price Input Boxes */}
              <div className="price-input-wrapper">
                <label>From</label>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange({ priceMin: Math.min(Math.max(parseInt(e.target.value) || 0, 0), priceCeiling) })}
                  placeholder="$100"
                  style={{ borderRadius: '4px', padding: '0.5rem 0.75rem' }}
                />
                <label>To</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange({ priceMax: Math.min(Math.max(parseInt(e.target.value) || priceCeiling, 0), priceCeiling) })}
                  placeholder="$500"
                  style={{ borderRadius: '4px', padding: '0.5rem 0.75rem' }}
                />
              </div>

            </div>

            <hr />

            {/* Sort Options */}
            <div className="mb-3">
              <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '0.9rem' }}>Sort By</h6>
              <div className="d-flex flex-column gap-2">
                <div className="filter-check">
                  <input
                    type="radio"
                    id="sort-popular"
                    name="sort"
                    value="popular"
                    checked={filters.sort === 'popular'}
                    onChange={() => handleFilterChange({ sort: 'popular' })}
                  />
                  <label htmlFor="sort-popular">Popular</label>
                </div>
                <div className="filter-check">
                  <input
                    type="radio"
                    id="sort-price-asc"
                    name="sort"
                    value="price-asc"
                    checked={filters.sort === 'price-asc'}
                    onChange={() => handleFilterChange({ sort: 'price-asc' })}
                  />
                  <label htmlFor="sort-price-asc">Price: Low to High</label>
                </div>
                <div className="filter-check">
                  <input
                    type="radio"
                    id="sort-price-desc"
                    name="sort"
                    value="price-desc"
                    checked={filters.sort === 'price-desc'}
                    onChange={() => handleFilterChange({ sort: 'price-desc' })}
                  />
                  <label htmlFor="sort-price-desc">Price: High to Low</label>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Products Column */}
        <Col md={9} xs={12}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading products...</p>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} lg={3} className="g-3">
              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <Col key={p._id || p.id}>
                    <ProductCard product={p} />
                  </Col>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-3 fs-5">No products found matching your filters</p>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleFilterChange({
                      category: 'All',
                      priceMin: 0,
                      priceMax: priceCeiling,
                      sort: 'popular'
                    })}
                    className="mt-2"
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset Filters
                  </Button>
                </div>
              )}
            </Row>
          )}
        </Col>
      </Row>

      {/* Mobile Filters Offcanvas */}
      <FilterOffcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        categories={categories}
        onFilterChange={handleFilterChange}
        products={products}
      />
    </Container>
  );
}

export default Shop;