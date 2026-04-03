// backend/routes/assessment.js
const express = require('express');
const router = express.Router();
const mlService = require('../services/mlService');

// Protect route with authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    // Verify token (you can add JWT verification here)
    // For now, we'll assume token is valid if it exists
    // Add proper JWT verification from your auth system
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

router.post('/classify-risk', auth, async (req, res) => {
  try {
    const { assessmentResults, profile } = req.body;
    
    if (!assessmentResults || !profile) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: assessmentResults and profile'
      });
    }
    
    const result = await mlService.classifyRisk(assessmentResults, profile);
    
    res.json(result);
  } catch (error) {
    console.error('Classification route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

router.get('/ml-health', async (req, res) => {
  const health = await mlService.healthCheck();
  res.json(health);
});

module.exports = router;