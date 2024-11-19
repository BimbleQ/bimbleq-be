const mysql = require('mysql2');

// Buat koneksi pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export promisified pool untuk query async
const db = pool.promise();

module.exports = db;
