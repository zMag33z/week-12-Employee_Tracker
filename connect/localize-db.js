const mysql = require('mysql2');

// Use this connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '54321',
    database: 'company_db'
  }
);

module.exports = db;