import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar"></div>
          <div className="profile-details">
            <h2 className="profile-name">Имя Фамилия</h2>
            <div className="profile-status">Онлайн</div>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-block">
            <h3 className="profile-block-title">Друзья</h3>
            <div className="profile-block-content">Список друзей</div>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-block">
            <h3 className="profile-block-title">Стена</h3>
            <div className="profile-block-content">Посты пользователя</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
