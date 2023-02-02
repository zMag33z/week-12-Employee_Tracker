const db = require('../../../connect/localize-db');

function viewalldepartments(){    
    return db.promise()
    .query('SELECT * FROM department;')
    .then(([collected]) => {
        return console.table(``, collected);
    })
    .catch(err => { console.log(err) });
}

function listAllDepartments(){
    return db.promise()
    .query(`SELECT * FROM department;`)
    .then(([collected]) => {
        let compile = collected.map((obj) => {
            let returnThis = obj.id + ' - ' + obj.department;
            return returnThis;
        })
        return compile;
    })
    .catch(err => { console.log(err) });
}


module.exports = {
    viewalldepartments: viewalldepartments,
    listAllDepartments: listAllDepartments
};