import React from 'react';
import { Container, Card, Carousel } from 'react-bootstrap';

function CustomerReview() {
  const reviews = [
    {
      id: 1,
      text: "Amazing quality and fast shipping! The gaming headset exceeded my expectations. The sound quality is crystal clear and the build is solid. Highly recommend!",
      author: "John Smith",
      date: "January 15, 2024",
      rating: 5,
      product: "Gaming Headset"
    },
    {
      id: 2,
      text: "Best gaming mouse I've ever used. The precision and comfort are outstanding. The RGB lighting is a nice touch. Worth every penny!",
      author: "Sarah Johnson",
      date: "January 20, 2024",
      rating: 5,
      product: "Gaming Mouse"
    },
    {
      id: 3,
      text: "Excellent keyboard with great tactile feedback. The mechanical switches feel amazing and the build quality is top-notch. Very satisfied with my purchase!",
      author: "Michael Chen",
      date: "January 25, 2024",
      rating: 5,
      product: "Mechanical Keyboard"
    },
    {
      id: 4,
      text: "Outstanding customer service and product quality. The monitor arrived quickly and works perfectly. The colors are vibrant and the refresh rate is smooth.",
      author: "Emily Davis",
      date: "February 1, 2024",
      rating: 5,
      product: "Gaming Monitor"
    },
    {
      id: 5,
      text: "Great value for money! The graphics card performs exceptionally well. I can run all my games at max settings without any issues. Highly recommended!",
      author: "David Wilson",
      date: "February 5, 2024",
      rating: 5,
      product: "Graphics Card"
    },
    {
      id: 6,
      text: "Perfect controller for my gaming setup. The wireless connection is stable and the battery life is impressive. Comfortable to hold for long sessions.",
      author: "Jessica Martinez",
      date: "February 10, 2024",
      rating: 5,
      product: "Wireless Controller"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={i < rating ? 'text-warning' : 'text-muted'}
        style={{ fontSize: '1.2rem' }}
      >
        ★
      </span>
    ));
  };

  // Group reviews into slides (2 reviews per slide on desktop, 1 on mobile)
  const reviewsPerSlide = 2;
  const slides = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide));
  }

  return (
    <section className="x_main-customer-review py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-danger fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            CUSTOMER REVIEW
          </h2>
          <p className="text-muted">See what our customers are saying about us</p>
        </div>
        
        <Carousel 
          fade 
          interval={4000} 
          indicators 
          controls
          className="review-carousel"
        >
          {slides.map((slideReviews, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <div className="row g-4 justify-content-center">
                {slideReviews.map(review => (
                  <div key={review.id} className="col-12 col-md-6">
                    <Card className="h-100 border-0 shadow-sm x_main-review-card">
                      <Card.Body className="p-4 p-md-5">
                        <div className="mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="mb-4 text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                          "{review.text}"
                        </p>
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                          <div>
                            <div className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>
                              {review.author}
                            </div>
                            <div className="small text-muted">{review.date}</div>
                          </div>
                          <div className="text-end">
                            <div className="small text-muted mb-1">Product</div>
                            <div className="fw-semibold text-primary">{review.product}</div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <style>{`
          .review-carousel {
            padding: 0 15px;
          }
          
          .review-carousel .carousel-item {
            padding: 20px 0;
          }
          
          .review-carousel .carousel-indicators {
            bottom: -50px;
            margin-bottom: 0;
          }
          
          .review-carousel .carousel-indicators button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(220, 53, 69, 0.3);
            border: 2px solid rgba(220, 53, 69, 0.5);
            margin: 0 5px;
            transition: all 0.3s ease;
          }
          
          .review-carousel .carousel-indicators button.active {
            background-color: #dc3545;
            border-color: #dc3545;
            width: 30px;
            border-radius: 5px;
          }
          
          .review-carousel .carousel-control-prev,
          .review-carousel .carousel-control-next {
            width: 45px;
            height: 45px;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(220, 53, 69, 0.1);
            border-radius: 50%;
            backdrop-filter: blur(10px);
            opacity: 0.8;
            transition: all 0.3s ease;
          }
          
          .review-carousel .carousel-control-prev:hover,
          .review-carousel .carousel-control-next:hover {
            background-color: rgba(220, 53, 69, 0.2);
            opacity: 1;
          }
          
          .review-carousel .carousel-control-prev {
            left: -20px;
          }
          
          .review-carousel .carousel-control-next {
            right: -20px;
          }
          
          .review-carousel .carousel-control-prev-icon,
          .review-carousel .carousel-control-next-icon {
            width: 18px;
            height: 18px;
            filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
          }
          
          .x_main-review-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 12px;
            background: #fff;
          }
          
          .x_main-review-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
          }
          
          @media (max-width: 991px) {
            .review-carousel .carousel-control-prev {
              left: -10px;
            }
            
            .review-carousel .carousel-control-next {
              right: -10px;
            }
            
            .review-carousel .carousel-control-prev,
            .review-carousel .carousel-control-next {
              width: 35px;
              height: 35px;
            }
            
            .review-carousel .carousel-control-prev-icon,
            .review-carousel .carousel-control-next-icon {
              width: 14px;
              height: 14px;
            }
            
            .review-carousel .carousel-indicators {
              bottom: -40px;
            }
          }
          
          @media (max-width: 767px) {
            .review-carousel {
              padding: 0 5px;
            }
            
            .review-carousel .carousel-item {
              padding: 10px 0;
            }
            
            .x_main-review-card .card-body {
              padding: 1.5rem !important;
            }
            
            .review-carousel .carousel-control-prev,
            .review-carousel .carousel-control-next {
              display: none;
            }
          }
          
          @media (max-width: 575px) {
            .x_main-customer-review h2 {
              font-size: 1.5rem !important;
            }
            
            .x_main-review-card .card-body {
              padding: 1.25rem !important;
            }
            
            .x_main-review-card p {
              font-size: 0.9rem !important;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}

export default CustomerReview;

