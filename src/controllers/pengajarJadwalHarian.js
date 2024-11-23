const db = require('../config/db'); 

const getPertemuanHariIniByPengajar = async (req, res) => {
    try {
        const user = req.session.user;
        //  pengajar.nama AS nama_pengajar,
        const [pertemuanHariIni] = await db.query(
            `SELECT pelajaran.nama_matpel,
                    pertemuan.waktu_kelas,
                    kelas.nama_kelas 
             FROM pertemuan
             INNER JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
             INNER JOIN pelajaran ON kelas.id_matpel = pelajaran.id_matpel
             INNER JOIN pengajar ON pertemuan.id_pengajar = pengajar.id_pengajar
             WHERE pertemuan.id_pengajar = ? AND DATE(pertemuan.waktu_kelas) = CURDATE()`,
            [user.id_user] //filter berdasarkan id_pengajar dari session
        );
        
        res.status(200).json({ pertemuanHariIni });
    } catch (error) {
        console.error('Error mendapatkan data pertemuan pengajar:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getPertemuanHariIniByPengajar };
