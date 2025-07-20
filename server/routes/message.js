const express = require('express');
const Message = require('../models/Message');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/message/send - Send a message
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver ID and content are required' });
    }

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content
    });
    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', '-password')
      .populate('receiver', '-password');
    res.status(201).json({ message: 'Message sent successfully', data: populatedMessage });
  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// GET /api/message/conversation/:userId - Get conversation with a user
router.get('/conversation/:userId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    })
      .sort({ createdAt: 1 })
      .populate('sender', '-password')
      .populate('receiver', '-password');
    res.json({ messages });
  } catch (error) {
    console.error('Conversation fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch conversation' });
  }
});

// GET /api/message/unread - Get unread messages
router.get('/unread', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.user.id,
      isRead: false
    })
      .populate('sender', '-password')
      .populate('receiver', '-password');
    res.json({ messages });
  } catch (error) {
    console.error('Unread messages fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch unread messages' });
  }
});

// PUT /api/message/:id/read - Mark message as read
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
      .populate('sender', '-password')
      .populate('receiver', '-password');
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    if (message.receiver._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to mark this message as read' });
    }
    res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Failed to mark message as read' });
  }
});

module.exports = router;
