import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'default', size = 'medium', onClick, disabled, className = '' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      case 'text':
        return 'btn-text';
      default:
        return 'btn-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'btn-small';
      case 'large':
        return 'btn-large';
      default:
        return 'btn-medium';
    }
  };

  return (
    <button
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
