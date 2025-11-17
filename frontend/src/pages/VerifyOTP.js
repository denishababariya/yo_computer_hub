import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock OTP verification (in real app, verify with backend)
      if (otpString === '123456' || otpString.length === 6) {
        setLoading(false);
        navigate('/reset-password');
      } else {
        setError('Invalid OTP. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const resendOTP = () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    // Simulate resend OTP
    alert('OTP has been resent to your email');
  };

  const email = localStorage.getItem('resetEmail') || 'your email';

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Verify OTP</h2>
                <p className="text-muted">
                  Enter the 6-digit OTP sent to <strong>{email}</strong>
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="text-center"
                      style={{
                        width: '50px',
                        height: '50px',
                        fontSize: '1.5rem',
                        borderRadius: '8px',
                        border: '2px solid #dee2e6'
                      }}
                      required
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="danger"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading || otp.join('').length !== 6}
                  style={{ borderRadius: '8px', fontSize: '1rem' }}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                {timer > 0 ? (
                  <p className="text-muted mb-2">
                    Resend OTP in {timer} seconds
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={resendOTP}
                    className="text-danger text-decoration-none p-0"
                  >
                    Resend OTP
                  </Button>
                )}
                <div className="mt-3">
                  <Link to="/login" className="text-danger fw-semibold text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Login
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyOTP;

