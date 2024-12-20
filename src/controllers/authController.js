const db = require('../config/db');
const bcrypt = require('bcrypt');
// Login
const login = async (req, res) => {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password harus diisi' });
    }

    try {
        // Cari user berdasarkan username
        const [userResult] = await db.query('SELECT * FROM user WHERE username = ?', [username]);

        if (userResult.length === 0) {
            return res.status(404).json({ message: 'Username tidak ditemukan' });
        }

        const user = userResult[0];

         //password check with bcrypt
        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatch) {
        //     return res.status(401).json({ message: 'Password salah' });
        // }

        // Password check (tanpa bcrypt, sesuai request sebelumnya)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Ambil nama berdasarkan role
        let namaUser = '';
        if (user.role === 'siswa') {
            const [siswaResult] = await db.query('SELECT nama FROM siswa WHERE id_siswa = ?', [user.id_user]);
            if (siswaResult.length > 0) {
                namaUser = siswaResult[0].nama;
            }
        } else if (user.role === 'pengajar') {
            const [pengajarResult] = await db.query('SELECT nama FROM pengajar WHERE id_pengajar = ?', [user.id_user]);
            if (pengajarResult.length > 0) {
                namaUser = pengajarResult[0].nama;
            }
        }

        // Simpan data user ke session, termasuk nama
        req.session.user = {
            id_user: user.id_user,
            username: user.username,
            role: user.role,
            nama: namaUser, // Tambahkan nama user
        };

        // Kirim respon berhasil
        res.status(200).json({ 
            message: 'Login berhasil', 
            user: req.session.user // Kirim data user ke frontend
        });
    } catch (error) {
        console.error('Error selama proses login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

// Logout
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal logout' });
        }
        res.clearCookie('session_cookie_name'); // Hapus cookie sesi
        res.status(200).json({ message: 'Logout berhasil' });
    });
};

// Validasi Sesi
const validateSession = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ 
            isAuthenticated: true, 
            user: req.session.user 
        });
    }
    res.status(401).json({ isAuthenticated: false });
};

module.exports = { login, logout, validateSession };
