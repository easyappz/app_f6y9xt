const express = require('express');
const router = express.Router();

// Mock endpoint for messages (to be implemented)
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
