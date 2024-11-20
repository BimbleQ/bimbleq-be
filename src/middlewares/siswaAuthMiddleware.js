const isAuthenticated = (req, res, next) => {
    // Periksa apakah sesi user ada
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Anda harus login terlebih dahulu' });
    }
    next();
};

const isSiswa = (req, res, next) => {
    const user = req.session.user;

    // Validasi apakah role user adalah "siswa"
    if (user.role !== 'siswa') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya siswa yang diizinkan' });
    }

    next();
};

module.exports = { isAuthenticated, isSiswa };
