/*  CONNECT app to database  */

const db = require('./localize-db');
const startUp = require('../prompt/start-prompt');

const connection = db.promise().connect((err) => {
    if(err) throw (err);
  }).then(() => { console.log(`Database Localized...\n`);
  }).then(() => { startUp();
});

  module.exports = connection;