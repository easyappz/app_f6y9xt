const express = require('express');
const Post = require('../models/Post');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/post/create - Create a new post
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { content, images } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({
      author: req.user.id,
      content,
      images: images || []
    });
    await post.save();

    const populatedPost = await Post.findById(post._id).populate('author', '-password');
    res.status(201).json({ message: 'Post created successfully', post: populatedPost });
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// GET /api/post/feed - Get feed of posts
router.get('/feed', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', '-password')
      .populate('comments.user', '-password');
    res.json({ posts });
  } catch (error) {
    console.error('Feed fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch feed' });
  }
});

// GET /api/post/:id - Get post by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', '-password')
      .populate('comments.user', '-password');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
  } catch (error) {
    console.error('Post fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// POST /api/post/:id/like - Like a post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id.toString());
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();

    res.json({ message: 'Like updated', post });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ message: 'Failed to update like' });
  }
});

// POST /api/post/:id/comment - Comment on a post
router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({ user: req.user.id, content });
    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate('author', '-password')
      .populate('comments.user', '-password');
    res.json({ message: 'Comment added', post: updatedPost });
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

module.exports = router;
