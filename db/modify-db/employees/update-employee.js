const db = require("../../../connect/localize-db");

function updateanemployee(inputInformation, input){
    // SELF TEST FOR OUTPUT:
    // console.log('object update',input, '\x1b[33minformation\x1b[0m', inputInformation);
    // if(!input.manager){
    // console.log('\n\x1b[33mEXPECTATION:\n    Non-Manager:\x1b[0m\n', '\n\x1b[32mroleID\x1b[0m\n', inputInformation[0],'\n\x1b[32mmanagerID\x1b[0m\n', inputInformation[1], '\n\x1b[32memployeeID\x1b[0m\n', inputInformation[2]);
    // }else{
    //     console.log('\n\x1b[33mEXPECTATION:\n    Manager:\x1b[0m\n', '\n\x1b[32mroleID\x1b[0m\n', inputInformation[0],'\n\x1b[32memployeeID\x1b[0m\n', inputInformation[1]);  
    // }

    // let thisthing = input.motion === 'Promotion' || 'Role Change';
    // console.log('\n\x1b[33mEXPECTATION:\n    uknown:\x1b[0m\n', thisthing, '\n');

    let update;

    if(input.motion === 'Demotion' || input.motion === 'Role Change'){
        update = `
        UPDATE employee SET role_id = ?, manager_id = ?, is_manager = 0 WHERE id = ?;
        `;
    }else{
        update = `
        UPDATE employee SET role_id = ?, manager_id = null, is_manager = 1 WHERE id = ?;
        `;
    }
    
    return db.promise()
    .query(update, inputInformation)
    .then(([collected]) => {
        return console.log('\n\x1b[32m Employee Updated \x1b[0m\n');
        })
    .catch(err => { console.log('test',err) 
    });
}

module.exports = updateanemployee;