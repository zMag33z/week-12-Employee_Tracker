const db = require("../../../connect/localize-db");

function addanemployee(inputInformation){
        console.log('add', inputInformation);

    // console.log(inputInformation);
        // return db.promise()
        // .query('INSERT INTO department (department) VALUES (?)', inputInformation)
        // .then(([collected]) => {
        //     return console.table(``, collected);
        // })
        // .catch(err => { console.log('test',err) 
        // });
}

module.exports = addanemployee;