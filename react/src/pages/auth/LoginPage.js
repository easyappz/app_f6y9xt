import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from '../../components/ui/Link';
import { instance } from '../../api/axios';
import './AuthPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Введите email';
    }
    if (!password) {
      newErrors.password = 'Введите пароль';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await instance.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/feed');
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Произошла ошибка при входе' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card>
        <h1 className="auth-page__title">Вход</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            error={errors.email}
            required
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            error={errors.password}
            required
          />
          {errors.general && <div className="auth-page__error">{errors.general}</div>}
          <Button variant="primary" type="submit" disabled={loading} fullWidth>
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        <div className="auth-page__footer">
          <Link href="/register">Зарегистрироваться</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
