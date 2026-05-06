const express = require('express');
const router = express.Router();
const { getMetrics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/metrics', protect, authorize('admin'), getMetrics);

module.exports = router;