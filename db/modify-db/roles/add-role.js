const db = require("../../../connect/localize-db");

function addarole(inputInformation){

    console.log('add', inputInformation);
        // return db.promise()
        // .query('INSERT INTO role (title, dept_id, salary) VALUES (?, ?, ?)', inputInformation)
        // .then(([collected]) => {
        //     return console.table(``, collected);
        // })
        // .catch(err => { console.log('test',err) 
        // });
}

module.exports = addarole;