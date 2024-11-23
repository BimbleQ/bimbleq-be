const db = require("../config/db");

const createPertemuan = async (req, res) => {
  try {
    const { id_kelas, waktu_kelas, id_pengajar } = req.body;

    let pengajar = id_pengajar; // Default gunakan nilai dari input jika ada

    if (!pengajar) {
      // Jika id_pengajar tidak diberikan, ambil dari tabel kelas
      const [result] = await db.query(`SELECT id_pengajar FROM kelas WHERE id_kelas = ?`, [id_kelas]);

      if (result.length === 0) {
        return res.status(404).json({ message: "Kelas tidak ditemukan" });
      }

      pengajar = result[0].id_pengajar;
    }

    // Insert ke tabel pertemuan
    await db.query(`INSERT INTO pertemuan (id_kelas, id_pengajar, waktu_kelas) VALUES (?, ?, ?)`, [id_kelas, pengajar, waktu_kelas]);

    res.status(201).json({ message: "Pertemuan berhasil ditambahkan" });
  } catch (error) {
    console.error("Error saat menambah pertemuan:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { createPertemuan };
