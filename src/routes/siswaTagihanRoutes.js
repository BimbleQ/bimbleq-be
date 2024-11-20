const express = require('express');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const { isAuthenticated, isSiswa } = require('../middlewares/siswaAuthMiddleware');

const router = express.Router();

// Route untuk mendapatkan data tagihan siswa
router.get('/tagihan', isAuthenticated, isSiswa, getSiswaTagihan);

module.exports = router;
