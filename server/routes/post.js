const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const formattedPosts = posts.map(post => ({
      id: post._id,
      authorId: post.authorId,
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      content: post.content,
      image: post.image || '',
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      repostsCount: post.reposts.length,
      liked: false,
      comments: post.comments.map(comment => ({
        id: comment._id,
        authorId: comment.authorId,
        authorName: comment.authorName,
        authorAvatar: comment.authorAvatar || '',
        text: comment.text,
        createdAt: formatDate(comment.createdAt)
      })),
      createdAt: formatDate(post.createdAt)
    }));
    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    // Mock user data (in real app this would come from auth)
    const authorId = 'mockUserId';
    const authorName = 'Тестовый Пользователь';
    const authorAvatar = '';

    const newPost = new Post({
      authorId,
      authorName,
      authorAvatar,
      content
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      id: savedPost._id,
      authorId: savedPost.authorId,
      authorName: savedPost.authorName,
      authorAvatar: savedPost.authorAvatar,
      content: savedPost.content,
      image: savedPost.image || '',
      likesCount: savedPost.likes.length,
      commentsCount: savedPost.comments.length,
      repostsCount: savedPost.reposts.length,
      liked: false,
      comments: [],
      createdAt: formatDate(savedPost.createdAt)
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Like a post
router.post('/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    // Mock user id (in real app this would come from auth)
    const userId = 'mockUserId';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.likes.indexOf(userId);
    if (userIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }

    await post.save();
    res.json({ likesCount: post.likes.length });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Comment on a post
router.post('/:postId/comment', async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    // Mock user data (in real app this would come from auth)
    const authorId = 'mockUserId';
    const authorName = 'Тестовый Пользователь';
    const authorAvatar = '';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      authorId,
      authorName,
      authorAvatar,
      text
    };

    post.comments.push(newComment);
    await post.save();

    const savedComment = post.comments[post.comments.length - 1];
    res.status(201).json({
      id: savedComment._id,
      authorId: savedComment.authorId,
      authorName: savedComment.authorName,
      authorAvatar: savedComment.authorAvatar,
      text: savedComment.text,
      createdAt: formatDate(savedComment.createdAt)
    });
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Repost a post
router.post('/:postId/repost', async (req, res) => {
  try {
    const { postId } = req.params;
    // Mock user id (in real app this would come from auth)
    const userId = 'mockUserId';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.reposts.indexOf(userId);
    if (userIndex === -1) {
      post.reposts.push(userId);
    } else {
      post.reposts.splice(userIndex, 1);
    }

    await post.save();
    res.json({ repostsCount: post.reposts.length });
  } catch (error) {
    console.error('Error reposting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Helper function to format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('ru-RU', options);
}

module.exports = router;
