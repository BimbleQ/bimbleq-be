const db = require('../config/db'); 
const { differenceInDays } = require('date-fns'); 


const getRequestPindahKelas = async (req, res) => {
    try {
    
        const user = req.session.user;

        if (!user || user.role !== 'siswa') {
            return res.status(403).json({ message: 'Akses hanya untuk siswa' });
        }

        const [requests] = await db.query(
            ``,
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
        console.error('Error mendapatkan data request perpindahan kelas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getRequestPindahKelas };
