
const isSiswa = (req, res, next) => {
    const user = req.session.user;

    //validasi apakah role user adalah "siswa"
    if (user.role !== 'siswa') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya siswa yang diizinkan' });
    }

    next();
};

module.exports = isSiswa ;
