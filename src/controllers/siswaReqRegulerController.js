const db = require('../config/db');

const postRequestKelasReguler = async (req, res) => {
    const { id_siswa, id_pertemuan_lama, id_pertemuan_baru, alasan } = req.body;

    if (!id_siswa || !id_pertemuan_lama || !id_pertemuan_baru || !alasan) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO request_kelas_reguler (id_siswa, id_pertemuan_lama, id_pertemuan_baru, status_request, tanggal_request, alasan)
             VALUES (?, ?, ?, ?, NOW(), ?)`,
            [id_siswa, id_pertemuan_lama, id_pertemuan_baru, 'pending', alasan]
        );

        res.status(201).json({ message: 'Request perubahan jadwal berhasil dibuat', id_request_reguler: result.insertId });
    } catch (error) {
        console.error('Error menyimpan data request perubahan jadwal:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { postRequestKelasReguler };