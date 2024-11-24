const db = require('../config/db'); 
const { differenceInDays } = require('date-fns'); 

const getRequestKelasReguler = async (req, res) => {
    try {
        const user = req.session.user;

        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        // Query untuk mendapatkan data request kelas reguler
        const [requests] = await db.query(
            `SELECT 
                kelas_lama.nama_kelas AS nama_kelas_lama,
                kelas_baru.nama_kelas AS nama_kelas_baru,
                pelajaran_lama.nama_matpel AS nama_matpel_lama,
                pelajaran_baru.nama_matpel AS nama_matpel_baru,
                pertemuan_lama.waktu_kelas AS waktu_kelas_lama,
                pertemuan_baru.waktu_kelas AS waktu_kelas_baru,
                pengajar_lama.nama AS nama_pengajar_lama,
                pengajar_baru.nama AS nama_pengajar_baru,
                request_kelas_reguler.status_request,
                request_kelas_reguler.tanggal_request
             FROM request_kelas_reguler
             LEFT JOIN pertemuan AS pertemuan_lama ON request_kelas_reguler.id_pertemuan_lama = pertemuan_lama.id_pertemuan
             LEFT JOIN kelas AS kelas_lama ON pertemuan_lama.id_kelas = kelas_lama.id_kelas
             LEFT JOIN pelajaran AS pelajaran_lama ON kelas_lama.id_matpel = pelajaran_lama.id_matpel
             LEFT JOIN pengajar AS pengajar_lama ON pertemuan_lama.id_pengajar = pengajar_lama.id_pengajar
             LEFT JOIN pertemuan AS pertemuan_baru ON request_kelas_reguler.id_pertemuan_baru = pertemuan_baru.id_pertemuan
             LEFT JOIN kelas AS kelas_baru ON pertemuan_baru.id_kelas = kelas_baru.id_kelas
             LEFT JOIN pelajaran AS pelajaran_baru ON kelas_baru.id_matpel = pelajaran_baru.id_matpel
             LEFT JOIN pengajar AS pengajar_baru ON pertemuan_baru.id_pengajar = pengajar_baru.id_pengajar
             WHERE request_kelas_reguler.id_siswa = ? AND request_kelas_reguler.status_request != 'accepted'`,
            [user.id_user]
        );

        res.status(200).json({ requests });
    } catch (error) {
        console.error('Error mendapatkan data request kelas reguler:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getRequestKelasReguler };
