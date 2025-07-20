import React, { useState } from 'react';
import './Post.css';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import Card from './ui/Card';
import TextInput from './ui/TextInput';

const Post = ({ post, onLike, onComment, onRepost }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <Card className="post">
      <div className="post-header">
        <Avatar src={post.authorAvatar} alt={post.authorName} size="medium" />
        <div className="post-header-info">
          <div className="post-author-name">{post.authorName}</div>
          <div className="post-date">{post.createdAt}</div>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.image && <img src={post.image} alt="Post content" className="post-image" />}
      <div className="post-actions">
        <Button
          variant={post.liked ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onLike(post.id)}
        >
          Нравится ({post.likesCount})
        </Button>
        <Button variant="secondary" size="small" onClick={() => setShowComments(!showComments)}>
          Комментировать ({post.commentsCount})
        </Button>
        <Button variant="secondary" size="small" onClick={() => onRepost(post.id)}>
          Поделиться ({post.repostsCount})
        </Button>
      </div>
      {showComments && (
        <div className="post-comments">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="post-comment">
                <Avatar src={comment.authorAvatar} alt={comment.authorName} size="small" />
                <div className="post-comment-content">
                  <div className="post-comment-author">{comment.authorName}</div>
                  <div className="post-comment-text">{comment.text}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="post-no-comments">Комментариев пока нет</div>
          )}
          <div className="post-comment-form">
            <TextInput
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Написать комментарий..."
            />
            <Button variant="primary" size="small" onClick={handleCommentSubmit}>
              Отправить
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
