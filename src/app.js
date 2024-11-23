//load environment variables from .env
require('dotenv').config();
 
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const siswaRoutes = require('./routes/siswaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pengajarRoutes = require('./routes/pengajarRoutes');
const db = require('./config/db');
const cors = require('cors');
//is app running on HTTPS?
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session configuration
const sessionStore = new MySQLStore({}, db.pool);
app.use(
    session({
        key: 'session_cookie_name',
        secret: 'your_secret_key',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 hari
            sameSite: isProduction ? 'None' : 'Lax', // 'None' untuk produksi, 'Lax' untuk lokal
            secure: isProduction, // Hanya true jika di produksi (HTTPS)
        },
    })
);

app.use(cors({
    origin: 'http://localhost:5173', //url fe
    credentials: true,
}));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/siswa', siswaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pengajar', pengajarRoutes);

module.exports = app;
