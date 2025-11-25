import React from 'react';
import { Container, Row, Col, Accordion, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaQuestionCircle, FaSearch, FaShippingFast, FaUndoAlt, FaCreditCard, FaTools } from 'react-icons/fa';

// Updated CSS with #5588c9 color
const d_customStyles = `
  /* Global Dark Background for the page/component */
  .d_dark_wrapper {
    background-color: #121212;
    min-height: 100vh;
    color: #e0e0e0;
    padding-bottom: 50px;
  }

  /* Header Section */
  .d_faq-header {
    background-color: #1f2937;
    color: white;
    padding: 70px 0;
    text-align: center;
    border-bottom: 1px solid #374151;
  }

  @media (max-width: 768px) {
    .d_faq-header {
      padding: 40px 20px;
    }
    .d_faq-header h1 {
      font-size: 1.9rem;
      line-height: 2.3rem;
    }
  }

  /* Search Input - Dark Mode */
  .d_search-input .form-control {
    border: 1px solid #4b5563;
    background-color: #374151;
    color: white;
    padding: 14px 20px;
    font-size: 16px;
  }
  
  .d_search-input .form-control::placeholder {
    color: #9ca3af;
  }

  /* --- CHANGE 1: Search Button Color --- */
  .d_search-input .btn {
    background-color: #5588c9; /* New Primary Color */
    border-color: #5588c9;
    color: white;
    padding: 10px 22px;
  }
  .d_search-input .btn:hover {
    background-color: #4171af; /* Slightly Darker for Hover */
    border-color: #4171af;
  }

  /* Category Pills - Dark Mode */
  .d_category-pills .nav-link {
    color: #d1d5db;
    border: 1px solid #4b5563;
    margin: 6px;
    border-radius: 50px;
    padding: 10px 18px;
    font-weight: 500;
    background-color: #1f2937;
    transition: all 0.3s ease;
  }

  .d_category-pills .nav-link:hover {
    background-color: #374151;
    color: white;
  }

  .d_category-pills .active {
    background-color: #e0e0e0 !important;
    color: #121212 !important;
    border-color: #e0e0e0;
  }

  @media (max-width: 576px) {
    .d_category-pills .nav-link {
      width: 100%;
      text-align: center;
      margin: 8px 0;
    }
  }

  /* FAQ Accordion - Dark Mode Override */
  .d_faq-accordion .accordion-item {
    margin-bottom: 18px;
    border-radius: 10px;
    border: 1px solid #374151;
    background-color: #1f2937;
    overflow: hidden;
  }

  .d_faq-accordion .accordion-header .accordion-button {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 18px;
    background-color: #1f2937;
    color: #f3f4f6;
    box-shadow: none;
  }

  /* --- CHANGE 2: Accordion Active Text Color --- */
  .d_faq-accordion .accordion-header .accordion-button:not(.collapsed) {
    background-color: #374151;
    color: #5588c9; /* New Primary Color text highlight */
    box-shadow: none;
  }

  .d_faq-accordion .accordion-body {
    background-color: #1f2937;
    color: #d1d5db;
    border-top: 1px solid #374151;
  }

  .d_faq-accordion .accordion-button::after {
    filter: invert(1) grayscale(100%) brightness(200%);
  }

  @media (max-width: 576px) {
    .d_faq-accordion .accordion-header .accordion-button {
      font-size: 1rem;
      padding: 16px;
    }
  }

  /* Contact Card - Dark Mode */
  .d_contact-card {
    background-color: #1f2937;
    border: 1px solid #374151;
    padding: 35px;
    border-radius: 12px;
    color: white;
  }

  .d_contact-card p {
    color: #9ca3af;
  }

  /* --- CHANGE 3: Custom Primary Button Class --- */
  .d_btn-custom-primary {
    background-color: #5588c9 !important; /* New Primary Color */
    border-color: #5588c9 !important;
    color: white !important;
  }
  .d_btn-custom-primary:hover {
    background-color: #4171af !important; /* Darker Hover */
    border-color: #4171af !important;
  }

  @media (max-width: 768px) {
    .d_contact-card {
      padding: 25px;
      text-align: center;
    }
  }
`;

