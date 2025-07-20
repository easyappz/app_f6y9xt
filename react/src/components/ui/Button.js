import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, disabled, type = 'button', fullWidth = false }) => {
  return (
    <button
      type={type}
      className={`vk-button vk-button--${variant} ${fullWidth ? 'vk-button--full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
