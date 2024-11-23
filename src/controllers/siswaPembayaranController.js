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

const getHistoriPembayaran = async (req, res) => {
    try {
        const user = req.session.user; 
        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }
        const id_siswa = user.id_user; //id_siswa dari session

        //query untuk mendapatkan histori pembayaran berdasarkan id_siswa
        const [histori] = await db.query(
            `SELECT 
                tipe_kelas, 
                tipe_pembayaran, 
                jumlah, 
                DATE_FORMAT(waktu_tagihan, '%Y-%m-%d') AS waktu_tagihah,
                status 
             FROM pembayaran 
             WHERE id_siswa = ? 
             ORDER BY waktu_tagihan DESC`,
            [id_siswa]
        );

        if (histori.length === 0) {
            return res.status(404).json({ message: 'Tidak ada histori pembayaran untuk siswa ini' });
        }

        res.status(200).json({ histori });
    } catch (error) {
        console.error('Error mendapatkan histori pembayaran:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

//post method for upload image (still not implement yet)
const uploadBuktiToDatabase = async (req, res) => {
    try {
        const { id_pembayaran } = req.body;
        //validating file yang mau diupload
        if (!req.file) {
            return res.status(400).json({ message: 'File bukti pembayaran harus diunggah' });
        }
        //validating id_pembayaran
        if (!id_pembayaran) {
            return res.status(400).json({ message: 'id_pembayaran harus disertakan' });
        }

        //read file as a buffer
        const fileBuffer = fs.readFileSync(req.file.path);

        //update tipe_pembayaran menjadi 'transfer' dan simpan bukti pembayaran (binary data)
        const [result] = await db.query(
            `UPDATE pembayaran 
             SET tipe_pembayaran = 'transfer', bukti = ? 
             WHERE id_pembayaran = ?`,
            [fileBuffer, id_pembayaran]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pembayaran dengan id tersebut tidak ditemukan' });
        }

        //hapus file setelah disimpan ke database
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'Bukti pembayaran berhasil diunggah dan data diperbarui' });
    } catch (error) {
        console.error('Error menyimpan bukti pembayaran ke database:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};
module.exports = { getTagihanBySiswa,uploadBuktiToDatabase, getHistoriPembayaran };
