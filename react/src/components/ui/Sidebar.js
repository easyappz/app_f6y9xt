import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside
      style={{
        width: '220px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        position: 'fixed',
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        top: '70px',
      }}
    >
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link
              to="/feed"
              style={{
                display: 'block',
                padding: '10px',
                color: '#1c1e21',
                fontWeight: '500',
                borderRadius: '6px',
              }}
            >
              Лента
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link
              to="/profile/1"
              style={{
                display: 'block',
                padding: '10px',
                color: '#1c1e21',
                fontWeight: '500',
                borderRadius: '6px',
              }}
            >
              Мой профиль
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link
              to="/messages"
              style={{
                display: 'block',
                padding: '10px',
                color: '#1c1e21',
                fontWeight: '500',
                borderRadius: '6px',
              }}
            >
              Сообщения
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
