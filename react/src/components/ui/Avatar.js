import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt = 'Avatar', size = 'medium' }) => {
  return (
    <div className={`avatar avatar-${size}`}>
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        <div className="avatar-placeholder">?</div>
      )}
    </div>
  );
};

export default Avatar;
