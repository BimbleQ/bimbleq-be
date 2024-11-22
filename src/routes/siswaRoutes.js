const express = require('express');
const { getPertemuanHariIni } = require('../controllers/siswaJadwalHarianController');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const { getRequestKelasPrivat, createRequestKelasPrivate } = require('../controllers/siswaPengajuanPrivateController');
const { getMataPelajaran } = require('../controllers/pelajaranController');
const { getRequestKelasReguler } = require('../controllers/siswaPengajuanRegulerController');
const { getPengajarByMataPelajaran } = require('../controllers/pengajarController');
const isAuthenticated = require('../middlewares/authMiddleware'); 
const isSiswa = require('../middlewares/siswaAuthMiddleware'); 

const router = express.Router();

//pertemuan harian 
router.get('/pertemuan', isAuthenticated, isSiswa, getPertemuanHariIni);
//tagihan(unpaid)
router.get('/tagihan', isAuthenticated, isSiswa, getSiswaTagihan);
//kelas private
router.get('/reqPrivateClass', isAuthenticated, isSiswa, getRequestKelasPrivat);
router.post('/crePrivateClass', isAuthenticated,isSiswa,createRequestKelasPrivate);
//kelas reguler
router.get('/reqRegulerClass', isAuthenticated, isSiswa, getRequestKelasReguler);

//api/siswa/pengajarMatpel?id_matpel=1
router.get('/pengajarMatpel', isAuthenticated, isSiswa, getPengajarByMataPelajaran);

router.get('/pelajaran', isAuthenticated, getMataPelajaran);

module.exports = router;
