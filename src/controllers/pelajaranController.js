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

module.exports = { getMataPelajaran, getJumlahPelajaran };
