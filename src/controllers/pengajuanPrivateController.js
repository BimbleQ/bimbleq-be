const db = require("../config/db"); // Import konfigurasi database

const getJumlahPengajuanPrivat = async (req, res) => {
  try {
    // Query untuk menghitung jumlah request private
    const [request_kelas_privat] = await db.query(
      `SELECT COUNT(request_kelas_privat.id_request_privat) AS jumlah_request_privat
               FROM request_kelas_privat`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_request_privat: request_kelas_privat[0].jumlah_request_privat });
  } catch (error) {
    console.error("Error mendapatkan jumlah request kelas privat:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getPengajuanKelasPrivat = async (req, res) => {
  try {
    const query = `
      SELECT 
          request_kelas_privat.*,
          siswa.nama AS nama_siswa,
          pelajaran.nama_matpel AS nama_matpel,
          pengajar.nama AS nama_pengajar
      FROM request_kelas_privat
      JOIN siswa ON request_kelas_privat.id_siswa = siswa.id_siswa
      JOIN pelajaran ON request_kelas_privat.id_matpel = pelajaran.id_matpel
      LEFT JOIN pengajar ON request_kelas_privat.id_pengajar = pengajar.id_pengajar;
    `;

    const [requests] = await db.query(query);
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error saat mendapatkan data request kelas privat:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getJumlahPengajuanPrivat, getPengajuanKelasPrivat };
