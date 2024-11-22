
const isSiswa = (req, res, next) => {
    const user = req.session.user;

    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan' });
    }

    next();
};

module.exports = isSiswa ;
