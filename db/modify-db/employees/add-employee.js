const db = require("../../../connect/localize-db");

function addanemployee(inputInformation, input){
    let query;

    if(!input.manager){
        query = `
        INSERT INTO employee (
            first_name,
            last_name, 
            role_id, 
            manager_id, 
            is_manager)
            VALUES (?, ?, ?, ?, ?)
        `;
    }else{
        query = `INSERT INTO employee (
            first_name,
            last_name, 
            role_id, 
            manager_id, 
            is_manager)
            VALUES (?, ?, ?, null, ?)`
    }
    return db.promise()
    .query(query, inputInformation)
    .then(([collected]) => {
        return console.log('\n\x1b[32m Employee Added \x1b[0m\n');
    })
    .catch(err => { console.log('test',err) 
    });
}

module.exports = addanemployee;

