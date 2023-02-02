/*  CONNECT app to database  */
require('console.table');
const db = require('./localize-db');
const startUp = require('../prompt/start-prompt');

const connection = db.promise().connect((err) => {
    if(err) throw (err);
  }).then(() => {
    console.log(`Database Localized...\n`);
  }).then(() => {
    console.log(`\x1b[33m*Use caution:\x1b[0m
      \x1b[36mFor BEST list display and Database accuracy
      Add a New Manager Role OR Demote Manager from current Role
      'Before'
      Adding a New Manager OR Promoting another Employee to Manager
      \x1b[0m`)
  }).then(() => { startUp();
});

  module.exports = connection;