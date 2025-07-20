import React from 'react';
import './AuthPage.css';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Вход ВКонтакте</h2>
        <div className="auth-field">
          <input type="text" placeholder="Телефон или email" className="auth-input" />
        </div>
        <div className="auth-field">
          <input type="password" placeholder="Пароль" className="auth-input" />
        </div>
        <button className="auth-button">Войти</button>
        <div className="auth-links">
          <a href="/register" className="auth-link">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
