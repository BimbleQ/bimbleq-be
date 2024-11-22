const db = require('../config/db'); 

//list pengajar based on id_matpel
const getPengajarByMataPelajaran = async (req, res) => {
    const { id_matpel } = req.query; //use id_matpel dari query string

    if (!id_matpel) {
        return res.status(400).json({ message: 'id_matpel harus disertakan' });
    }

    try {
        const [pengajar] = await db.query(
            `SELECT id_pengajar, nama FROM pengajar WHERE id_matpel = ?`,
            [id_matpel]
        );

        if (pengajar.length === 0) {
            return res.status(404).json({ message: 'Tidak ada pengajar untuk mata pelajaran ini' });
        }

        res.status(200).json({ pengajar });
    } catch (error) {
        console.error('Error mendapatkan data pengajar:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getPengajarByMataPelajaran };
