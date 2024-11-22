const db = require("../config/db");

const getKelasAwal = async (req, res) => {
  try {
    const user = req.session.user; //ambil data user dari session

    if (!user || user.role !== "siswa") {
      return res.status(403).json({ message: "Akses hanya untuk siswa" });
    }
    const id_siswa = user.id_user; //id_siswa dari session

    const [kelasAwal] = await db.query(
      `SELECT 
                pertemuan.id_pertemuan, 
                kelas.nama_kelas 
             FROM siswa_kelas
             JOIN kelas ON siswa_kelas.id_kelas = kelas.id_kelas
             JOIN pertemuan ON kelas.id_kelas = pertemuan.id_kelas
             WHERE siswa_kelas.id_siswa = ?`,
      [id_siswa]
    );

    if (kelasAwal.length === 0) {
      return res.status(404).json({ message: "Tidak ada kelas yang ditemukan untuk siswa ini" });
    }

    res.status(200).json({ kelasAwal });
  } catch (error) {
    console.error("Error mendapatkan data kelas awal:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

//mendapatkan daftar kelas tujuan berdasarkan mata pelajaran dari kelas awal
const getKelasTujuanRefId = async (req, res) => {
  const { id_pertemuan_lama } = req.query;

  if (!id_pertemuan_lama) {
    return res.status(400).json({ message: "id_pertemuan_lama harus disertakan" });
  }

  try {
    const [matpelResult] = await db.query(
      `SELECT kelas.id_matpel 
             FROM pertemuan 
             JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
             WHERE pertemuan.id_pertemuan = ?`,
      [id_pertemuan_lama]
    );

    if (matpelResult.length === 0) {
      return res.status(404).json({ message: "Kelas awal tidak ditemukan" });
    }

    const id_matpel = matpelResult[0].id_matpel;

    const [kelasTujuan] = await db.query(
      `SELECT 
                pertemuan.id_pertemuan, 
                kelas.nama_kelas 
             FROM pertemuan 
             JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
             WHERE kelas.id_matpel = ?`,
      [id_matpel]
    );

    res.status(200).json({ kelasTujuan });
  } catch (error) {
    console.error("Error mendapatkan data kelas tujuan:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getJumlahKelasAktif = async (req, res) => {
  try {
    // Query untuk menghitung jumlah kelas aktif
    const [kelasAktif] = await db.query(
      `SELECT COUNT(DISTINCT pertemuan.id_kelas) AS jumlah_kelas_aktif
               FROM pertemuan`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_kelas_aktif: kelasAktif[0].jumlah_kelas_aktif });
  } catch (error) {
    console.error("Error mendapatkan jumlah kelas aktif:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const createKelas = async (req, res) => {
  try {
    // Data dari request body
    const { id_matpel, id_pengajar, nama_kelas, tipe } = req.body;

    // Validasi id_matpel ada di tabel pelajaran
    const [pelajaran] = await db.query(`SELECT * FROM pelajaran WHERE id_matpel = ?`, [id_matpel]);
    if (pelajaran.length === 0) {
      return res.status(400).json({ message: "Mata pelajaran tidak ditemukan." });
    }

    // Validasi id_pengajar ada di tabel pengajar
    const [pengajar] = await db.query(`SELECT * FROM pengajar WHERE id_pengajar = ?`, [id_pengajar]);
    if (pengajar.length === 0) {
      return res.status(400).json({ message: "Pengajar tidak ditemukan." });
    }

    // Validasi tipe kelas
    if (!["reguler", "privat"].includes(tipe)) {
      return res.status(400).json({ message: "Tipe kelas harus 'reguler' atau 'privat'." });
    }

    // Query untuk menambahkan kelas baru
    await db.query(`INSERT INTO kelas (id_matpel, id_pengajar, nama_kelas, tipe) VALUES (?, ?, ?, ?)`, [id_matpel, id_pengajar, nama_kelas, tipe]);

    res.status(201).json({ message: "Kelas berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getKelasTujuanRefId, getKelasAwal, getJumlahKelasAktif, createKelas };
