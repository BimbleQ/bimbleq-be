const express = require('express');
const { login, logout, validateSession } = require('../controllers/authController');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

// Login
router.post('/login', login);

// Logout
router.post('/logout', isAuthenticated, logout);

// Validasi sesi
router.get('/validate', validateSession);

module.exports = router;
