const db = require('../config/db');

//mendapatkan data tagihan siswa dengan status "unpaid"
const getSiswaTagihan = async (req, res) => {
    try {
        // User yang login dari session
        const user = req.session.user;

        // Query untuk mendapatkan data tagihan dengan status "pending" atau "telat"
        const [tagihan] = await db.query(
            `SELECT pembayaran.tipe_pembayaran AS jenis_tagihan,
                    pembayaran.jumlah,
                    pembayaran.status
             FROM pembayaran
             WHERE pembayaran.id_siswa = ? AND (pembayaran.status = 'pending' OR pembayaran.status = 'telat')`,
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