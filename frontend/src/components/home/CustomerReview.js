import React, { useEffect, useState } from 'react';
import { Container, Card, Carousel } from 'react-bootstrap';
// Assuming Title component is present and working
// import Title from '../Title';

function CustomerReview() {
  const reviews = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Amazing quality and fast shipping! The gaming headset exceeded my expectations.",
      author: "John Smith",
      date: "January 15, 2024",
      rating: 5,
      product: "Gaming Headset"
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Best gaming mouse I've ever used. The precision and comfort are outstanding.",
      author: "Sarah Johnson",
      date: "January 20, 2024",
      rating: 5,
      product: "Gaming Mouse"
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      text: "Excellent keyboard with great tactile feedback. Very satisfied!",
      author: "Michael Chen",
      date: "January 25, 2024",
      rating: 5,
      product: "Mechanical Keyboard"
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/women/66.jpg",
      text: "Monitor arrived quickly and works perfectly. Colors are vibrant!",
      author: "Emily Davis",
      date: "February 1, 2024",
      rating: 5,
      product: "Gaming Monitor"
    },
    {
      id: 5,
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      text: "Great value for money! The graphics card performs exceptionally well.",
      author: "David Wilson",
      date: "February 5, 2024",
      rating: 5,
      product: "Graphics Card"
    },
    {
      id: 6,
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Perfect controller for my gaming setup. Wireless is stable.",
      author: "Jessica Martinez",
      date: "February 10, 2024",
      rating: 5,
      product: "Wireless Controller"
    }
  ];

  // રાજ્ય (State) જે સ્ક્રીનની પહોળાઈ 768px કરતાં ઓછી છે કે નહીં તે ટ્રૅક કરે છે
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // મોબાઇલમાં 1 રિવ્યૂ પ્રતિ સ્લાઇડ, ડેસ્કટોપ પર 2 રિવ્યૂ પ્રતિ સ્લાઇડ
  const reviewsPerSlide = isMobile ? 1 : 2;

  // સ્લાઇડ્સ માટે રિવ્યૂ ડેટાનું જૂથ (Grouping)
  const slides = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide));
  }

  // રેટિંગના આધારે સ્ટાર્સ રેન્ડર કરવા માટેનું ફંક્શન
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-warning' : 'text-muted'} style={{ fontSize: '1.2rem' }}>
        ★
      </span>
    ));
  };

  return (
    <section className="x_main-customer-review py-md-5 py-4 custom-bg-dark ">
      <Container className='py-md-4 py-0'>

        <div className="text-center mb-md-5 mb-2">
          {/* Title કમ્પોનન્ટનો ઉપયોગ અહીં થશે */}
          {/* <Title text="CUSTOMER REVIEW" theme="light" align="center" /> */}
          <h2 className="title-text mb-2">CUSTOMERS REVIEWS</h2>
          <p className="subtitle-text">See what our customers are saying about us</p>
        </div>

        <Carousel
          fade // ફેડ ઇફેક્ટનો ઉપયોગ કરો
          interval={5000} // ઇન્ટરવલ 5 સેકન્ડ રાખો
          indicators={!isMobile} // મોબાઇલમાં ઇન્ડિકેટર્સ છુપાવો
          navs={true}
          className="review-carousel"
        >

          {slides.map((slideReviews, slideIndex) => (
            <Carousel.Item key={slideIndex} className="slide-animate">
              <div className="row justify-content-center g-4">
                {/* g-4 ગટર (Gutter) માટે છે */}

                {slideReviews.map(review => (
                  <div key={review.id} className={`col-${isMobile ? 12 : 6} review-col`}>
                    <Card className="review-card custom-shadow-lg">
                      <Card.Body className='p-0'>

                        <div className="d-flex align-items-center mb-4">
                          <img
                            src={review.image}
                            alt={review.author}
                            className="rounded-circle me-3 avatar-img"
                          // style={{ width: 60, height: 60, objectFit: 'cover' }}
                          />
                          {renderStars(review.rating)}
                        </div>

                        <p className="review-text">
                          <span className="quote-icon">❝</span>{review.text}<span className="quote-icon"></span>
                        </p>

                        <div className="d-flex justify-content-between align-items-center pt-3 border-top custom-border-top">
                          <div>
                            <div className="fw-bold author-name">{review.author}</div>
                            <div className="small review-date">{review.date}</div>
                          </div>

                          <div className="text-end">
                            <div className="small product-label">Reviewed For</div>
                            <div className="fw-semibold product-name">{review.product}</div>
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

        {/* --- સ્ટાઇલ શીટ --- */}
        <style>{`
          /* મુખ્ય વિભાગ અને શીર્ષક સ્ટાઇલ */
          .custom-bg-dark {
            background-color: #1a1a1a !important; /* ડાર્ક બેકગ્રાઉન્ડ */
          }
          .title-text {
            color: #ffffff;
            font-size: 2.5rem;
            font-weight: 700;
          }
          .subtitle-text {
            color: #aaaaaa;
            font-size: 1.1rem;
          }

          /* રિવ્યૂ કાર્ડ સ્ટાઇલ */
          .review-card {
            height: 100%;
            // min-height: 330px;
            background: #2c2c2c; /* ઘાટો રાખોડી કાર્ડ બેકગ્રાઉન્ડ */
            color: #e0e0e0; /* આછો ટેક્સ્ટ કલર */
            border: 1px solid #444; /* નાની બોર્ડર */
            border-radius: 12px;
            padding: 30px;
            /* કાર્ડ હોવર ઇફેક્ટ દૂર કરી કારણ કે તે કેરોયુઝલ/સ્લાઇડરને અસર કરી શકે છે */
            /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); */
          }

          .custom-shadow-lg {
             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* ઊંડો શેડો */
          }

          .avatar-img {
            width: 65px;
            height: 65px;
            object-fit: cover;
            border: 3px solid #5588c9; /* સ્ટાર કલર જેવી બોર્ડર */
            box-shadow: 0 0 10px 4d76aacc;
          }

         .carousel-indicators {
          bottom: -41px !important;
          }

          .review-text {
            color: #ccc;
            line-height: 1.6;
            font-size: 1.05rem;
            min-height: 85px;
            margin-bottom: 10px;
            font-style: italic; /* ટેક્સ્ટને ઇટાલિક બનાવો */
          }

          .quote-icon {
            font-size: 2.5rem;
            color: #5588c9;
            margin: 0 5px;
            line-height: 0;
            display: inline-block;
            vertical-align: middle;
            opacity: 0.8;
          }
          .review-text .quote-icon:first-child {
            margin-right: 10px;
          }
          .review-text .quote-icon:last-child {
            margin-left: 10px;
          }

          .custom-border-top {
            border-color: #444 !important; /* ડાર્ક બોર્ડર */
          }

          .author-name {
            color: #ffffff; /* સફેદ લેખકનું નામ */
            font-size: 1.1rem;
          }
          .review-date {
            color: #888; /* આછી તારીખ */
          }
          .product-label {
            color: #888;
          }
          .product-name {
            color: #5588c9; /* આકર્ષક પ્રોડક્ટ નામ કલર */
            font-size: 1.05rem;
          }
          
          /* કેરોયુઝલ (Carousel) સ્ટાઇલ */
          .review-carousel .carousel-indicators button {
            background-color: #444;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 0 5px;
          }
          
          .review-carousel .carousel-indicators button.active {
            background-color: #5588c9;
            border-color: #5588c9;
            width: 30px;
            border-radius: 5px;
          }
          
          .review-carousel .carousel-control-prev,
          .review-carousel .carousel-control-next {
            width: 45px;
            height: 45px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #5588c92e;
            border-radius: 50%;
            backdrop-filter: blur(10px);
            opacity: 0.8;
            transition: all 0.3s ease;
          }
          
          .review-carousel .carousel-control-prev:hover,
          .review-carousel .carousel-control-next:hover {
            background-color: #ccd8e5;
            opacity: 1;
          }
          
          .review-carousel .carousel-control-prev {
            left: ;
          }
          
          .review-carousel .carousel-control-next {
            right: ;
          }
          
          .review-carousel .carousel-control-prev-icon,
          .review-carousel .carousel-control-next-icon {
            width: 18px;
            height: 18px;

          .review-carousel .carousel-indicators .active {
            background-color: #5588c9; /* સક્રિય ઇન્ડિકેટર માટે યલો કલર */
          }
          
          /* સ્લાઇડ એનિમેશન */
          .carousel-item.slide-animate .review-col {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.7s ease-out; /* કાર્ડ એનિમેશન */
          }
          
          /* સ્લાઇડ સક્રિય (Active) હોય ત્યારે એનિમેશન */
          .carousel-item.active.slide-animate .review-col {
            opacity: 1;
            transform: scale(1);
          }
          
          /* બે કાર્ડ માટે અલગ એનિમેશન વિલંબ (Delay) */
          .carousel-item.active.slide-animate .review-col:nth-child(1) {
            transition-delay: 0.1s;
          }
          .carousel-item.active.slide-animate .review-col:nth-child(2) {
            transition-delay: 0.25s;
          }


          /* મોબાઈલ રિસ્પોન્સિવનેસ માટે મીડિયા ક્વેરી */
          @media (max-width: 767px) {
          .carousel-control-prev,
          .carousel-control-next {
            display: flex !important;
            opacity: 1 !important;
            visibility: visible !important;
          } 

            .review-card {
              min-height: 280px !important;
              padding: 20px !important;
              margin-bottom: 10px; /* મોબાઇલમાં કાર્ડ વચ્ચે થોડી જગ્યા */
            }

            .title-text {
              font-size: 2rem;
            }

            /* મોબાઇલમાં કંટ્રોલ્સ અને ઇન્ડિકેટર્સ છુપાવો */
       
            .review-carousel .carousel-indicators {
                position: static; /* પોઝિશન સ્થિર કરો */
                margin-top: 20px; /* થોડી જગ્યા આપો */
            }
            
            .review-text {
                min-height: 70px;
                font-size: 1rem;
            }
               
            
            /* મોબાઇલમાં એનિમેશન વિલંબ દૂર કરો */
             .carousel-item.active.slide-animate .review-col:nth-child(2) {
                transition-delay: 0.1s;
             }
          }
        @media (max-width: 576px) {
          .review-carousel .carousel-control-prev, 
          .review-carousel .carousel-control-next {
            width: 33px;
            height: 33px;
        }

        .review-carousel .carousel-control-prev-icon, .review-carousel .carousel-control-next-icon {
          width: 15px;
          height: 15px;
        }
        }

        `}</style>

      </Container>
    </section>
  );
}

export default CustomerReview;