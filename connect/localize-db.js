/*  Database identity when called.  */

const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '54321',
    database: 'company_db'
  }
);

module.exports = db;