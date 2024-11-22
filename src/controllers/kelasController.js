const db = require("../config/db"); // Import konfigurasi database

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
    const { id_matpel, nama_kelas, tipe } = req.body;

    // Validasi tipe kelas
    if (!["reguler", "privat"].includes(tipe)) {
      return res.status(400).json({ message: "Tipe kelas harus 'reguler' atau 'privat'." });
    }

    // Query untuk menambahkan kelas baru
    await db.query(`INSERT INTO kelas (id_matpel, nama_kelas, tipe) VALUES (?, ?, ?)`, [id_matpel, nama_kelas, tipe]);

    res.status(201).json({ message: "Kelas berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getJumlahKelasAktif, createKelas };
