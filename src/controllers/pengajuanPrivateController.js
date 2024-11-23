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

const updateStatusPengajuanPrivat = async (req, res) => {
  const { id_request_privat, status_request } = req.body;

  try {
    const query = `
      UPDATE request_kelas_privat
      SET status_request = ?
      WHERE id_request_privat = ?;
    `;
    const [result] = await db.query(query, [status_request, id_request_privat]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request tidak ditemukan." });
    }

    res.status(200).json({ message: "Status request privat berhasil diperbarui." });
  } catch (error) {
    console.error("Error saat memperbarui status request privat:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getJumlahPengajuanPrivat, getPengajuanKelasPrivat, updateStatusPengajuanPrivat };
