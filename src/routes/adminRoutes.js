const express = require("express");

// Halaman Admin Utama
const { getMataPelajaran } = require("../controllers/pelajaranController");
const { getJumlahKelasAktif } = require("../controllers/kelasController");
const { getJumlahPengajar } = require("../controllers/pengajarController");
const { getJumlahSiswa } = require("../controllers/siswaController");
const { getJumlahTagihanPending } = require("../controllers/tagihanController");
const { getJumlahPengajuanPrivat } = require("../controllers/pengajuanPrivateController");
const { getJumlahPengajuanReguler } = require("../controllers/pengajuanRegulerController");

// Pengelolaan Kelas, Pertemuan, dan Tagihan.
const { createKelas } = require("../controllers/kelasController");
const { getTagihan } = require("../controllers/tagihanController");
const { updateStatusTagihan } = require("../controllers/tagihanController");
const { createPertemuan } = require("../controllers/pertemuanController");
const { getKelas } = require("../controllers/kelasController");
const { updateKelas } = require("../controllers/kelasController");

// Pengelolaan Pengajuan
const { getPengajuanKelasPrivat } = require("../controllers/pengajuanPrivateController");
const { getPengajuanKelasReguler } = require("../controllers/pengajuanRegulerController");
const { updateStatusPengajuanPrivat } = require("../controllers/pengajuanPrivateController");
const { updateStatusPengajuanReguler } = require("../controllers/pengajuanRegulerController");

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

// Post Pertemuan Baru
router.post("/createPertemuan", isAuthenticated, isAdmin, createPertemuan);

// GET - Menampilkan Daftar Seluruh Kelas
router.get("/getKelas", isAuthenticated, isAdmin, getKelas);

// PUT - Edit Kelas /updateKelas?id_kelas=1
router.put("/updateKelas", isAuthenticated, isAdmin, updateKelas);

// GET - Pengajuan kelas Privat
router.get("/getPengajuanKelasPrivat", isAuthenticated, isAdmin, getPengajuanKelasPrivat);

// GET - Pengajuan kelas Reguler
router.get("/getPengajuanKelasReguler", isAuthenticated, isAdmin, getPengajuanKelasReguler);

// PATCH - Update status pengajuan privat
router.patch("/updateStatusPengajuanPrivat", isAuthenticated, isAdmin, updateStatusPengajuanPrivat);

// PATCH - Update status pengajuan reguler
router.patch("/updateStatusPengajuanReguler", isAuthenticated, isAdmin, updateStatusPengajuanReguler);

module.exports = router;
