const db = require('../../../connect/localize-db');

function viewallroles(){
    return db.promise()
    .query(`
SELECT r.id, r.title, d.department, r.salary
FROM role r
JOIN department d ON r.dept_id = d.id;`)
    .then(([collected]) => {
        return console.table(``, collected);
    })
    .catch(err => { console.log(err) });
};

function viewSpecificRoles(input){
    let query;
    if(!input.manager){
        query = `
SELECT r.id, r.title, d.department
FROM role r
LEFT JOIN department d ON r.dept_id = d.id
WHERE manager_role = 0 IN (SELECT id FROM role);`;
    }else{
        query = `
SELECT r.id, r.title, d.department
FROM role r
LEFT JOIN department d ON r.dept_id = d.id
WHERE manager_role = 1 IN (SELECT id FROM role);`;
    }

    return db.promise()
    .query(query)
    .then(([collected]) => {
        let compile = collected.map((obj) => {
            let returnThis = obj.id + ' - ' + obj.title + ' - ' + obj.department;
            return returnThis;
        })
        return compile;
    })
    .catch(err => { console.log(err) });
}



module.exports = {
    viewallroles: viewallroles,
    viewSpecificRoles: viewSpecificRoles
};