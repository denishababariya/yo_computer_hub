# 🎨 FRONTEND INTEGRATION GUIDE - Images & Videos

## Overview
This guide shows how to integrate the new multi-image and video API into your React frontend.

---

## 🖼️ IMAGE GALLERY COMPONENT

### Create: `frontend/src/components/ImageGallery.js`
```javascript
import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find primary image
  const primaryImage = images?.find(img => img.isPrimary) || images?.[0];
  const displayImages = images || [];

  if (!displayImages.length) {
    return (
      <div className="image-gallery">
        <div className="main-image placeholder">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const mainImage = displayImages[selectedImageIndex];

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="main-image-container">
        <img
          src={mainImage.url}
          alt={mainImage.alt || productName}
          className="main-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="thumbnail-gallery">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
              title={image.alt}
            >
              <img
                src={image.url}
                alt={image.alt || `View ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80?text=Img';
                }}
              />
              {image.isPrimary && <span className="primary-badge">Primary</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
```

### Styling: `frontend/src/components/ImageGallery.css`
```css
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image-container {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.main-image.placeholder {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 18px;
}

.thumbnail-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail:hover {
  border-color: #007bff;
}

.thumbnail.active {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.primary-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 123, 255, 0.8);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .thumbnail {
    width: 60px;
    height: 60px;
  }

  .main-image-container {
    aspect-ratio: 1;
  }
}
```

---

## 🎥 VIDEO GALLERY COMPONENT

### Create: `frontend/src/components/VideoGallery.js`
```javascript
import React, { useState } from 'react';
import './VideoGallery.css';

const VideoGallery = ({ videos, productName }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[selectedVideoIndex];

  const getEmbedUrl = (url, type) => {
    if (type === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } else if (type === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
    return null;
  };

  const renderVideo = () => {
    const { url, type, thumbnail } = currentVideo;

    if (type === 'youtube' || type === 'vimeo') {
      const embedUrl = getEmbedUrl(url, type);
      if (!embedUrl) return null;

      return (
        <iframe
          className="video-iframe"
          src={embedUrl}
          title={currentVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (type === 'direct' || type === 'demo') {
      return (
        <video
          className="video-player"
          controls
          poster={thumbnail}
          autoPlay={isPlaying}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="video-gallery">
      <h3 className="video-gallery-title">Videos & Demos</h3>

      {/* Main Video Display */}
      <div className="main-video-container">
        {renderVideo()}
        <div className="video-info">
          <h4>{currentVideo.title}</h4>
          <span className="video-type-badge">{currentVideo.type.toUpperCase()}</span>
        </div>
      </div>

      {/* Video List */}
      {videos.length > 1 && (
        <div className="video-list">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`video-item ${selectedVideoIndex === index ? 'active' : ''}`}
              onClick={() => {
                setSelectedVideoIndex(index);
                setIsPlaying(true);
              }}
            >
              <div className="video-thumbnail-wrapper">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/120?text=Video';
                    }}
                  />
                ) : (
                  <div className="video-placeholder">▶</div>
                )}
                <div className="play-icon">▶</div>
              </div>
              <div className="video-meta">
                <p className="video-title">{video.title}</p>
                <span className="video-type">{video.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
```

### Styling: `frontend/src/components/VideoGallery.css`
```css
.video-gallery {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.video-gallery-title {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.main-video-container {
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}

.video-iframe,
.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}

.video-info {
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.video-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
}

.video-type-badge {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.video-item {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.video-item:hover {
  border-color: #007bff;
  transform: translateY(-4px);
}

.video-item.active {
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.video-thumbnail-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f0f0f0;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  background: #e0e0e0;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 123, 255, 0.8);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-item:hover .play-icon {
  opacity: 1;
}

.video-meta {
  padding: 8px;
}

.video-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-type {
  display: inline-block;
  font-size: 10px;
  color: #666;
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 3px;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .video-item {
    aspect-ratio: 16 / 9;
  }
}
```

---

## 📱 UPDATE ProductDetails PAGE

### Update: `frontend/src/pages/ProductDetails.js`
```javascript
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import VideoGallery from '../components/VideoGallery';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details">
      <div className="product-container">
        {/* Image Gallery */}
        <div className="product-images">
          <ImageGallery 
            images={product.images} 
            productName={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          
          <div className="price-section">
            <span className="price">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="specifications">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-key">{key}:</span>
                    <span className="spec-value">{String(value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock})</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button className="btn btn-primary" disabled={product.stock === 0}>
              Add to Cart
            </button>
            <button className="btn btn-secondary">Add to Wishlist</button>
          </div>
        </div>
      </div>

      {/* Video Gallery */}
      {product.videos && product.videos.length > 0 && (
        <VideoGallery videos={product.videos} productName={product.name} />
      )}
    </div>
  );
};

export default ProductDetails;
```

---

## 🔄 UPDATE ProductCard COMPONENT

### Update: `frontend/src/components/ProductCard.js`
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Get images array
  const images = product.images || [];
  const displayImage = hoveredIndex !== null && images[hoveredIndex] 
    ? images[hoveredIndex].url 
    : product.image;

  const handleImageHover = (index) => {
    if (images.length > 1) {
      setHoveredIndex(index);
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="card-image-wrapper">
        <img 
          src={displayImage} 
          alt={product.name}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=Product';
          }}
        />

        {/* Image Gallery Hover */}
        {images.length > 1 && (
          <div className="image-hover-gallery">
            {images.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                onMouseEnter={() => handleImageHover(idx)}
                className="hover-thumbnail"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50?text=Img';
                }}
              />
            ))}
          </div>
        )}

        {/* Video Badge */}
        {product.videos && product.videos.length > 0 && (
          <div className="video-badge" title="Video available">
            🎥
          </div>
        )}

        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="sale-badge">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="rating">
          {'⭐'.repeat(Math.floor(product.rating || 0))}
          <span className="rating-value">{product.rating?.toFixed(1)}</span>
        </div>

        <div className="price-info">
          <span className="price">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        <div className="stock-status">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

### Styling: `frontend/src/components/ProductCard.css` (Update)
```css
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
  background: #f5f5f5;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.card-image-wrapper:hover .card-image {
  transform: scale(1.05);
}

/* Image Gallery on Hover */
.image-hover-gallery {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image-wrapper:hover .image-hover-gallery {
  opacity: 1;
}

.hover-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid white;
  transition: all 0.2s ease;
}

.hover-thumbnail:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Badges */
.video-badge,
.sale-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 24px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10;
}

.sale-badge {
  background: #ff4444;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 6px 8px;
}

/* Content */
.card-content {
  padding: 12px;
}

.product-name {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rating {
  margin: 6px 0;
  font-size: 12px;
  color: #666;
}

.rating-value {
  margin-left: 4px;
}

.price-info {
  margin: 8px 0;
  display: flex;
  gap: 8px;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.stock-status {
  font-size: 12px;
  margin-top: 8px;
}

.in-stock {
  color: #28a745;
  font-weight: 600;
}

.out-of-stock {
  color: #dc3545;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hover-thumbnail {
    width: 35px;
    height: 35px;
  }

  .product-name {
    font-size: 13px;
  }

  .price {
    font-size: 16px;
  }
}
```

---

## 📡 API SERVICE UPDATE

### Update: `frontend/src/services/api.js`
```javascript
// Add these product endpoints
const API_BASE = 'http://localhost:5000/api';

export const productAPI = {
  // Get all products with filters
  getAllProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/products?${queryString}`).then(res => res.json());
  },

  // Get single product
  getProduct: (id) => fetch(`${API_BASE}/products/${id}`).then(res => res.json()),

  // Get featured products
  getFeaturedProducts: () => fetch(`${API_BASE}/products/featured`).then(res => res.json()),

  // Get best sellers
  getBestSellers: () => fetch(`${API_BASE}/products/best-sellers`).then(res => res.json()),

  // Create product (admin)
  createProduct: (productData) =>
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    }).then(res => res.json()),

  // Update product (admin)
  updateProduct: (id, productData) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    }).then(res => res.json()),

  // Add image to product
  addImage: (productId, imageData) =>
    fetch(`${API_BASE}/products/${productId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData)
    }).then(res => res.json()),

  // Add video to product
  addVideo: (productId, videoData) =>
    fetch(`${API_BASE}/products/${productId}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData)
    }).then(res => res.json()),

  // Categories
  getAllCategories: () => fetch(`${API_BASE}/products/categories/all`).then(res => res.json()),

  getCategory: (id) => fetch(`${API_BASE}/products/categories/${id}`).then(res => res.json()),

  createCategory: (categoryData) =>
    fetch(`${API_BASE}/products/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    }).then(res => res.json())
};

export default productAPI;
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Update `Product.js` model
- [ ] Create `Category.js` model  
- [ ] Update `productRoutes.js`
- [ ] Update `model/index.js`
- [ ] Create `ImageGallery.js` component
- [ ] Create `VideoGallery.js` component
- [ ] Update `ProductDetails.js` page
- [ ] Update `ProductCard.js` component
- [ ] Update `api.js` service
- [ ] Test all API endpoints in Postman
- [ ] Add sample products with images/videos
- [ ] Test frontend image gallery
- [ ] Test video playback
- [ ] Deploy to production

---

## 🧪 TESTING IN BROWSER

1. Navigate to product detail page
2. Check image gallery works
3. Hover over thumbnails
4. Click on different images
5. Scroll to video section
6. Play videos (YouTube, Vimeo, Direct)
7. Change video selection
8. Test on mobile/tablet

---

**Frontend integration complete! All components ready to use.** 🚀
