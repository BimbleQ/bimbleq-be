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

const getSiswaByKelas = async (req, res) => {
  const { id_kelas } = req.params; //use id_matpel dari query string

  if (!id_kelas) {
    return res.status(400).json({ message: "id_kelas harus disertakan" });
  }

  try {
    const [siswa] = await db.query(
      `
      SELECT 
          siswa.nama AS nama_siswa
      FROM 
          siswa_kelas
      JOIN 
          siswa ON siswa_kelas.id_siswa = siswa.id_siswa
      WHERE 
          siswa_kelas.id_kelas = ?;
      `,
      [id_kelas]
    );

    if (siswa.length === 0) {
      return res.status(404).json({ message: "Tidak ada siswa untuk kelas ini" });
    }

    res.status(200).json({ siswa });
  } catch (error) {
    console.error("Error mendapatkan data siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getJumlahSiswa, getSiswaByKelas };
