import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import '../styles/x_app.css';

function FilterOffcanvas({ show, onHide, categories, currentFilters, onFilterChange, products }) {
  const [filters, setFilters] = useState(() => ({
    category: (currentFilters && currentFilters.category) || 'All',
    priceMin: (currentFilters && typeof currentFilters.priceMin === 'number') ? currentFilters.priceMin : 0,
    priceMax: (currentFilters && typeof currentFilters.priceMax === 'number') ? currentFilters.priceMax : 10000,
    sort: (currentFilters && currentFilters.sort) || 'popular'
  }));

  // Get max price from products
  const maxPrice = Math.max(...products.map(p => p.price || 0), 10000);

  // Keep local filters in sync when parent updates currentFilters or products change
  useEffect(() => {
    if (!currentFilters) return;
    setFilters({
      category: currentFilters.category || 'All',
      priceMin: typeof currentFilters.priceMin === 'number' ? currentFilters.priceMin : 0,
      priceMax: typeof currentFilters.priceMax === 'number' ? currentFilters.priceMax : maxPrice,
      sort: currentFilters.sort || 'popular'
    });
  }, [currentFilters, maxPrice]);

  const handleCategoryChange = (category) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  // close offcanvas after selecting category
  if (typeof onHide === 'function') onHide();
  };

  const handlePriceMinChange = (e) => {
    const val = Number(e.target.value || 0);
    const newFilters = { ...filters, priceMin: val };
    setFilters(newFilters);
    // send only the changed fields to parent
    onFilterChange({ priceMin: val });
  };

  const handlePriceMaxChange = (e) => {
    const val = Number(e.target.value || 0);
    const newFilters = { ...filters, priceMax: val };
    setFilters(newFilters);
    onFilterChange({ priceMax: val });
  };

  const handleSortChange = (sort) => {
    const newFilters = { ...filters, sort };
    setFilters(newFilters);
    onFilterChange(newFilters);
  // close offcanvas after selecting sort
  if (typeof onHide === 'function') onHide();
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
    <Offcanvas show={show} onHide={onHide} placement="start" className="" style={{ backgroundColor: '#2e2e2e', color: '#e1dcdc' }}>
      <Offcanvas.Header closeButton style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'transparent' }}>
        <Offcanvas.Title className="fw-bold" style={{ fontSize: '1.3rem', color: '#e1dcdc' }}>
          <i className="bi bi-funnel me-2" style={{ color: '#5588c9' }}></i>
          Filters
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ padding: '1.5rem', backgroundColor: 'transparent', color: '#e1dcdc' }}>
        {/* Category Filter */}
        <div className="mb-md-4 mb-2">
          <h6 className="fw-bold mb-3" style={{ color: '#e1dcdc', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Category
          </h6>
          <div className="d-flex flex-column gap-2">
            <div className="filter-check">
              <input
                type="radio"
                id={`offcanvas-cat-All`}
                name="category"
                value={'All'}
                checked={filters.category === 'All'}
                onChange={() => handleCategoryChange('All')}
              />
              <label htmlFor={`offcanvas-cat-All`}>All</label>
            </div>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => {
                // support cat as string or object { id, name }
                const catId = cat && typeof cat === 'object' ? (cat.id || cat._id || '') : (cat || '');
                const catName = cat && typeof cat === 'object' ? (cat.name || String(catId)) : String(cat);
                const key = String(catId) || catName;
                return (
                  <div key={key} className="filter-check">
                    <input
                      type="radio"
                      id={`offcanvas-cat-${key}`}
                      name="category"
                      value={catId || catName}
                      checked={filters.category === (catId || catName)}
                      onChange={() => handleCategoryChange(catId || catName)}
                    />
                    <label htmlFor={`offcanvas-cat-${key}`}>{catName}</label>
                  </div>
                );
              })
            ) : (
              <div className="text-muted">No categories</div>
            )}
          </div>
        </div>
  <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        {/* Price Range Filter */}
    

        {/* Sort Options */}
        <div className="mb-md-4 mb-2">
          <h6 className="fw-bold mb-3" style={{ color: '#e1dcdc', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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

  <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            className="flex-grow-1 fw-semibold"
            onClick={handleReset}
            style={{ borderRadius: '8px', border: '2px solid rgba(255,255,255,0.12)', color: '#e1dcdc', background: 'transparent' }}
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
