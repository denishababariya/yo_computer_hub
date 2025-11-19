import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import products from '../data/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { productAPI } from '../services/api';
import { FaShoppingCart, FaHeart, FaStar, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

function getYouTubeEmbed(url) {
  // Convert ANY YouTube link into EMBED URL
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
    }

    if (u.hostname.includes("youtube.com")) {
      const videoID = u.searchParams.get("v");
      if (videoID) return `https://www.youtube.com/embed/${videoID}`;
    }
  } catch (e) {}

  // Fallback
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  return null;
}

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const dispatch = useDispatch();

  // 360 view images - using the K_assets images
  const images360 = [
    require('../Images/K_assets/h101x (1).png'),
    require('../Images/K_assets/h101x (2).png'),
    require('../Images/K_assets/h101x (3).png'),
    require('../Images/K_assets/h101x (4).png'),
    require('../Images/K_assets/h101x (5).png'),
    require('../Images/K_assets/h101x (6).png'),
    require('../Images/K_assets/h101x (7).png'),
    require('../Images/K_assets/h101x (8).png'),
    require('../Images/K_assets/h101x (9).png'),
    require('../Images/K_assets/h101x (10).png'),
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id);
        if (response.success) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images360.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images360.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, product, qty: quantity }));
  };

  // Sample product tags and specifications
  const productTags = ['Gaming', 'Wireless', 'Ergonomic', 'Professional', 'Durable'];
  
  const specifications = [
    { label: 'Model', value: 'Premium Gaming Controller' },
    { label: 'Connection', value: 'Wireless 2.4GHz' },
    { label: 'Battery Life', value: '20+ hours' },
    { label: 'Compatibility', value: 'PC, Console, Mobile' },
    { label: 'Material', value: 'Premium Rubber Grip' },
    { label: 'Weight', value: '180g' },
    { label: 'Buttons', value: '16 Programmable' },
    { label: 'Warranty', value: '2 Years' }
  ];

  const highlights = [
    'Advanced haptic feedback technology',
    'Customizable button mapping',
    'Low-latency wireless connection',
    'Ergonomic design for extended gaming',
    'Compatible with multiple platforms',
    'Premium build quality'
  ];

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="mt-3">Loading product...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <h2>Product not found</h2>
        <Button as={Link} to="/shop" variant="dark" className="mt-3">
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <div className="z_prdD_page">
      <Container className="z_prdD_container">
        <Row className="z_prdD_row g-4">
          {/* LEFT SIDE - 360 VIEW */}
          <Col lg={6} md={12} className="z_prdD_left">
            <div className="z_prdD_viewer_wrapper">
              {/* Main Image Display */}
              <div className="z_prdD_main_viewer">
                <img 
                  src={images360[currentImageIndex]} 
                  alt="360 View" 
                  className="z_prdD_main_image"
                />
                
                {/* Navigation Arrows */}
                <button 
                  className="z_prdD_arrow z_prdD_arrow_left"
                  onClick={handlePrevImage}
                  title="Previous"
                >
                  &#10094;
                </button>
                <button 
                  className="z_prdD_arrow z_prdD_arrow_right"
                  onClick={handleNextImage}
                  title="Next"
                >
                  &#10095;
                </button>

                {/* Image Counter */}
                <div className="z_prdD_image_counter">
                  {currentImageIndex + 1} / {images360.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="z_prdD_thumbnails">
                {images360.map((img, index) => (
                  <div
                    key={index}
                    className={`z_prdD_thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE - PRODUCT DETAILS */}
          <Col lg={6} md={12} className="z_prdD_right">
            <div className="z_prdD_details">
              {/* Product Header */}
              <div className="z_prdD_header">
                <h1 className="z_prdD_title">{product.name}</h1>
                <div className="z_prdD_meta">
                  <span className="z_prdD_brand">{product.brand}</span>
                  <span className="z_prdD_category">{product.category}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="z_prdD_rating">
                <div className="z_prdD_stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="z_prdD_star" />
                  ))}
                </div>
                <span className="z_prdD_reviews">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="z_prdD_price_section">
                <div className="z_prdD_price">
                  ${product.price.toFixed(2)}
                </div>
                <div className="z_prdD_original_price">
                  ${(product.price * 1.2).toFixed(2)}
                </div>
                <div className="z_prdD_discount">-20%</div>
              </div>

              {/* Description */}
              <p className="z_prdD_description">{product.description}</p>

              {/* Quantity Selector */}
              <div className="z_prdD_quantity_section">
                <label className="z_prdD_label">Quantity:</label>
                <div className="z_prdD_quantity_box">
                  <button 
                    className="z_prdD_qty_btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="z_prdD_qty_input"
                  />
                  <button 
                    className="z_prdD_qty_btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="z_prdD_actions">
                <button 
                  className="z_prdD_btn z_prdD_btn_primary"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button 
                  className={`z_prdD_btn z_prdD_btn_secondary ${isWishlisted ? 'active' : ''}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <FaHeart /> Wishlist
                </button>
              </div>

              {/* Features */}
              <div className="z_prdD_features">
                <div className="z_prdD_feature">
                  <FaTruck className="z_prdD_feature_icon" />
                  <div>
                    <div className="z_prdD_feature_title">Free Shipping</div>
                    <div className="z_prdD_feature_text">On orders over $50</div>
                  </div>
                </div>
                <div className="z_prdD_feature">
                  <FaShieldAlt className="z_prdD_feature_icon" />
                  <div>
                    <div className="z_prdD_feature_title">Secure Payment</div>
                    <div className="z_prdD_feature_text">100% protected</div>
                  </div>
                </div>
                <div className="z_prdD_feature">
                  <FaUndo className="z_prdD_feature_icon" />
                  <div>
                    <div className="z_prdD_feature_title">Easy Returns</div>
                    <div className="z_prdD_feature_text">30-day guarantee</div>
                  </div>
                </div>
              </div>

              {/* Product Tags */}
              <div className="z_prdD_tags_section">
                <h4 className="z_prdD_tags_title">Product Tags:</h4>
                <div className="z_prdD_tags">
                  {productTags.map((tag, index) => (
                    <span key={index} className="z_prdD_tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* DETAILED INFORMATION SECTION */}
        <Row className="z_prdD_details_row mt-5">
          <Col lg={12}>
            <div className="z_prdD_tabs">
              <div className="z_prdD_tab_buttons">
                <button
                  className={`z_prdD_tab_btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={`z_prdD_tab_btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Specifications
                </button>
                <button
                  className={`z_prdD_tab_btn ${activeTab === 'highlights' ? 'active' : ''}`}
                  onClick={() => setActiveTab('highlights')}
                >
                  Highlights
                </button>
              </div>

              <div className="z_prdD_tab_content">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="z_prdD_tab_pane">
                    <h3 className="z_prdD_section_title">Product Details</h3>
                    <div className="z_prdD_details_text">
                      <p>
                        Experience ultimate gaming performance with our premium wireless controller. 
                        Engineered for precision and comfort, this controller features advanced haptic 
                        feedback technology that brings your gaming experience to life.
                      </p>
                      <p>
                        With its ergonomic design and premium rubber grip, you can enjoy extended gaming 
                        sessions without fatigue. The low-latency wireless connection ensures responsive 
                        gameplay across all your favorite platforms.
                      </p>
                      <p>
                        Customize your gaming experience with 16 programmable buttons and intuitive software. 
                        Whether you're a casual gamer or professional esports player, this controller adapts 
                        to your needs.
                      </p>
                    </div>
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                  <div className="z_prdD_tab_pane">
                    <h3 className="z_prdD_section_title">Technical Specifications</h3>
                    <div className="z_prdD_specs_grid">
                      {specifications.map((spec, index) => (
                        <div key={index} className="z_prdD_spec_item">
                          <div className="z_prdD_spec_label">{spec.label}</div>
                          <div className="z_prdD_spec_value">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights Tab */}
                {activeTab === 'highlights' && (
                  <div className="z_prdD_tab_pane">
                    <h3 className="z_prdD_section_title">Key Highlights</h3>
                    <ul className="z_prdD_highlights_list">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="z_prdD_highlight_item">
                          <span className="z_prdD_highlight_icon">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetails;
