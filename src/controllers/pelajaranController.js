const db = require('../config/db'); 

const getMataPelajaran = async (req, res) => {
    try {
        const [mataPelajaran] = await db.query(
            `SELECT id_matpel, nama_matpel FROM pelajaran`
        );
        res.status(200).json({ mataPelajaran });
    } catch (error) {
        console.error('Error mendapatkan data mata pelajaran:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getMataPelajaran };