const faqData = {
  Shipping: [
    { id: 1, q: 'What are your shipping methods and delivery times?', a: 'We offer Standard (3-7 business days) and Express (1-3 business days).' },
    { id: 2, q: 'Can I track my order?', a: 'You will receive a tracking link via email after shipment.' },
    { id: 3, q: 'Do you ship internationally?', a: 'Currently, we ship only to US & Canada.' },
  ],
  Returns: [
    { id: 4, q: 'How do I return a faulty item?', a: 'Submit a return request within 30 days to receive a prepaid label.' },
    { id: 5, q: 'What is your refund timeline?', a: 'Refunds are processed in 5–10 business days after receipt.' },
    { id: 6, q: 'Can I exchange an item?', a: 'Yes, exchanges are available if product is unused.' },
  ],
  Payment: [
    { id: 7, q: 'What payment methods do you accept?', a: 'Visa, MasterCard, PayPal, Apple Pay.' },
    { id: 8, q: 'Why did my payment fail?', a: 'Check billing details, card expiry, or bank verification.' },
  ],
  Technical: [
    { id: 9, q: 'How to set up my mechanical keyboard?', a: 'Our keyboards are plug-and-play.' },
    { id: 10, q: 'Is the software compatible with Mac?', a: 'Yes, compatible with both macOS and Windows.' },
  ],
};

export default function FAQDark() {
  const [activeCategory, setActiveCategory] = React.useState('Shipping');

  const categories = [
    { key: 'Shipping', icon: FaShippingFast },
    { key: 'Returns', icon: FaUndoAlt },
    { key: 'Payment', icon: FaCreditCard },
    { key: 'Technical', icon: FaTools },
  ];

  return (
    <>
      <style>{d_customStyles}</style>

      {/* Wrapper for Dark Background */}
      <div className="d_dark_wrapper">
        
        {/* Header */}
        <div className="d_faq-header">
          <Container>
            <h1 className="display-5 fw-bold"><FaQuestionCircle className="me-3" /> Frequently Asked Questions</h1>
            <p className="lead mb-md-4 mb-2 text-light opacity-75">Find answers related to shipping, returns, payments, and technical issues.</p>

            {/* Search Bar */}
            <Row className="justify-content-center">
              <Col md={8}>
                <InputGroup className="mb-3 d_search-input shadow-lg">
                  <Form.Control placeholder="Search FAQs..." />
                  <Button><FaSearch className="me-2" /> Search</Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Category Section */}
        <Container className="my-5">
          <Row>
            <Col className="mb-md-4 mb-2">
              <div className="d-flex flex-wrap justify-content-center d_category-pills">
                {categories.map(cat => (
                  <Button
                    key={cat.key}
                    variant={activeCategory === cat.key ? 'light' : 'outline-secondary'}
                    className={activeCategory === cat.key ? 'active nav-link' : 'nav-link'}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <cat.icon className="me-2" /> {cat.key}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          {/* FAQ Accordion */}
          <Row className="justify-content-center">
            <Col md={10}>
              <h3 className="mb-md-4 mb-3 text-center text-md-start text-white">{activeCategory} Questions</h3>

              <Accordion className="d_faq-accordion" defaultActiveKey="0">
                {faqData[activeCategory].map((item, index) => (
                  <Accordion.Item eventKey={String(index)} key={item.id}>
                    <Accordion.Header>{item.q}</Accordion.Header>
                    <Accordion.Body>{item.a}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>

          {/* Contact Card */}
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Card className="d_contact-card shadow-sm">
                <Card.Body className="text-center">
                  <h3 className="mb-3 text-white">Need More Help?</h3>
                  <p className="lead">If the FAQ doesn’t solve your issue, contact our support team.</p>
                  
                  {/* Updated Button with Custom Class */}
                  <Button className="mx-2 mb-2 d_btn-custom-primary" size="lg">Contact Support</Button>
                  
                  <Button variant="outline-light" size="lg" className="mx-2 mb-2">Visit Help Center</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}