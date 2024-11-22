const express = require("express");
const { getMataPelajaran } = require("../controllers/pelajaranController");
const { getJumlahKelasAktif } = require("../controllers/adminKelasAktifController");
const isAuthenticated = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

// Get Mata Pelajaran
router.get("/pelajaran", isAuthenticated, isAdmin, getMataPelajaran);

// Get Jumlah Kelas Aktif
router.get("/jumlahKelasAktif", isAuthenticated, isAdmin, getJumlahKelasAktif);

module.exports = router;
