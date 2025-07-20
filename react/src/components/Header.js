import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TextInput from './ui/TextInput';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/feed" className="header-logo">
          ВКонтакте
        </Link>
        <div className="header-search">
          <TextInput placeholder="Поиск" />
        </div>
        <div className="header-nav">
          <Link to="/profile/1" className="header-nav-item">
            Профиль
          </Link>
          <Link to="/messages" className="header-nav-item">
            Сообщения
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
