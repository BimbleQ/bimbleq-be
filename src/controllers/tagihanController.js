const db = require("../config/db"); // Import konfigurasi database

const getJumlahTagihanPending = async (req, res) => {
  try {
    // Query untuk menghitung tagihan pending
    const [tagihan] = await db.query(
      `SELECT COUNT(pembayaran.id_pembayaran) AS jumlah_tagihan_pending
               FROM pembayaran WHERE pembayaran.status = 'pending'`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_tagihan_pending: tagihan[0].jumlah_tagihan_pending });
  } catch (error) {
    console.error("Error mendapatkan jumlah tagihan pending:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getTagihan = async (req, res) => {
  try {
    const [pembayaran] = await db.query(`SELECT * FROM pembayaran`);
    res.status(200).json({ pembayaran });
  } catch (error) {
    console.error("Error saat mendapatkan data pembayaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

const updateStatusTagihan = async (req, res) => {
  try {
    const { id_pembayaran, status } = req.body;

    // Validasi input
    const allowedStatuses = ["pending", "lunas", "telat"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Status pembayaran tidak valid." });
    }

    // Perbarui status pembayaran di database
    const [result] = await db.query(`UPDATE pembayaran SET status = ? WHERE id_pembayaran = ?`, [status, id_pembayaran]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan." });
    }

    res.status(200).json({ message: "Status pembayaran berhasil diperbarui." });
  } catch (error) {
    console.error("Error saat memperbarui status pembayaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { getJumlahTagihanPending, getTagihan, updateStatusTagihan };
