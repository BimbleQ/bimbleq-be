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

module.exports = { getJumlahTagihanPending };
