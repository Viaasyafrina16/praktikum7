const express = require('express');
const router = express.Router();

const adminAuthController = require('../controllers/adminAuthController');
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Register Admin
router.post('/register', adminAuthController.register);

// Login Admin (menghasilkan token)
router.post('/login', adminAuthController.login);

// Hapus user (only admin)
router.delete('/users/:id', adminMiddleware, adminController.deleteUser);

// Hapus api key (only admin)
router.delete('/apikeys/:id', adminMiddleware, adminController.deleteApiKey);

module.exports = router;
