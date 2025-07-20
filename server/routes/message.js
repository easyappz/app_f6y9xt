const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder for message routes
router.get('/', protect, (req, res) => {
  return res.json({ message: 'Message route placeholder' });
});

module.exports = router;
