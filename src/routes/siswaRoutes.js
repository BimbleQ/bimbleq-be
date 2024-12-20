const express = require('express');
const { getPertemuanHariIni } = require('../controllers/siswaJadwalHarianController');
const { getSiswaTagihan } = require('../controllers/siswaTagihanController');
const { getRequestKelasPrivat, createRequestKelasPrivate } = require('../controllers/siswaPengajuanPrivateController');
const { getMataPelajaran } = require('../controllers/pelajaranController');
const { getRequestKelasReguler } = require('../controllers/siswaPengajuanRegulerController');
const { getPengajarByMataPelajaran } = require('../controllers/pengajarController');
const { getKelasTujuanRefId, getKelasAwal } = require('../controllers/kelasController');
const { postRequestKelasReguler } = require('../controllers/siswaReqRegulerController');
const { getTagihanBySiswa,getHistoriPembayaran, uploadBukti, upload } = require('../controllers/siswaPembayaranController');
const { getCalendarBySiswa } = require('../controllers/siswaCalendarController');
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

//api for private class re
router.get('/pelajaran', isAuthenticated, getMataPelajaran);
    //api/siswa/pengajarMatpel?id_matpel=1
router.get('/pengajarMatpel', isAuthenticated, isSiswa, getPengajarByMataPelajaran);
    //api post req kelas reguler
router.post('/postReqReg', isAuthenticated, isSiswa, postRequestKelasReguler)

//api for req pindah kelas
//http://localhost:5001/api/siswa/kelasTujuan_refID?id_pertemuan_lama=1
router.get('/kelasTujuan_refID', isAuthenticated, isSiswa, getKelasTujuanRefId);
router.get('/kelasAwal', isAuthenticated, isSiswa, getKelasAwal);

//api for bukti pembayaran
router.get('/getTagihanBysiswa',isAuthenticated, isSiswa,getTagihanBySiswa );
    //api for history bayar siswa sorted by session id_siswa
    router.get('/getHistoryBayarSiswa',isAuthenticated, isSiswa,getHistoriPembayaran );

//api for showing calendar siswa
router.get('/getCalendar',isAuthenticated, isSiswa, getCalendarBySiswa );

router.patch("/uploadBukti", isSiswa, upload.single("bukti"), uploadBukti);

module.exports = router;
