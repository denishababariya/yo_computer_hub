import React from 'react';
import { Container, Row, Col, Card, Accordion, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaShippingFast, FaUndoAlt, FaCreditCard, FaUser, FaQuestionCircle } from 'react-icons/fa';

// Internal CSS with d_ prefix
const d_customStyles = `
  /* Custom background color for the header/search area */
  .d_help-header {
    background-color: #34383dff; /* Dark blue/slate color */
    color: white;
    padding: 60px 0;
    margin-bottom: 30px;
    text-align: center;
  }

  /* Style for the main heading */
  .d_help-header h1 {
    font-weight: 700;
    margin-bottom: 15px;
  }

  /* Custom search input styling */
  .d_search-input .form-control {
    border: none;
    box-shadow: none;
    padding: 15px 20px;
    font-size: 16px;
  }

  /* Custom search button styling */
  .d_search-input .btn {
    background-color: #5588c9; /* Red color for CTA */
    border-color: #5588c9;
    color: white;
    padding: 10px 20px;
    transition: background-color 0.3s;
  }

  .d_search-input .btn:hover {
    background-color: #4171afff;
    border-color: #4171afff;
  }

  /* Style for category cards */
  .d_category-card {
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #eee;
    height: 100%; /* Ensure uniform height */
  }

  .d_category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  /* Style for icons within cards */
  .d_category-card .card-icon {
    font-size: 40px;
    color: #3498db; /* Blue color */
    margin-bottom: 15px;
  }

  /* Style for the FAQ section title */
  .d_faq-section h2, .d_contact-section h2 {
    text-align: center;
    margin-bottom: 30px;
    font-weight: 600;
    color: #333;
  }

  /* Accordion custom styling */
  .d_faq-accordion .accordion-item {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  /* Contact Us Card */
  .d_contact-card {
    background-color: #f8f9fa;
    border-left: 5px solid #3498db;
    padding: 20px;
  }
`;

// Help Center Component
export default function HelpCenter() {
  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: 'What are your shipping methods and delivery times?',
      answer: 'We offer Standard (3-7 business days) and Express (1-3 business days) shipping. Times may vary based on your location and carrier availability.'
    },
    {
      id: 2,
      question: 'How do I return a faulty or incorrect item?',
      answer: 'Please visit our "Returns & Exchanges" section and fill out the return request form within 30 days of purchase. We will provide a pre-paid shipping label.'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and Apple Pay.'
    },
    {
      id: 4,
      question: 'Can I track my order?',
      answer: 'Yes, once your order ships, you will receive an email with a tracking number and a link to the carrier\'s website.'
    },
    {
        id: 5,
        question: 'How do I create or reset my account password?',
        answer: 'You can create an account during checkout or by clicking "Sign Up" at the top of the page. To reset your password, click "Forgot Password" on the login screen.'
    }
  ];

  return (
    <>
      {/* Inject custom CSS */}
      <style>{d_customStyles}</style>

      {/* Header/Search Section */}
      <div className="d_help-header">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="display-4">How can we help you today?</h1>
              <p className="lead mb-md-4 mb-2">Find answers to our most common questions quickly.</p>

              {/* Search Bar */}
              <InputGroup className="mb-3 d_search-input shadow-lg">
                <Form.Control
                  placeholder="Search by topic, keyword, or product (e.g., 'Return Policy', 'Mouse Setup')"
                  aria-label="Help Center Search"
                />
                <Button variant="outline-secondary">
                  <FaSearch className="me-2" /> Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Categories Section */}
      <Container className="my-5">
        <div className="d_faq-section">
            <h2><FaQuestionCircle className='me-2' /> Popular Help Topics</h2>
        </div>
        <Row className="g-4 text-center">
          
          {/* Shipping Card */}
          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-3 shadow-sm">
              <Card.Body>
                <div className="card-icon"><FaShippingFast /></div>
                <Card.Title>Shipping & Delivery</Card.Title>
                <Card.Text className="text-muted">
                  Tracking, estimated times, and costs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Returns Card */}
          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-3 shadow-sm">
              <Card.Body>
                <div className="card-icon"><FaUndoAlt /></div>
                <Card.Title>Returns & Exchanges</Card.Title>
                <Card.Text className="text-muted">
                  How to send back an item or request a refund.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Payments Card */}
          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-3 shadow-sm">
              <Card.Body>
                <div className="card-icon"><FaCreditCard /></div>
                <Card.Title>Payment & Billing</Card.Title>
                <Card.Text className="text-muted">
                  Accepted methods, charges, and failed payments.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Account Card */}
          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-3 shadow-sm">
              <Card.Body>
                <div className="card-icon"><FaUser /></div>
                <Card.Title>My Account</Card.Title>
                <Card.Text className="text-muted">
                  Registration, password reset, and personal info.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <hr />

      {/* FAQ Accordion Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} className="d_faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <Accordion defaultActiveKey="0" className="d_faq-accordion">
              {faqData.map((item, index) => (
                <Accordion.Item eventKey={String(index)} key={item.id}>
                  <Accordion.Header>
                    **{item.question}**
                  </Accordion.Header>
                  <Accordion.Body>
                    {item.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
      
      <hr />

      {/* Contact Us Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} className="d_contact-section">
            <h2>Still Can't Find What You Need?</h2>
            <Card className="d_contact-card shadow-sm">
              <Card.Body>
                <Row>
                    <Col md={6}>
                        <h4 className='mb-3'>Live Chat Support</h4>
                        <p>For the fastest service, chat with a support agent now.</p>
                        <Button variant="primary">Start Chat</Button>
                    </Col>
                    <Col md={6} className='mt-3 mt-md-0'>
                        <h4 className='mb-3'>Email Us</h4>
                        <p>Send us an email and we'll reply within 24 hours.</p>
                        <Button variant="secondary">Send Email</Button>
                    </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}