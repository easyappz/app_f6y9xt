import React, { useEffect, useState } from 'react';
import './FeedPage.css';
import Post from '../../components/Post';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { instance } from '../../api/axios';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/api/post');
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        setError('Ошибка при загрузке данных');
      }
    } catch (err) {
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (newPostContent.trim()) {
      try {
        const response = await instance.post('/api/post', { content: newPostContent });
        if (response.data) {
          setPosts([response.data, ...posts]);
          setNewPostContent('');
        }
      } catch (err) {
        setError('Не удалось создать пост');
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await instance.post(`/api/post/${postId}/like`);
      if (response.data) {
        setPosts(posts.map((post) => 
          post.id === postId 
            ? { ...post, liked: !post.liked, likesCount: response.data.likesCount } 
            : post
        ));
      }
    } catch (err) {
      console.error('Ошибка при лайке', err);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const response = await instance.post(`/api/post/${postId}/comment`, { text });
      if (response.data) {
        setPosts(posts.map((post) => 
          post.id === postId 
            ? { ...post, comments: [...(post.comments || []), response.data], commentsCount: post.commentsCount + 1 } 
            : post
        ));
      }
    } catch (err) {
      console.error('Ошибка при комментировании', err);
    }
  };

  const handleRepost = async (postId) => {
    try {
      const response = await instance.post(`/api/post/${postId}/repost`);
      if (response.data) {
        setPosts(posts.map((post) => 
          post.id === postId 
            ? { ...post, repostsCount: response.data.repostsCount } 
            : post
        ));
      }
    } catch (err) {
      console.error('Ошибка при репосте', err);
    }
  };

  if (loading) {
    return <div className="feed-loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="feed-error">{error}</div>;
  }

  return (
    <div className="feed-container">
      <div className="feed-sidebar-left">
        {/* Здесь можно добавить дополнительные виджеты для левой колонки */}
      </div>
      <div className="feed-main">
        <Card className="feed-new-post">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Что у вас нового?"
            className="feed-new-post-textarea"
          />
          <div className="feed-new-post-actions">
            <Button variant="primary" onClick={handleCreatePost} disabled={!newPostContent.trim()}>
              Опубликовать
            </Button>
          </div>
        </Card>
        <div className="feed-posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onRepost={handleRepost}
              />
            ))
          ) : (
            <Card>
              <div className="feed-no-posts">Постов пока нет. Напишите первый!</div>
            </Card>
          )}
        </div>
      </div>
      <div className="feed-sidebar-right">
        {/* Здесь можно добавить дополнительные виджеты для правой колонки */}
      </div>
    </div>
  );
};

export default FeedPage;
