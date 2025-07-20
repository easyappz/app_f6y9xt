import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, required = false }) => {
  return (
    <div className="vk-input-container">
      {label && <label className="vk-input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`vk-input ${error ? 'vk-input--error' : ''}`}
        required={required}
      />
      {error && <span className="vk-input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
