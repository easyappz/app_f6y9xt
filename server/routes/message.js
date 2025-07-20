const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Chat = require('../models/Chat');
const authMiddleware = require('../middleware/auth');

// Send a new message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    if (!recipient || !content) {
      return res.status(400).json({ message: 'Recipient and content are required' });
    }

    const sender = req.user.id;
    const newMessage = new Message({
      sender,
      recipient,
      content
    });

    const savedMessage = await newMessage.save();

    let chat = await Chat.findOne({
      participants: { $all: [sender, recipient] }
    });

    if (!chat) {
      chat = new Chat({
        participants: [sender, recipient],
        lastMessage: savedMessage._id
      });
    } else {
      chat.lastMessage = savedMessage._id;
      chat.updatedAt = Date.now();
    }

    await chat.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get list of chats for the authenticated user
router.get('/chats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({
      participants: userId
    })
    .populate('participants lastMessage')
    .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
});

// Get messages in a specific chat
router.get('/chat/:recipientId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const recipientId = req.params.recipientId;

    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId }
      ]
    })
    .populate('sender recipient')
    .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

module.exports = router;
