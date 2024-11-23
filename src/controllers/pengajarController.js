const db = require("../config/db");

//jumlah pengajar
const getJumlahPengajar = async (req, res) => {
  try {
    // Query untuk menghitung jumlah kelas aktif
    const [pengajar] = await db.query(
      `SELECT COUNT(pengajar.id_pengajar) AS jumlah_pengajar
               FROM pengajar`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_pengajar: pengajar[0].jumlah_pengajar });
  } catch (error) {
    console.error("Error mendapatkan jumlah pengajar:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

//list pengajar based on id_matpel
const getPengajarByMataPelajaran = async (req, res) => {
  const { id_matpel } = req.query; //use id_matpel dari query string

  if (!id_matpel) {
    return res.status(400).json({ message: "id_matpel harus disertakan" });
  }

  try {
    const [pengajar] = await db.query(`SELECT id_pengajar, nama FROM pengajar WHERE id_matpel = ?`, [id_matpel]);

    if (pengajar.length === 0) {
      return res.status(404).json({ message: "Tidak ada pengajar untuk mata pelajaran ini" });
    }

    res.status(200).json({ pengajar });
  } catch (error) {
    console.error("Error mendapatkan data pengajar:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getPengajar = async (req, res) => {
  try {
    const query = `
      SELECT 
          pengajar.nama,
          pelajaran.nama_matpel AS spesialisasi,
          pengajar.kontak
      FROM pengajar
      JOIN pelajaran ON pelajaran.id_matpel = pengajar.id_matpel;
    `;

    const [pengajar] = await db.query(query);
    res.status(200).json({ pengajar });
  } catch (error) {
    console.error("Error saat mendapatkan data pengajar:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

const updatePengajar = async (req, res) => {
  try {
    const { id_pengajar } = req.params; // Ambil ID kelas dari parameter
    const { id_matpel, nama, kontak } = req.body; // Data yang ingin diperbarui

    if (!id_pengajar) {
      return res.status(400).json({ message: "id_pengajar harus disertakan" });
    }

    // Validasi apakah pengajar dengan ID tersebut ada
    const [kelas] = await db.query(`SELECT * FROM pengajar WHERE id_pengajar = ?`, [id_pengajar]);
    if (kelas.length === 0) {
      return res.status(404).json({ message: "Pengajar tidak ditemukan" });
    }

    // Update data kelas
    await db.query(
      `UPDATE pengajar
           SET id_matpel = COALESCE(?, id_matpel),
               nama = COALESCE(?, nama),
               kontak = COALESCE(?, kontak)
           WHERE id_pengajar = ?`,
      [id_matpel, nama, kontak, id_pengajar]
    );

    res.status(200).json({ message: "Pengajar berhasil diperbarui" });
  } catch (error) {
    console.error("Error saat memperbarui pengajar:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getPengajarByMataPelajaran, getJumlahPengajar, getPengajar, updatePengajar };
