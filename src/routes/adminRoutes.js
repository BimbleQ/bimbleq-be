const express = require("express");

// Halaman Admin Utama
const { getMataPelajaran, createPelajaran, removePelajaran } = require("../controllers/pelajaranController");
const { getJumlahKelasAktif, getKelasById } = require("../controllers/kelasController");
const { getJumlahPengajar, getPengajarByMataPelajaran, getPengajarById } = require("../controllers/pengajarController");
const { getJumlahSiswa, getSiswaById } = require("../controllers/siswaController");
const { getJumlahTagihanPending } = require("../controllers/tagihanController");
const { getJumlahPengajuanPrivat } = require("../controllers/pengajuanPrivateController");
const { getJumlahPengajuanReguler } = require("../controllers/pengajuanRegulerController");
const { getJumlahPelajaran } = require("../controllers/pelajaranController");

// Pengelolaan Kelas Pertemuan, dan Tagihan.
const { createKelas } = require("../controllers/kelasController");
const { getTagihan } = require("../controllers/tagihanController");
const { updateStatusTagihan } = require("../controllers/tagihanController");
const { createPertemuan } = require("../controllers/pertemuanController");
const { getKelas } = require("../controllers/kelasController");
const { updateKelas } = require("../controllers/kelasController");

// Pengelolaan Siswa
const { getSiswa } = require("../controllers/siswaController");
const { getSiswaByKelas } = require("../controllers/siswaController");
const { addSiswaToKelas } = require("../controllers/siswaController");
const { removeSiswaFromKelas } = require("../controllers/siswaController");
const { addSiswa } = require("../controllers/siswaController");
const { updateSiswa } = require("../controllers/siswaController");

// Pengelolaan Pengajuan dan Pengajar
const { getPengajuanKelasPrivat } = require("../controllers/pengajuanPrivateController");
const { getPengajuanKelasReguler } = require("../controllers/pengajuanRegulerController");
const { updateStatusPengajuanPrivat } = require("../controllers/pengajuanPrivateController");
const { updateStatusPengajuanReguler } = require("../controllers/pengajuanRegulerController");
const { getPengajar } = require("../controllers/pengajarController");
const { addPengajar } = require("../controllers/pengajarController");
const { updatePengajar } = require("../controllers/pengajarController");

const isAuthenticated = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

// Get Mata Pelajaran
router.get("/pelajaran", isAuthenticated, isAdmin, getMataPelajaran);

// Get Jumlah Pelajaran
router.get("/jumlahPelajaran", isAuthenticated, isAdmin, getJumlahPelajaran);

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
router.post("/createPelajaran", isAuthenticated, isAdmin, createPelajaran);

// DELETE - Hapus Mata Pelajaran
router.delete("/removePelajaran", isAuthenticated, isAdmin, removePelajaran);

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
router.put("/updateKelas/:id_kelas", isAuthenticated, isAdmin, updateKelas);

// GET - Ambil Daftar Siswa
router.get("/getSiswa", isAuthenticated, isAdmin, getSiswa);

// GET - Ambil Daftar Siswa Berdasarkan kelas
router.get("/getSiswaByKelas/:id_kelas", isAuthenticated, isAdmin, getSiswaByKelas);

// POST - Daftarkan Siswa ke kelas
router.post("/addSiswaToKelas/:id_kelas", isAuthenticated, isAdmin, addSiswaToKelas);

// DELETE - Hapus Siswa dari kelas
router.delete("/removeSiswaFromKelas/:id_kelas", isAuthenticated, isAdmin, removeSiswaFromKelas);

// POST - Daftarkan Siswa
router.post("/addSiswa", isAuthenticated, isAdmin, addSiswa);

// PUT - Edit Siswa
router.put("/updateSiswa/:id_siswa", isAuthenticated, isAdmin, updateSiswa);

// GET - Pengajuan kelas Privat
router.get("/getPengajuanKelasPrivat", isAuthenticated, isAdmin, getPengajuanKelasPrivat);

// GET - Pengajuan kelas Reguler
router.get("/getPengajuanKelasReguler", isAuthenticated, isAdmin, getPengajuanKelasReguler);

// PATCH - Update status pengajuan privat
router.patch("/updateStatusPengajuanPrivat", isAuthenticated, isAdmin, updateStatusPengajuanPrivat);

// PATCH - Update status pengajuan reguler
router.patch("/updateStatusPengajuanReguler", isAuthenticated, isAdmin, updateStatusPengajuanReguler);

// GET - Tampilkan Daftar Pengajar
router.get("/getPengajar", isAuthenticated, isAdmin, getPengajar);

// GET - Tampilkan Daftar Pengajar berdasarkan Spesialisasi
router.get("/pengajarMatpel", isAuthenticated, isAdmin, getPengajarByMataPelajaran);

// POST - Daftarkan Pengajar
router.post("/addPengajar", isAuthenticated, isAdmin, addPengajar);

// PUT - Edit Pengajar
router.put("/updatePengajar/:id_pengajar", isAuthenticated, isAdmin, updatePengajar);

// GET - Get Siswa by ID
router.get("/getSiswaById/:id_siswa", isAuthenticated, isAdmin, getSiswaById);

// GET - Get Pengajar by ID
router.get("/getPengajarById/:id_pengajar", isAuthenticated, isAdmin, getPengajarById);

// GET - Get Kelas by ID
router.get("/getKelasById/:id_kelas", isAuthenticated, isAdmin, getKelasById);

module.exports = router;
