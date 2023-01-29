const db = require("../../../connect/localize-db");

function addarole(inputInformation){

    console.log('add role');

    // console.log('end', inputInformation.split(' '));
        // return db.promise()
        // .query('INSERT INTO department (department) VALUES (?)', inputInformation)
        // .then(([collected]) => {
        //     return console.table(``, collected);
        // })
        // .catch(err => { console.log('test',err) 
        // });
}

module.exports = addarole;