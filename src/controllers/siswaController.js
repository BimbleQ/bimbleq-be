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

const getSiswa = async (req, res) => {
  try {
    // Query untuk menghitung jumlah siswa
    const [siswa] = await db.query(`SELECT * FROM siswa`);

    // Kirim hasil ke response
    res.status(200).json({ siswa });
  } catch (error) {
    console.error("Error mendapatkan data siswa:", error);
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

const addSiswaToKelas = async (req, res) => {
  try {
    const { id_kelas } = req.params; // ID kelas dari parameter
    const { id_siswa } = req.body; // ID siswa dari body request

    if (!id_kelas || !id_siswa) {
      return res.status(400).json({ message: "id_kelas dan id_siswa harus disertakan" });
    }

    // Periksa apakah siswa sudah ada di kelas
    const [checkExisting] = await db.query(`SELECT * FROM siswa_kelas WHERE id_siswa = ? AND id_kelas = ?`, [id_siswa, id_kelas]);
    if (checkExisting.length > 0) {
      return res.status(400).json({ message: "Siswa sudah terdaftar di kelas ini" });
    }

    // Tambahkan siswa ke kelas
    await db.query(`INSERT INTO siswa_kelas (id_siswa, id_kelas) VALUES (?, ?)`, [id_siswa, id_kelas]);

    res.status(201).json({ message: "Siswa berhasil ditambahkan ke kelas" });
  } catch (error) {
    console.error("Error saat menambahkan siswa ke kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const removeSiswaFromKelas = async (req, res) => {
  try {
    const { id_kelas } = req.params; // ID kelas dari parameter
    const { id_siswa } = req.body; // ID siswa dari body request

    if (!id_kelas || !id_siswa) {
      return res.status(400).json({ message: "id_kelas dan id_siswa harus disertakan" });
    }

    // Periksa apakah siswa memang ada di kelas
    const [checkExisting] = await db.query(`SELECT * FROM siswa_kelas WHERE id_siswa = ? AND id_kelas = ?`, [id_siswa, id_kelas]);
    if (checkExisting.length === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan di kelas ini" });
    }

    // Hapus siswa dari kelas
    await db.query(`DELETE FROM siswa_kelas WHERE id_siswa = ? AND id_kelas = ?`, [id_siswa, id_kelas]);

    res.status(200).json({ message: "Siswa berhasil dihapus dari kelas" });
  } catch (error) {
    console.error("Error saat menghapus siswa dari kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getJumlahSiswa, getSiswa, getSiswaByKelas, addSiswaToKelas, removeSiswaFromKelas };
