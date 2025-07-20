import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { instance } from '../../api/axios';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import TextField from '../../components/ui/TextField';
import Textarea from '../../components/ui/Textarea';
import './ProfilePage.css';

const fetchProfile = async (id) => {
  const response = await instance.get(`/api/user/${id}`);
  return response.data;
};

const fetchPosts = async (userId) => {
  const response = await instance.get(`/api/post/user/${userId}`);
  return response.data;
};

const updateProfile = async (data) => {
  const response = await instance.put(`/api/user/profile`, data);
  return response.data;
};

const createPost = async (content) => {
  const response = await instance.post(`/api/post`, { content });
  return response.data;
};

const ProfilePage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    avatar: ''
  });
  const [postContent, setPostContent] = useState('');

  const { data: user, isLoading, error, refetch } = useQuery(
    ['profile', id],
    () => fetchProfile(id),
    {
      onSuccess: (data) => {
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          bio: data.bio || '',
          avatar: data.avatar || ''
        });
      }
    }
  );

  const { data: posts, refetch: refetchPosts } = useQuery(
    ['posts', id],
    () => fetchPosts(id)
  );

  const updateMutation = useMutation(updateProfile, {
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка при обновлении профиля:', error);
    }
  });

  const postMutation = useMutation(createPost, {
    onSuccess: () => {
      setPostContent('');
      refetchPosts();
    },
    onError: (error) => {
      console.error('Ошибка при создании поста:', error);
    }
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateMutation.mutate(profileData);
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      postMutation.mutate(postContent);
    }
  };

  if (isLoading) return <div className="profile-loading">Загрузка...</div>;
  if (error) return <div className="profile-error">Ошибка загрузки профиля</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <Avatar src={profileData.avatar} alt={`${profileData.firstName} ${profileData.lastName}`} size="large" />
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
          {isEditing ? (
            <div className="profile-edit-form">
              <TextField
                label="Имя"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
              />
              <TextField
                label="Фамилия"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
              />
              <Textarea
                label="О себе"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
              />
              <div className="profile-edit-actions">
                <Button variant="primary" onClick={handleSave} disabled={updateMutation.isLoading}>
                  Сохранить
                </Button>
                <Button variant="secondary" onClick={handleEditToggle}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="profile-bio">{profileData.bio || 'Информация о себе не указана'}</p>
              <Button variant="secondary" onClick={handleEditToggle}>
                Редактировать профиль
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <Card>
            <h3>Информация</h3>
            <p>Дополнительные данные о пользователе</p>
          </Card>
        </div>
        <div className="profile-main">
          <Card className="profile-post-form">
            <h3>Что у вас нового?</h3>
            <Textarea
              placeholder="Напишите что-нибудь..."
              value={postContent}
              onChange={handlePostChange}
              rows={4}
            />
            <Button
              variant="primary"
              onClick={handlePostSubmit}
              disabled={postMutation.isLoading || !postContent.trim()}
            >
              Опубликовать
            </Button>
          </Card>

          <div className="profile-posts">
            <h2>Записи</h2>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post._id} className="post-item">
                  <div className="post-header">
                    <Avatar src={profileData.avatar} size="small" />
                    <div className="post-info">
                      <span className="post-author">{`${profileData.firstName} ${profileData.lastName}`}</span>
                      <span className="post-date">{new Date(post.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                  <div className="post-content">{post.content}</div>
                </Card>
              ))
            ) : (
              <p>Записей пока нет</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
