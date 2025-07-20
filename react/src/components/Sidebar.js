import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/feed" className="sidebar-nav-item">
          Моя страница
        </Link>
        <Link to="/feed" className="sidebar-nav-item">
          Новости
        </Link>
        <Link to="/messages" className="sidebar-nav-item">
          Сообщения
        </Link>
        <Link to="/profile/1" className="sidebar-nav-item">
          Друзья
        </Link>
        <Link to="/feed" className="sidebar-nav-item">
          Фотографии
        </Link>
        <Link to="/feed" className="sidebar-nav-item">
          Музыка
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
