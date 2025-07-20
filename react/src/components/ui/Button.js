import React from 'react';

const Button = ({ children, variant = 'primary', onClick, style, disabled }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
