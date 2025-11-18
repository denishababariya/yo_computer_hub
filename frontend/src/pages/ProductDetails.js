import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Carousel } from 'react-bootstrap';
import products from '../data/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { productAPI } from '../services/api';

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
  const dispatch = useDispatch();

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
    <Container className="py-4">
      <Row className="g-4">
        {/* LEFT SIDE SLIDER */}
        <Col md={6}>
          <Carousel>
            {product.media?.map((item, index) => {
              const youtubeEmbed = item.type === "video" ? getYouTubeEmbed(item.url) : null;

              return (
                <Carousel.Item key={index}>
                  <div className="Z_Slider_Wrapper">

                    {/* YOUTUBE VIDEO */}
                    {item.type === "video" && youtubeEmbed ? (
                      <iframe
                        className="Z_Slider_iframe"
                        src={youtubeEmbed}
                        title="product-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : null}

                    {/* NORMAL MP4 VIDEO */}
                    {item.type === "video" && !youtubeEmbed ? (
                      <video
                        src={item.url}
                        className="Z_Slider_video"
                        controls
                        muted
                        playsInline
                      />
                    ) : null}

                    {/* IMAGE */}
                    {item.type === "image" && (
                      <img
                        src={item.url}
                        className="Z_Slider_img"
                        alt={product.name}
                      />
                    )}
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>

        {/* RIGHT SIDE DETAILS */}
        <Col md={6}>
          <h1 className="h3">{product.name}</h1>
          <div className="text-muted mb-2">{product.brand} · {product.category}</div>

          <div className="h4 text-theme mb-3">
            ${product.price.toFixed(2)} {product.currency}
          </div>

          <p>{product.description}</p>

          <div className="d-flex gap-2">
            <Button
              variant="danger"
              onClick={() => dispatch(addToCart({ id: product.id, product, qty: 1 }))}
            >
              Add to Cart
            </Button>

            <Button as={Link} to="/checkout" variant="primary">
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
