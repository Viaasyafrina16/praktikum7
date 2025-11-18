const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const adminMiddleware = require('../middleware/adminMiddleware'); // opsional jika ingin proteksi

// Buat user + assign API key (public)
router.post('/create', userController.createUser);

// List semua user + daftar apikey yang dimiliki (hanya admin)
router.get('/all', adminMiddleware, userController.getAllUsers);

module.exports = router;
