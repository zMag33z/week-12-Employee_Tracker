const db = require("../../../connect/localize-db");

function addarole(inputInformation){
        return db.promise()
        .query('INSERT INTO role (title, dept_id, salary, manager_role) VALUES (?, ?, ?, ?)', inputInformation)
        .then(([collected]) => {
            return console.log('\n\x1b[32m Role Added \x1b[0m\n');
        })
        .catch(err => { console.log('test',err)
        });
}

module.exports = addarole;