const db = require('../config/db'); 


const getPertemuanHariIni = async (req, res) => {
    try {
        const user = req.session.user;

        // Query untuk mendapatkan pertemuan hari ini, termasuk tipe dari tabel kelas
        const [pertemuanHariIni] = await db.query(
            `SELECT 
                pelajaran.nama_matpel,
                pertemuan.waktu_kelas,
                pengajar.nama AS nama_pengajar,
                kelas.nama_kelas,
                kelas.tipe  -- Tambahkan tipe dari tabel kelas
             FROM pertemuan
             INNER JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
             INNER JOIN pelajaran ON kelas.id_matpel = pelajaran.id_matpel
             INNER JOIN pengajar ON pertemuan.id_pengajar = pengajar.id_pengajar
             INNER JOIN siswa_kelas ON kelas.id_kelas = siswa_kelas.id_kelas
             WHERE siswa_kelas.id_siswa = ? AND DATE(pertemuan.waktu_kelas) = CURDATE()`,
            [user.id_user]
        );

        res.status(200).json({ pertemuanHariIni });
    } catch (error) {
        console.error('Error mendapatkan data pertemuan siswa:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getPertemuanHariIni };
