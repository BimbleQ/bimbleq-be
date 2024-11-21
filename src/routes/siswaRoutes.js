const express = require('express');
const { getPertemuanHariIni } = require('../controllers/siswaJadwalHarianController');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const { getRequestKelasPrivat } = require('../controllers/siswaPengajuanPrivateController');
const { getRequestKelasReguler } = require('../controllers/siswaPengajuanRegulerController');
const isAuthenticated = require('../middlewares/authMiddleware'); 
const isSiswa = require('../middlewares/siswaAuthMiddleware'); 

const router = express.Router();

//pertemuan harian 
router.get('/pertemuan', isAuthenticated, isSiswa, getPertemuanHariIni);
//tagihan(unpaid)
router.get('/tagihan', isAuthenticated, isSiswa, getSiswaTagihan);
//kelas private
router.get('/reqPrivateClass', isAuthenticated, isSiswa, getRequestKelasPrivat);
//kelas reguler
router.get('/requestKelasReguler', isAuthenticated, isSiswa, getRequestKelasReguler);

module.exports = router;
