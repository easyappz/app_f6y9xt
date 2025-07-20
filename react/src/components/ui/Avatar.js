import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt = 'Avatar', size = 'medium', className = '' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'avatar-small';
      case 'large':
        return 'avatar-large';
      default:
        return 'avatar-medium';
    }
  };

  return (
    <div className={`avatar ${getSizeClass()} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        <div className="avatar-placeholder">{alt.charAt(0)}</div>
      )}
    </div>
  );
};

export default Avatar;
