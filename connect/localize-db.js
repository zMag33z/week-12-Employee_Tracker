const mysql = require('mysql2');
const startUp = require('../prompt/start-prompt');

// Use this connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '54321',
    database: 'company_db'
  }
);

// Connect to server
const connection = db.promise().connect((err) => {
  if(err) throw (err);
// Then continue.
}).then(() => { console.log(`Database Localized...\n`);
}).then(() => { startUp();
});

module.exports = { db , connection };
