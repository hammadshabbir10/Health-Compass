const express = require('express');
const router = express.Router();
const { generateTests } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/generate-tests', protect, generateTests);

module.exports = router;
