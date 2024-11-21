const db = require('../config/db'); 
const { differenceInDays } = require('date-fns'); 


const getRequestKelasPrivat = async (req, res) => {
    try {
    
        const user = req.session.user;

        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        const [requests] = await db.query(
            `SELECT pelajaran.nama_matpel,
                    pengajar.nama AS nama_pengajar,
                    request_kelas_privat.tanggal_request,
                    request_kelas_privat.status_request
             FROM request_kelas_privat
             INNER JOIN pelajaran ON request_kelas_privat.id_matpel = pelajaran.id_matpel
             INNER JOIN pengajar ON request_kelas_privat.id_pengajar = pengajar.id_pengajar
             WHERE request_kelas_privat.id_siswa = ?`,
            [user.id_user]
        );

      
        const filteredRequests = requests.filter((request) => {

            if (request.status_request !== 'disetujui') {
                return true;
            }
            const requestDate = new Date(request.tanggal_request);
            const currentDate = new Date();
            const daysDifference = differenceInDays(currentDate, requestDate);


            return daysDifference <= 1;
        });

        res.status(200).json({ requests: filteredRequests });
    } catch (error) {
        console.error('Error mendapatkan data request kelas privat:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getRequestKelasPrivat };
