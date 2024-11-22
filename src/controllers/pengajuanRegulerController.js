const db = require("../config/db"); // Import konfigurasi database

const getJumlahPengajuanReguler = async (req, res) => {
  try {
    // Query untuk menghitung jumlah request reguler
    const [request_kelas_reguler] = await db.query(
      `SELECT COUNT(request_kelas_reguler.id_request_reguler) AS jumlah_request_reguler
               FROM request_kelas_reguler`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_request_reguler: request_kelas_reguler[0].jumlah_request_reguler });
  } catch (error) {
    console.error("Error mendapatkan jumlah request kelas reguler:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getJumlahPengajuanReguler };
