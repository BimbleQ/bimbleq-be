const isPengajar = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'pengajar') {
        return res.status(403).json({ message: 'Akses hanya untuk pengajar' });
    }

    next();
};

module.exports = isPengajar;
