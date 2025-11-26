import React from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  FaQuestionCircle,
  FaSearch,
  FaShippingFast,
  FaUndoAlt,
  FaCreditCard,
  FaTools,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

/* ================= DARK THEME CSS ================= */
const d_customStyles = `
  .d_dark_wrapper {
    background-color: #121212;
    min-height: 100vh;
    color: #e0e0e0;
    padding-bottom: 50px;
  }

  .d_faq-header {
    background-color: #1f2937;
    color: white;
    padding: 70px 0;
    text-align: center;
    border-bottom: 1px solid #374151;
  }

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

  .d_category-pills .nav-link {
    color: #d1d5db;
    border: 1px solid #4b5563;
    margin: 6px;
    border-radius: 50px;
    padding: 10px 18px;
    font-weight: 500;
    background-color: #1f2937;
  }

  .d_category-pills .active {
    background-color: #e0e0e0 !important;
    color: #121212 !important;
  }

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


  .d_contact-card {
    background-color: #1f2937;
    border: 1px solid #374151;
    padding: 35px;
    border-radius: 12px;
    color: white;
  }

  .d_btn-custom-primary {
    background-color: #5588c9;
    border-color: #5588c9;
    color: white;
  }

  .d_btn-custom-primary:hover {
    background-color: #4171af;
    border-color: #4171af;
  }
`;

/* ================= FAQ DATA ================= */
const faqData = {
  Shipping: [
    {
      id: 1,
      q: "What are your shipping methods and delivery times?",
      a: "We offer Standard (3-7 days) and Express (1-3 days).",
    },
    {
      id: 2,
      q: "Can I track my order?",
      a: "You will receive a tracking link via email after shipment.",
    },
    {
      id: 3,
      q: "Do you ship internationally?",
      a: "Currently, we ship only to US & Canada.",
    },
  ],
  Returns: [
    {
      id: 4,
      q: "How do I return a faulty item?",
      a: "Submit a return request within 30 days.",
    },
    {
      id: 5,
      q: "What is your refund timeline?",
      a: "Refunds are processed in 5–10 business days.",
    },
    {
      id: 6,
      q: "Can I exchange an item?",
      a: "Yes, exchanges are available if product is unused.",
    },
  ],
  Payment: [
    {
      id: 7,
      q: "What payment methods do you accept?",
      a: "Visa, MasterCard, PayPal, Apple Pay.",
    },
    {
      id: 8,
      q: "Why did my payment fail?",
      a: "Check billing details, expiry, or bank verification.",
    },
  ],
  Technical: [
    {
      id: 9,
      q: "How to set up my mechanical keyboard?",
      a: "Our keyboards are plug-and-play.",
    },
    {
      id: 10,
      q: "Is the software compatible with Mac?",
      a: "Yes, compatible with macOS and Windows.",
    },
  ],
};

export default function FAQDark() {
  const [activeCategory, setActiveCategory] = React.useState("Shipping");
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const categories = [
    { key: "Shipping", icon: FaShippingFast },
    { key: "Returns", icon: FaUndoAlt },
    { key: "Payment", icon: FaCreditCard },
    { key: "Technical", icon: FaTools },
  ];

  /* ✅ SEARCH FILTER LOGIC */
  const filteredFaqs = faqData[activeCategory].filter((item) =>
    item.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{d_customStyles}</style>

      <div className="d_dark_wrapper">
        {/* HEADER */}
        <div className="d_faq-header">
          <Container>
            <h1 className="display-5 fw-bold">
              <FaQuestionCircle className="me-3" /> Frequently Asked Questions
            </h1>
            <p className="lead opacity-75">
              Find answers related to shipping, returns, payments, and technical
              issues.
            </p>

            {/* ✅ SEARCH BAR WORKING */}
            <Row className="justify-content-center">
              <Col md={8}>
                <InputGroup className="mb-3 d_search-input">
                  <Form.Control
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button>
                    <FaSearch className="me-2" /> Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="my-lg-4 my-md-3 my-2">
          {/* CATEGORY BUTTONS */}
          <Row>
            <Col>
              <div className="d-flex flex-wrap justify-content-center d_category-pills">
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    className={
                      activeCategory === cat.key
                        ? "active nav-link"
                        : "nav-link"
                    }
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setSearchTerm(""); // Optional: Reset search on category change
                    }}
                  >
                    <cat.icon className="me-2" /> {cat.key}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          {/* FAQ ACCORDION */}
          <Row className="justify-content-center mt-4">
            <Col md={10}>
             
                <Title text={`${activeCategory} Questions`} theme="dark" align="center" />

              {filteredFaqs.length === 0 ? (
                <p className="text-center text-light mt-4">
                  No FAQ found for "{searchTerm}"
                </p>
              ) : (
                <Accordion className="d_faq-accordion" defaultActiveKey="0">
                  {filteredFaqs.map((item, index) => (
                    <Accordion.Item eventKey={String(index)} key={item.id}>
                      <Accordion.Header>{item.q}</Accordion.Header>
                      <Accordion.Body>{item.a}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Col>
          </Row>

          {/* CONTACT CARD */}
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Card className="d_contact-card text-center">
                <Card.Body>
                  <h3 className="mb-3">Need More Help?</h3>
                  <p className="lead">
                    If the FAQ doesn’t solve your issue, contact our support
                    team.
                  </p>
                  <Button
                    className="mx-2 mb-2 d_btn-custom-primary"
                    size="lg"
                    onClick={() => navigate("/contact-support")}
                  >
                    Contact Support
                  </Button>

                  <Button
                    variant="outline-light"
                    size="lg"
                    className="mx-2 mb-2"
                    onClick={() => navigate("/help-center")}
                  >
                    Visit Help Center
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
