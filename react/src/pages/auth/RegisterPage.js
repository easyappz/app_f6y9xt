import React from 'react';
import './AuthPage.css';

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Регистрация ВКонтакте</h2>
        <div className="auth-field">
          <input type="text" placeholder="Имя" className="auth-input" />
        </div>
        <div className="auth-field">
          <input type="text" placeholder="Фамилия" className="auth-input" />
        </div>
        <div className="auth-field">
          <input type="text" placeholder="Телефон или email" className="auth-input" />
        </div>
        <div className="auth-field">
          <input type="password" placeholder="Пароль" className="auth-input" />
        </div>
        <button className="auth-button">Зарегистрироваться</button>
        <div className="auth-links">
          <a href="/login" className="auth-link">Уже есть аккаунт? Войти</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
