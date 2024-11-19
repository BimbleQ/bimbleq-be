const mysql = require('mysql2');

// Buat koneksi pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.log('DB_PORT:', process.env.DB_PORT);
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_PASS:', process.env.DB_PASS);
        console.log('DB_NAME:', process.env.DB_NAME);

        return;
    }
    if (connection) connection.release();
    console.log('Database connected successfully!');
});

module.exports = { pool };

// Promisify query untuk mempermudah penggunaan async/await
const db = pool.promise();

module.exports = db;