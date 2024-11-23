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

const getPengajuanKelasReguler = async (req, res) => {
  try {
    const query = `
      SELECT 
          request_kelas_reguler.*,
          siswa.nama AS nama_siswa,
          kelas_lama.nama_kelas AS nama_kelas_lama,
          pertemuan_lama.waktu_kelas AS waktu_pertemuan_lama,
          kelas_baru.nama_kelas AS nama_kelas_baru,
          pertemuan_baru.waktu_kelas AS waktu_pertemuan_baru
      FROM request_kelas_reguler
      JOIN siswa ON request_kelas_reguler.id_siswa = siswa.id_siswa
      JOIN pertemuan AS pertemuan_lama ON request_kelas_reguler.id_pertemuan_lama = pertemuan_lama.id_pertemuan
      JOIN kelas AS kelas_lama ON pertemuan_lama.id_kelas = kelas_lama.id_kelas
      JOIN pertemuan AS pertemuan_baru ON request_kelas_reguler.id_pertemuan_baru = pertemuan_baru.id_pertemuan
      JOIN kelas AS kelas_baru ON pertemuan_baru.id_kelas = kelas_baru.id_kelas;
    `;

    const [requests] = await db.query(query);
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error saat mendapatkan data request kelas reguler:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getJumlahPengajuanReguler, getPengajuanKelasReguler };
