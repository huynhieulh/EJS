const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // or your MySQL server host
    user: 'admin',
    password: 'Lehieu$3022',
    database: 'sql_store',
    waitForConnections: true,
    connectionLimit: 10, // You can adjust this according to your needs
    queueLimit: 0
  });
  
module.exports = pool