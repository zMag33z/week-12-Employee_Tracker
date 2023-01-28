const db = require('../../../connect/localize-db');
require('console.table');


function viewalldepartments(){

    return db.promise()
    .query('SELECT * FROM department')
    .then(([collected]) => {
        return console.table(``, collected);
    })
    .catch(err => { console.log(err) });
    
}

module.exports = viewalldepartments;