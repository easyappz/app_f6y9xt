import React from 'react';
import './TextField.css';

const TextField = ({ label, value, onChange, name, type = 'text', placeholder = '', disabled = false }) => {
  return (
    <div className="text-field">
      {label && <label className="text-field-label" htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="text-field-input"
      />
    </div>
  );
};

export default TextField;
