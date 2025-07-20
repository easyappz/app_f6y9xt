const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Route: Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route: Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;
      user.bio = req.body.bio || user.bio;

      const updatedUser = await user.save();

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route: Add friend
router.post('/friends/:id', protect, async (req, res) => {
  try {
    const friend = await User.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: 'User is already a friend' });
    }

    user.friends.push(friend._id);
    await user.save();

    return res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route: Remove friend
router.delete('/friends/:id', protect, async (req, res) => {
  try {
    const friendId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is not in friends list' });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    return res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
