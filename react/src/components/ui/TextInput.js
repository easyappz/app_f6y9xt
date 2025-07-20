import React from 'react';
import './TextInput.css';

const TextInput = ({ value, onChange, placeholder = '', className = '', disabled }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`text-input ${className}`}
      disabled={disabled}
    />
  );
};

export default TextInput;
