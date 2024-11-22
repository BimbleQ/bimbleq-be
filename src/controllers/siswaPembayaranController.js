const db = require('../config/db'); 


const getTagihanBySiswa = async (req, res) => {
    try {
        const user = req.session.user; //data user dari session

        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        const id_siswa = user.id_user; //id_siswa dari session

        const [tagihan] = await db.query(
            `SELECT 
                id_pembayaran, 
                tipe_kelas, 
                tipe_pembayaran, 
                jumlah, 
                waktu_tenggat, 
                status 
             FROM pembayaran 
             WHERE id_siswa = ? AND (status = 'pending' OR status = 'telat')`,
            [id_siswa]
        );

        if (!tagihan || tagihan.length === 0) {
            return res.status(404).json({ message: 'Tidak ada tagihan untuk siswa ini' });
        }

        res.status(200).json({ tagihan });
    } catch (error) {
        console.error('Error mendapatkan data tagihan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getTagihanBySiswa };
