import React from 'react';
import './Textarea.css';

const Textarea = ({ label, value, onChange, name, placeholder = '', disabled = false, rows = 3 }) => {
  return (
    <div className="textarea-field">
      {label && <label className="textarea-field-label" htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="textarea-field-input"
      />
    </div>
  );
};

export default Textarea;
