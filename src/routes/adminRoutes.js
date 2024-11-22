const express = require("express");

const { getMataPelajaran } = require("../controllers/pelajaranController");
const { getJumlahKelasAktif } = require("../controllers/kelasController");
const { getJumlahPengajar } = require("../controllers/pengajarController");
const { getJumlahSiswa } = require("../controllers/siswaController");
const { getJumlahTagihanPending } = require("../controllers/tagihanController");
const { getJumlahPengajuanPrivat } = require("../controllers/pengajuanPrivateController");
const { getJumlahPengajuanReguler } = require("../controllers/pengajuanRegulerController");

const { createKelas } = require("../controllers/kelasController");
const { getTagihan } = require("../controllers/tagihanController");
const { updateStatusTagihan } = require("../controllers/tagihanController");

const isAuthenticated = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

// Get Mata Pelajaran
router.get("/pelajaran", isAuthenticated, isAdmin, getMataPelajaran);

// Get Jumlah Kelas Aktif
router.get("/jumlahKelasAktif", isAuthenticated, isAdmin, getJumlahKelasAktif);

// Get Jumlah Pengajar
router.get("/jumlahPengajar", isAuthenticated, isAdmin, getJumlahPengajar);

// Get Jumlah Siswa
router.get("/jumlahSiswa", isAuthenticated, isAdmin, getJumlahSiswa);

// Get Jumlah Tagihan Pending
router.get("/jumlahTagihanPending", isAuthenticated, isAdmin, getJumlahTagihanPending);

// Get Jumlah Request Private
router.get("/jumlahPengajuanPrivat", isAuthenticated, isAdmin, getJumlahPengajuanPrivat);

// Get Jumlah Request Reguler
router.get("/jumlahPengajuanReguler", isAuthenticated, isAdmin, getJumlahPengajuanReguler);

// Post Kelas Baru
router.post("/createKelas", isAuthenticated, isAdmin, createKelas);

// Get Semua Tagihan
router.get("/getTagihan", isAuthenticated, isAdmin, getTagihan);

// Update Status Tagihan
router.patch("/updateStatusTagihan", isAuthenticated, isAdmin, updateStatusTagihan);

module.exports = router;
