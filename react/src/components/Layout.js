import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './ui/Header';
import Sidebar from './ui/Sidebar';
import '../App.css';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container" style={{ display: 'flex', marginTop: '60px' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '240px', padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
