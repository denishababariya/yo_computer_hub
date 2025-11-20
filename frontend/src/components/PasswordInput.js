import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function PasswordInput({ label, name, placeholder, value, onChange, required = false, isInvalid = false }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="mb-3">
      {label && <Form.Label className="fw-semibold">{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          isInvalid={isInvalid}
          style={{ borderRadius: '8px 0 0 8px', padding: '0.75rem' }}
        />
        <InputGroup.Text
          role="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          onClick={togglePasswordVisibility}
          style={{
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '0 8px 8px 0',
            userSelect: 'none'
          }}
        >
          <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`} style={{ color: '#666', fontSize: '1.1rem' }}></i>
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
}

export default PasswordInput;
