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
}

module.exports = viewallroles;