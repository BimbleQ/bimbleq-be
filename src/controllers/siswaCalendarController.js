const db = require('../config/db');

const getCalendarBySiswa = async (req, res) => {
    try {
        const user = req.session.user; 
        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        const id_siswa = user.id_user; //id_siswa dari session

        const [kelasData] = await db.query(
            `SELECT 
                kelas.nama_kelas, 
                pertemuan.waktu_kelas 
             FROM siswa_kelas
             JOIN kelas ON siswa_kelas.id_kelas = kelas.id_kelas
             JOIN pertemuan ON kelas.id_kelas = pertemuan.id_kelas
             WHERE siswa_kelas.id_siswa = ?`,
            [id_siswa]
        );

        if (kelasData.length === 0) {
            return res.status(404).json({ message: 'Tidak ada kelas yang ditemukan untuk siswa ini' });
        }

        res.status(200).json({ kelas: kelasData });
    } catch (error) {
        console.error('Error mendapatkan data kelas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getCalendarBySiswa };