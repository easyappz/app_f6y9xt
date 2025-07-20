import React from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';

const ProfilePage = () => {
  const { id } = useParams();
  return (
    <div className="profile-page">
      <h2>Профиль пользователя {id}</h2>
      <p>Здесь будет отображаться информация о пользователе.</p>
    </div>
  );
};

export default ProfilePage;
