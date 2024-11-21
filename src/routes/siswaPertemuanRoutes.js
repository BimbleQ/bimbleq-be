const express = require('express');
const { getPertemuanHariIni } = require('../controllers/siswaJadwalHarianController');
const isAuthenticated = require('../middlewares/authMiddleware'); 
const isSiswa = require('../middlewares/siswaAuthMiddleware'); 

const router = express.Router();

// Route untuk mendapatkan data pertemuan siswa
router.get('/pertemuan', isAuthenticated, isSiswa, getPertemuanHariIni);

module.exports = router;
