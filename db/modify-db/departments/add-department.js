const db = require("../../../connect/localize-db");

function addadepartment(newDeptName){
        return db.promise()
        .query('INSERT INTO department (department) VALUES (?)', newDeptName)
        .then(([collected]) => {
            return console.table(``, collected);
        })
        .catch(err => { console.log('test',err) 
        });
}

module.exports = addadepartment;