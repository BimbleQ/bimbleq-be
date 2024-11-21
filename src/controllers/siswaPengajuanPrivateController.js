const db = require('../config/db'); // Import koneksi database

// Mendapatkan data request kelas privat
const getRequestKelasPrivat = async (req, res) => {
    try {
        // Ambil user dari session
        const user = req.session.user;

        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        // Query sederhana untuk mendapatkan semua data request
        const [requests] = await db.query(
            `SELECT pelajaran.nama_matpel,
                    pengajar.nama AS nama_pengajar,
                    request_kelas_privat.tanggal_request,
                    request_kelas_privat.status_request
             FROM request_kelas_privat
             INNER JOIN pelajaran ON request_kelas_privat.id_matpel = pelajaran.id_matpel
             INNER JOIN pengajar ON request_kelas_privat.id_pengajar = pengajar.id_user
             WHERE request_kelas_privat.id_user = ?`,
            [user.id_user]
        );

        // Proses data dengan JavaScript
        const filteredRequests = requests.filter((request) => {
            // Jika status_request bukan 'disetujui', data tetap ditampilkan
            if (request.status_request !== 'disetujui') {
                return true;
            }

            // Jika status_request adalah 'disetujui', cek apakah masih dalam 1 hari
            const requestDate = new Date(request.tanggal_request);
            const currentDate = new Date();

            // Hitung selisih waktu (dalam milidetik)
            const timeDifference = currentDate - requestDate;

            // Konversi milidetik ke hari (1 hari = 86400000 ms)
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

            // Hanya tampilkan jika selisih hari ≤ 1
            return daysDifference <= 1;
        });

        // Kirim data ke frontend
        res.status(200).json({ requests: filteredRequests });
    } catch (error) {
        console.error('Error mendapatkan data request kelas privat:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getRequestKelasPrivat };
