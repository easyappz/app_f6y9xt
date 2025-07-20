import React from 'react';
import './Link.css';

const Link = ({ children, onClick, href, target = '_self' }) => {
  return (
    <a className="vk-link" href={href} onClick={onClick} target={target}>
      {children}
    </a>
  );
};

export default Link;
