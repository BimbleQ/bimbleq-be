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

module.exports = { getJumlahKelasAktif };
