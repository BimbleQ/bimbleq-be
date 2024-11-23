const db = require('../config/db');

const getKelasWithDetails = async (req, res) => {
    try {
        const [kelasData] = await db.query(
            `SELECT 
                kelas.nama_kelas, 
                pelajaran.nama_matpel, 
                COUNT(siswa_kelas.id_siswa) AS jumlah_siswa
             FROM kelas
             INNER JOIN pelajaran ON kelas.id_matpel = pelajaran.id_matpel
             LEFT JOIN siswa_kelas ON kelas.id_kelas = siswa_kelas.id_kelas
             GROUP BY kelas.id_kelas, pelajaran.nama_matpel`
        );

        if (kelasData.length === 0) {
            return res.status(404).json({ message: 'Tidak ada data kelas yang ditemukan' });
        }

        res.status(200).json({ kelas: kelasData });
    } catch (error) {
        console.error('Error mendapatkan data kelas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getKelasWithDetails };
