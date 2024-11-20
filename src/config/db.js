const mysql = require('mysql2');

//create pool connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
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

//promisify query untuk mempermudah penggunaan async/await
const db = pool.promise();

//error handling
pool.on('error', (err) => {
    console.error('Error koneksi pool:', err.code);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Koneksi database terputus. Membuka ulang koneksi...');
    } else if (err.code === 'ECONNRESET') {
        console.error('Koneksi terputus secara mendadak.');
    } else {
        console.error('Error lainnya:', err);
    }
});

module.exports = db;