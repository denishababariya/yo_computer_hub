import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  FaSearch,
  FaShippingFast,
  FaUndoAlt,
  FaCreditCard,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Internal CSS with d_ prefix
const d_customStyles = `
/* ===== MAIN BACKGROUND ===== */
body {
  background-color: #0f1115;
  color: #e5e7eb;
}

/* ===== HEADER SECTION ===== */
.d_help-header {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f1f5f9;
  padding: 6vw 0;
  margin-bottom: 30px;
  text-align: center;
}

.d_help-header h1 {
  font-weight: 700;
  margin-bottom: 15px;
}

/* ===== SEARCH INPUT ===== */
.d_search-input {
  background-color: #1f2933;
  border-radius: 8px;
}

.d_search-input .form-control {
  background-color: #1f2933;
  border: none;
  color: #f1f5f9;
  padding: 15px 20px;
  font-size: 16px;
}

.d_search-input .form-control::placeholder {
  color: #94a3b8;
}

.d_search-input .btn {
  background-color: #5588c9 ;
  border-color: #5588c9 ;
  color: white;
  padding: 10px 20px;
  transition: 0.3s;
}

.d_search-input .btn:hover {
  background-color: #3e689eff ;
  border-color: #5588c9 ;
}

/* ===== CATEGORY CARDS ===== */
.d_category-card {
  background-color: #111827;
  color: #e5e7eb;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
  border-radius: 12px;
  border: 1px solid #1f2937;
  height: 100%;
}

.d_category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.d_category-card .card-icon {
  font-size: 40px;
  color: #60a5fa;
  margin-bottom: 15px;
}

.d_category-card .card-title {
  color: #f9fafb;
}

.d_category-card .text-muted {
  color: #9ca3af !important;
}

/* ===== SECTION TITLES ===== */
.d_faq-section h2,
.d_contact-section h2 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  color: #f1f5f9;
}

/* ===== ACCORDION (FAQ) ===== */
.d_faq-accordion .accordion-item {
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #1f2937;
  background-color: #111827;
}

.d_faq-accordion .accordion-button {
  background-color: #373f52ff;
  color: #f1f5f9;
  box-shadow: none;
}
  .d_faq-accordion .accordion-button:after {
    color:#fff;
  }

.d_faq-accordion .accordion-button:not(.collapsed) {
  background-color: #7287a5ff;
  color: #fff;
}

.d_faq-accordion .accordion-body {
  background-color: #111827;
  color: #d1d5db;
}

/* ===== CONTACT CARD ===== */
.d_contact-card {
  background-color: #111827;
  border-left: 5px solid #5588c9 ;
  padding: 5px;
  color: #e5e7eb;
}

.d_contact-card h4 {
  color: #f9fafb;
}

.d_contact-card p {
  color: #9ca3af;
}

.d_contact-card .btn-primary {
  background-color: #5588c9 ;
  border-color: #5588c9 ;
}

.d_contact-card .btn-primary:hover {
  background-color: #2563eb;
}

.d_contact-card .btn-secondary {
  background-color: #374151;
  border-color: #374151;
}

.d_contact-card .btn-secondary:hover {
  background-color: #4b5563;
}

/* ===== HR COLOR ===== */
hr {
  border-color: #1f2937;
}
  .zy_main{
    height:70% !important; 
  }
`;

// Help Center Component
export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: "What are your shipping methods and delivery times?",
      answer:
        "We offer Standard (3-7 business days) and Express (1-3 business days) shipping.",
    },
    {
      id: 2,
      question: "How do I return a faulty or incorrect item?",
      answer:
        "Please visit our Returns & Exchanges section and fill out the return request form.",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      id: 4,
      question: "Can I track my order?",
      answer: "Yes, you will receive a tracking link once your order ships.",
    },
    {
      id: 5,
      question: "How do I create or reset my account password?",
      answer:
        'Click on "Forgot Password" on the login screen to reset your password.',
    },
  ];

  // ✅ FILTER FAQ BASED ON SEARCH
  const filteredFAQs = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{d_customStyles}</style>

      {/* Header/Search Section */}
      <div className="d_help-header">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="display-4">How can we help you today?</h1>
              <p className="lead mb-md-4 mb-2">
                Find answers to our most common questions quickly.
              </p>

              {/* ✅ WORKING SEARCH BAR */}
              <InputGroup className="mb-3 d_search-input shadow-lg">
                <Form.Control
                  placeholder="Search FAQ..."
                  aria-label="Help Center Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaSearch className="me-2" /> Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section (UNCHANGED) */}
      <Container className="my-lg-4 my-md-3 my-2">
        <div className="d_faq-section">
          <h2>
            <FaQuestionCircle className="me-2" /> Popular Help Topics
          </h2>
        </div>

        <Row className="g-4 text-center">
          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-md-3 p-1 shadow-sm">
              <Card.Body>
                <div className="card-icon">
                  <FaShippingFast />
                </div>
                <Card.Title>Shipping & Delivery</Card.Title>
                <Card.Text className="text-muted">
                  Tracking, estimated times, and costs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-md-3 p-1 shadow-sm">
              <Card.Body>
                <div className="card-icon">
                  <FaUndoAlt />
                </div>
                <Card.Title>Returns & Exchanges</Card.Title>
                <Card.Text className="text-muted">
                  Refund and return policies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-md-3 p-1 shadow-sm">
              <Card.Body>
                <div className="card-icon">
                  <FaCreditCard />
                </div>
                <Card.Title>Payment & Billing</Card.Title>
                <Card.Text className="text-muted">
                  Billing and payment queries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="d_category-card p-md-3 p-1 shadow-sm">
              <Card.Body>
                <div className="card-icon">
                  <FaUser />
                </div>
                <Card.Title>My Account</Card.Title>
                <Card.Text className="text-muted">
                  Login, security, and profile.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <hr />

      {/* ✅ FAQ SECTION WITH SEARCH FILTER */}
      <Container className="my-lg-4 my-md-3 my-2">
        <Row className="justify-content-center">
          <Col md={10} className="d_faq-section">
            <h2>Frequently Asked Questions</h2>

            {filteredFAQs.length === 0 ? (
              <p className="text-center text-light mt-4">
                No questions found for "{searchTerm}"
              </p>
            ) : (
              <Accordion className="d_faq-accordion" defaultActiveKey="0">
                {filteredFAQs.map((item, index) => (
                  <Accordion.Item eventKey={String(index)} key={item.id}>
                    <Accordion.Header className="mb-0">
                      {item.question}
                    </Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </Col>
        </Row>
      </Container>

      <hr />

      {/* Contact Us Section (UNCHANGED) */}
      <Container className="my-lg-4 my-md-3 my-2">
        <Row className="justify-content-center">
          <Col md={10} className="d_contact-section">
            <h2>Still Can't Find What You Need?</h2>
            <Card className="d_contact-card shadow-sm">
              <Card.Body>
                <Row>
                <Col md={6}>
  <div className="zy_main">
    <h4 className="mb-3">Contact Support</h4>
    <p>
      Need immediate assistance? Our support team is ready to help you with any
      issues or questions you may have.
    </p>
  </div>
 <Button
      variant="secondary"
      onClick={() => navigate("/contact")}
    >
      Call Support
    </Button>
</Col>


                  <Col md={6} className="mt-3 mt-md-0">
                    <div className="zy_main ">
                      <h4 className="mb-3">Email Us</h4>
                      <p>Send us an email and we'll reply within 24 hours.</p>
                    </div>
                    <Button variant="secondary">Send Email</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
