import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FaArrowLeftLong } from 'react-icons/fa6';

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [phone] = useState(() => localStorage.getItem('resetPhone') || '');
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!phone) {
      navigate('/forgot-password');
      return;
    }

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
  }, [navigate, phone]);

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
    setSuccess('');
    setLoading(true);

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      setLoading(false);
      return;
    }

    if (!phone) {
      setError('Session expired. Please restart the process.');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.verifyOtp({ phone, otp: otpString });
      if (!response.resetToken) {
        throw new Error('Unable to verify OTP. Please try again.');
      }
      localStorage.setItem('resetToken', response.resetToken);
      setSuccess('OTP verified successfully');
      setTimeout(() => {
        navigate('/reset-password');
      }, 800);
    } catch (apiError) {
      setError(apiError.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!phone) return;

    try {
      setResending(true);
      setError('');
      setSuccess('');
      await authAPI.sendOtp({ phone });
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      setSuccess('A new OTP has been sent to your phone');
    } catch (apiError) {
      setError(apiError.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <Container className="py-md-5 py-4 x_var">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-md-5 p-3 py-4">
              <div className="text-center mb-md-4 mb-2">
                <h2 className="fw-bold mb-2">Verify OTP</h2>
                <p className="text-muted">
                  Enter the 6-digit OTP sent to <strong>{phone}</strong>
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-3">
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center gap-2 mb-md-4 mb-2">
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
                      className="text-center x_box"
                      style={{
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
                {/* <Button
                  type="submit"
                  variant="danger"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading}
                  style={{ borderRadius: '8px', fontSize: '1rem' }}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button> */}
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
                    disabled={resending}
                  >
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </Button>
                )}
                <div className="mt-3">
                  <Link to="/login" className="text-danger fw-semibold text-decoration-none">
                    <FaArrowLeftLong className='me-2'/>
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

