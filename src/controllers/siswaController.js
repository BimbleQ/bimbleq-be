const db = require("../config/db"); // Import konfigurasi database

const getJumlahSiswa = async (req, res) => {
  try {
    // Query untuk menghitung jumlah siswa
    const [siswa] = await db.query(
      `SELECT COUNT(siswa.id_siswa) AS jumlah_siswa
               FROM siswa`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_siswa: siswa[0].jumlah_siswa });
  } catch (error) {
    console.error("Error mendapatkan jumlah siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getJumlahSiswa };
