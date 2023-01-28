const db = require('./localize-db');
const startUp = require('../prompt/start-prompt');

// Connect to server
const connection = db.promise().connect((err) => {
    if(err) throw (err);
  // Then continue.
  }).then(() => { console.log(`Database Localized...\n`);
  }).then(() => { startUp();
  });

  module.exports = connection;