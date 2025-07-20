import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import { instance } from '../../api/axios';

const FeedPage = () => {
  const [newPost, setNewPost] = useState('');

  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await instance.get('/api/post');
      return response.data;
    },
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      await instance.post('/api/post', { content: newPost });
      setNewPost('');
      refetch();
    } catch (err) {
      console.error('Error posting:', err);
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки ленты.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <h3>Создать пост</h3>
        <form onSubmit={handlePostSubmit}>
          <Textarea
            placeholder="Что у вас нового?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button variant="primary" style={{ marginTop: '10px' }}>
            Опубликовать
          </Button>
        </form>
      </Card>
      <h2>Лента</h2>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1877f2',
                  marginRight: '10px',
                }}
              ></div>
              <div>
                <h4 style={{ margin: 0 }}>{post.author?.name || 'Пользователь'}</h4>
                <small style={{ color: '#65676b' }}>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            </div>
            <p style={{ margin: '10px 0' }}>{post.content}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Button variant="secondary">Нравится</Button>
              <Button variant="secondary">Комментировать</Button>
              <Button variant="secondary">Поделиться</Button>
            </div>
          </Card>
        ))
      ) : (
        <p>Постов пока нет.</p>
      )}
    </div>
  );
};

export default FeedPage;
