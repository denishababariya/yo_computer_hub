import React, { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import '../styles/x_app.css';

function FilterOffcanvas({ show, onHide, categories, onFilterChange, products }) {
  const [filters, setFilters] = useState({
    category: 'All',
    priceMin: 0,
    priceMax: 10000,
    sort: 'popular'
  });

  // Get max price from products
  const maxPrice = Math.max(...products.map(p => p.price || 0), 10000);

  const handleCategoryChange = (category) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceMinChange = (e) => {
    const newFilters = { ...filters, priceMin: parseInt(e.target.value) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceMaxChange = (e) => {
    const newFilters = { ...filters, priceMax: parseInt(e.target.value) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sort) => {
    const newFilters = { ...filters, sort };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'All',
      priceMin: 0,
      priceMax: maxPrice,
      sort: 'popular'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="start" className="custom-offcanvas">
      <Offcanvas.Header closeButton style={{ borderBottom: '2px solid #f0f0f0' }}>
        <Offcanvas.Title className="fw-bold" style={{ fontSize: '1.3rem', color: '#333' }}>
          <i className="bi bi-funnel me-2" style={{ color: '#5588c9' }}></i>
          Filters
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ padding: '1.5rem' }}>
        {/* Category Filter */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: '#333', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Category
          </h6>
          <div className="d-flex flex-column gap-2">
            {categories.map((cat) => (
              <div key={cat} className="filter-check">
                <input
                  type="radio"
                  id={`offcanvas-cat-${cat}`}
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={() => handleCategoryChange(cat)}
                />
                <label htmlFor={`offcanvas-cat-${cat}`}>{cat}</label>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* Price Range Filter */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: '#333', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Price Range
          </h6>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <label style={{ fontSize: '0.9rem', color: '#666' }}>Min Price</label>
            </div>
            <Form.Range
              min={0}
              max={maxPrice}
              value={filters.priceMin}
              onChange={handlePriceMinChange}
              className="price-range-slider"
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <label style={{ fontSize: '0.9rem', color: '#666' }}>Max Price</label>
            </div>
            <Form.Range
              min={0}
              max={maxPrice}
              value={filters.priceMax}
              onChange={handlePriceMaxChange}
              className="price-range-slider"
            />
          </div>

          {/* Price Input Boxes */}
          <div className="price-input-wrapper">
            <label>From</label>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => handlePriceMinChange({ target: { value: e.target.value } })}
              placeholder="$100"
              style={{ borderRadius: '4px', padding: '0.5rem 0.75rem' }}
            />
            <label>To</label>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => handlePriceMaxChange({ target: { value: e.target.value } })}
              placeholder="$500"
              style={{ borderRadius: '4px', padding: '0.5rem 0.75rem' }}
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* Sort Options */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: '#333', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sort By
          </h6>
          <div className="d-flex flex-column gap-2">
            <div className="filter-check">
              <input
                type="radio"
                id="offcanvas-sort-popular"
                name="sort"
                value="popular"
                checked={filters.sort === 'popular'}
                onChange={() => handleSortChange('popular')}
              />
              <label htmlFor="offcanvas-sort-popular">Popular</label>
            </div>
            <div className="filter-check">
              <input
                type="radio"
                id="offcanvas-sort-price-asc"
                name="sort"
                value="price-asc"
                checked={filters.sort === 'price-asc'}
                onChange={() => handleSortChange('price-asc')}
              />
              <label htmlFor="offcanvas-sort-price-asc">Price: Low to High</label>
            </div>
            <div className="filter-check">
              <input
                type="radio"
                id="offcanvas-sort-price-desc"
                name="sort"
                value="price-desc"
                checked={filters.sort === 'price-desc'}
                onChange={() => handleSortChange('price-desc')}
              />
              <label htmlFor="offcanvas-sort-price-desc">Price: High to Low</label>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            className="flex-grow-1 fw-semibold"
            onClick={handleReset}
            style={{ borderRadius: '8px', border: '2px solid #ccc' }}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset
          </Button>
          <Button
            className="flex-grow-1 fw-semibold"
            onClick={onHide}
            style={{
              borderRadius: '8px',
              backgroundColor: '#5588c9',
              border: 'none',
              color: 'white'
            }}
          >
            <i className="bi bi-check2 me-2"></i>
            Apply
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default FilterOffcanvas;
