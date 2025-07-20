import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from '../../components/ui/Link';
import { instance } from '../../api/axios';
import './AuthPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'Введите имя';
    if (!lastName) newErrors.lastName = 'Введите фамилию';
    if (!email) newErrors.email = 'Введите email';
    if (!password) newErrors.password = 'Введите пароль';
    if (!confirmPassword) newErrors.confirmPassword = 'Подтвердите пароль';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await instance.post('/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/feed');
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Произошла ошибка при регистрации' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card>
        <h1 className="auth-page__title">Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Имя"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Введите имя"
            error={errors.firstName}
            required
          />
          <Input
            label="Фамилия"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Введите фамилию"
            error={errors.lastName}
            required
          />
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
          <Input
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль"
            error={errors.confirmPassword}
            required
          />
          {errors.general && <div className="auth-page__error">{errors.general}</div>}
          <Button variant="primary" type="submit" disabled={loading} fullWidth>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
        <div className="auth-page__footer">
          <Link href="/login">Уже есть аккаунт? Войти</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
