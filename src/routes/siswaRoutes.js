const express = require('express');
const { getPertemuanHariIni } = require('../controllers/siswaJadwalHarianController');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const { getRequestKelasPrivat, createRequestKelasPrivate } = require('../controllers/siswaPengajuanPrivateController');
const { getMataPelajaran } = require('../controllers/pelajaranController');
const { getRequestKelasReguler } = require('../controllers/siswaPengajuanRegulerController');
const { getPengajarByMataPelajaran } = require('../controllers/pengajarController');
const { getKelasTujuanRefId, getKelasAwal } = require('../controllers/kelasController');
const { postRequestKelasReguler } = require('../controllers/siswaReqRegulerController');
const { getTagihanBySiswa } = require('../controllers/siswaPembayaranController');
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

//api for private class re
router.get('/pelajaran', isAuthenticated, getMataPelajaran);
    //api/siswa/pengajarMatpel?id_matpel=1
router.get('/pengajarMatpel', isAuthenticated, isSiswa, getPengajarByMataPelajaran);
    //api post req kelas reguler
router.post('/postReqReg', isAuthenticated, isSiswa, postRequestKelasReguler)

//api for req pindah kelas
router.get('/kelasTujuan_refID', isAuthenticated, isSiswa, getKelasTujuanRefId);
router.get('/kelasAwal', isAuthenticated, isSiswa, getKelasAwal);

//api for bukti pembayaran
router.get('/getTagihanBysiswa',isAuthenticated, isSiswa,getTagihanBySiswa );


module.exports = router;
