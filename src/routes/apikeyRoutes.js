const express = require('express');
const router = express.Router();

const apiKeyController = require('../controllers/apikeyController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Generate API Key (hanya admin)
router.post('/generate', adminMiddleware, apiKeyController.generate);

// List semua API key (hanya admin)
router.get('/list', adminMiddleware, apiKeyController.list);

// Verify API Key (public)
router.post('/verify', apiKeyController.verify);

module.exports = router;
