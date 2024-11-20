const db = require('../config/db'); // Import koneksi database

// Mendapatkan data tagihan siswa dengan status "unpaid"
const getSiswaTagihan = async (req, res) => {
    try {
        // Ambil user yang login dari session
        const user = req.session.user;

        // Query untuk mendapatkan data tagihan dengan status "unpaid"
        const [tagihan] = await db.query(
            `SELECT pembayaran.tipe_pembayaran AS nama_tagihan,
                    pembayaran.jumlah,
                    pembayaran.status
             FROM pembayaran
             WHERE pembayaran.id_user = ? AND pembayaran.status = 'pending'`,
            [user.id_user]
        );

        // Kirim data tagihan ke frontend
        res.status(200).json({ tagihan });
    } catch (error) {
        console.error('Error mendapatkan data tagihan siswa:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getSiswaTagihan };