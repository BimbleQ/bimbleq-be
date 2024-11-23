const express = require('express');
const { getPertemuanHariIniByPengajar } = require('../controllers/pengajarJadwalHarian.js');
const isPengajar = require('../middlewares/pengajarAuthMiddleware'); 
const router = express.Router();


router.get('/pertemuanHariIni', isPengajar, getPertemuanHariIniByPengajar);

module.exports = router;
