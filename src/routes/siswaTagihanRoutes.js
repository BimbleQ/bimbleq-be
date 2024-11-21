const express = require('express');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const isSiswa = require('../middlewares/siswaAuthMiddleware');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

// Route untuk mendapatkan data tagihan siswa
router.get('/tagihan', isAuthenticated, isSiswa, getSiswaTagihan);

module.exports = router;
