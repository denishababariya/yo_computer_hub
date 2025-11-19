import React from 'react';
import { Container, Row, Col, Accordion, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaQuestionCircle, FaSearch, FaShippingFast, FaUndoAlt, FaCreditCard, FaTools } from 'react-icons/fa';

// Updated CSS with improved responsive spacing + alignment
const d_customStyles = `
  /* Header Section */
  .d_faq-header {
    background-color: #2c3e50; 
    color: white;
    padding: 70px 0;
    text-align: center;
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

  /* Search Input */
  .d_search-input .form-control {
    border: none;
    padding: 14px 20px;
    font-size: 16px;
  }
  .d_search-input .btn {
    background-color: #5588c9;
    border-color: #5588c9;
    color: white;
    padding: 10px 22px;
  }
  .d_search-input .btn:hover {
    background-color: #4171af;
    border-color: #4171af;
  }

  /* Category Pills */
  .d_category-pills .nav-link {
    color: #2c3e50;
    border: 1px solid #ddd;
    margin: 6px;
    border-radius: 50px;
    padding: 10px 18px;
    font-weight: 500;
  }

  .d_category-pills .active {
    background-color: #2c3e50;
    color: white !important;
  }

  @media (max-width: 576px) {
    .d_category-pills .nav-link {
      width: 100%;
      text-align: center;
      margin: 8px 0;
    }
  }

  /* FAQ Accordion */
  .d_faq-accordion .accordion-item {
    margin-bottom: 18px;
    border-radius: 10px;
    border: 1px solid #e1e1e1;
  }

  .d_faq-accordion .accordion-header .accordion-button {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 18px;
  }

  @media (max-width: 576px) {
    .d_faq-accordion .accordion-header .accordion-button {
      font-size: 1rem;
      padding: 16px;
    }
  }

  /* Contact Card */
  .d_contact-card {
    background-color: #ecf0f1;
    border: none;
    padding: 35px;
    border-radius: 12px;
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

export default function FAQ() {
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

      {/* Header */}
      <div className="d_faq-header">
        <Container>
          <h1 className="display-5 fw-bold"><FaQuestionCircle className="me-3" /> Frequently Asked Questions</h1>
          <p className="lead mb-md-4 mb-2">Find answers related to shipping, returns, payments, and technical issues.</p>

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
                  variant={activeCategory === cat.key ? 'dark' : 'outline-secondary'}
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
            <h3 className="mb-md-4 mb-2 text-center text-md-start">{activeCategory} Questions</h3>

            <Accordion className="d_faq-accordion">
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
                <h3 className="mb-3">Need More Help?</h3>
                <p className="lead">If the FAQ doesn’t solve your issue, contact our support team.</p>
                <Button variant="primary" size="lg" className="mx-2 mb-2">Contact Support</Button>
                <Button variant="outline-secondary" size="lg" className="mx-2 mb-2">Visit Help Center</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
