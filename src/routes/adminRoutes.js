const express = require('express');
const { getMataPelajaran } = require('../controllers/pelajaranController');
const isAuthenticated = require('../middlewares/authMiddleware'); 
const isAdmin = require('../middlewares/adminAuthMiddleware'); 

const router = express.Router();
router.get('/pelajaran', isAuthenticated, isAdmin, getMataPelajaran);
module.exports = router;