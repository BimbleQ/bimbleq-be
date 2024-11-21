const express = require('express');
const { login, logout, validateSession } = require('../controllers/authController');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

//login
router.post('/login', login);

//logout
router.post('/logout', isAuthenticated, logout);

//session validate
router.get('/validate', validateSession);

module.exports = router;
