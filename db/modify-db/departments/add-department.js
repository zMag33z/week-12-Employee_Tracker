const db = require("../../../connect/localize-db");

function addadepartment(inputInformation){
    return db.promise()
    .query('INSERT INTO department (department) VALUES (?)', inputInformation)
    .then(([collected]) => {
        return console.log('\n\x1b[32m Department Added \x1b[0m\n');
        })
    .catch(err => { console.log('test',err) 
    });
}

module.exports = addadepartment;