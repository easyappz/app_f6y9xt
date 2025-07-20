import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', onClick, disabled = false, fullWidth = false }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-fullwidth' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
