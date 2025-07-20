import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#1877f2',
        color: 'white',
        padding: '10px 20px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Link to="/feed" style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
          СоцСеть
        </Link>
        <div>
          <Button variant="secondary">Профиль</Button>
          <Button variant="secondary" style={{ marginLeft: '10px' }}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
