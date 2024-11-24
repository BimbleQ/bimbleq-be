const db = require('../config/db');

const postRequestKelasReguler = async (req, res) => {
    const { id_siswa, id_pertemuan_lama, id_pertemuan_baru, note } = req.body;

    if (!id_siswa || !id_pertemuan_lama || !id_pertemuan_baru || !note) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    try {
        // Ambil tanggal sekarang
        const tanggalRequest = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Simpan data ke database
        const [result] = await db.query(
            `INSERT INTO request_kelas_reguler (id_siswa, id_pertemuan_lama, id_pertemuan_baru, status_request, tanggal_request, note)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id_siswa, id_pertemuan_lama, id_pertemuan_baru, 'pending', tanggalRequest, note]
        );

        res.status(201).json({ 
            message: 'Request perubahan jadwal berhasil dibuat', 
            id_request_reguler: result.insertId 
        });
    } catch (error) {
        console.error('Error menyimpan data request perubahan jadwal:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};


module.exports = { postRequestKelasReguler };