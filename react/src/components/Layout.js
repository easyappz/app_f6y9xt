import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="vk-layout">
      <header className="vk-header">
        <div className="vk-container">
          <h1 className="vk-logo">VK</h1>
        </div>
      </header>
      <main className="vk-main">
        <div className="vk-container">
          <Outlet />
        </div>
      </main>
      <footer className="vk-footer">
        <div className="vk-container">
          <p>&copy; 2023 VK. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
