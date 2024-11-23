const db = require("../config/db");

const getJumlahPelajaran = async (req, res) => {
  try {
    // Query untuk menghitung jumlah pelajaran
    const [pelajaran] = await db.query(
      `SELECT COUNT(pelajaran.id_matpel) AS jumlah_pelajaran
                 FROM pelajaran`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_pelajaran: pelajaran[0].jumlah_pelajaran });
  } catch (error) {
    console.error("Error mendapatkan jumlah pelajaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getMataPelajaran = async (req, res) => {
  try {
    const [mataPelajaran] = await db.query(`SELECT id_matpel, nama_matpel FROM pelajaran`);
    res.status(200).json({ mataPelajaran });
  } catch (error) {
    console.error("Error mendapatkan data mata pelajaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const createPelajaran = async (req, res) => {
  try {
    // Data dari request body
    const { nama_matpel } = req.body;

    // Query untuk menambahkan pelajaran baru
    await db.query(`INSERT INTO pelajaran (nama_matpel) VALUES (?)`, [nama_matpel]);

    res.status(201).json({ message: "Mata Pelajaran berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

const removePelajaran = async (req, res) => {
  try {
    const { id_matpel } = req.body; // ID siswa dari body request

    if (!id_matpel) {
      return res.status(400).json({ message: "id_matpel harus disertakan" });
    }

    // Periksa apakah matpel memang ada
    const [checkExisting] = await db.query(`SELECT * FROM pelajaran WHERE id_matpel = ?`, [id_matpel]);
    if (checkExisting.length === 0) {
      return res.status(404).json({ message: "Mata Pelajaran tidak ditemukan" });
    }

    // Hapus siswa dari kelas
    await db.query(`DELETE FROM pelajaran WHERE id_matpel = ?`, [id_matpel]);

    res.status(200).json({ message: "Mata Pelajaran berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus Mata Pelajaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getMataPelajaran, getJumlahPelajaran, createPelajaran, removePelajaran };
