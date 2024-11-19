// Load environment variables from .env
require('dotenv').config();
 
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

// Inisialisasi aplikasi
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Konfigurasi session
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
        },
    })
);

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;
