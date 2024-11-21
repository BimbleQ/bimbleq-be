const db = require('../config/db');

//mendapatkan data tagihan siswa dengan status "unpaid"
const getSiswaTagihan = async (req, res) => {
    try {
        //ser yang login dari session
        const user = req.session.user;

        //query untuk mendapatkan data tagihan dengan status "pending"
        const [tagihan] = await db.query(
            `SELECT pembayaran.tipe_pembayaran AS jenis_tagihan,
                    pembayaran.jumlah,
                    pembayaran.status
             FROM pembayaran
             WHERE pembayaran.id_user = ? AND pembayaran.status = 'pending'`,
            [user.id_user]
        );

        //kirim data tagihan ke frontend
        res.status(200).json({ tagihan });
    } catch (error) {
        console.error('Error mendapatkan data tagihan siswa:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getSiswaTagihan };