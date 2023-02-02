const db = require("../../../connect/localize-db");

function addanemployee(inputInformation, input){
    // SELF TEST FOR OUTPUT:
    // console.log('object add',input, '\n\x1b[33mminformation\x1b[0m\n', inputInformation);
    
    // if(!input.manager){
    // console.log('\n\x1b[33mEXPECTATION:\n    Non-Manager:\x1b[0m\n', '\x1b[32mfirst name\x1b[0m\n', inputInformation[0],'\n\x1b[32mlast name\x1b[0m\n', inputInformation[1], '\n\x1b[32mroleID\x1b[0m\n', inputInformation[2], '\n\x1b[32mmanagerID\x1b[0m\n', inputInformation[3]);
    // }else{
    //     console.log('\n\x1b[33mEXPECTATION:\n    Manager:\x1b[0m\n', '\x1b[32mfirst name\x1b[0m\n', inputInformation[0],'\n\x1b[32mlast name\x1b[0m\n', inputInformation[1], '\n\x1b[32mroleID\x1b[0m\n', inputInformation[2]);
    // }

    let query;

    if(!input.manager){
        query = `
        INSERT INTO employee (
            first_name,
            last_name, 
            role_id, 
            manager_id, 
            is_manager)
            VALUES (?, ?, ?, ?, 0)
        `;
    }else{
        query = `INSERT INTO employee (
            first_name,
            last_name, 
            role_id, 
            manager_id, 
            is_manager)
            VALUES (?, ?, ?, null, 1)`
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

