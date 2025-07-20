import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { instance } from '../../api/axios';

const ProfilePage = () => {
  const { id } = useParams();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await instance.get(`/api/user/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки профиля.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#1877f2',
          height: '200px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '20px',
        }}
      ></div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
            marginRight: '20px',
            marginTop: '-60px',
            border: '4px solid white',
          }}
        ></div>
        <div>
          <h2 style={{ margin: 0 }}>{user?.name || 'Пользователь'}</h2>
          <p style={{ color: '#65676b' }}>{user?.email || 'email@example.com'}</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="primary">Добавить в друзья</Button>
        <Button variant="secondary">Написать сообщение</Button>
      </div>
      <Card>
        <h3>О себе</h3>
        <p>Информация о пользователе будет отображаться здесь.</p>
      </Card>
      <Card>
        <h3>Посты</h3>
        <p>Посты пользователя будут отображаться здесь.</p>
      </Card>
    </div>
  );
};

export default ProfilePage;
