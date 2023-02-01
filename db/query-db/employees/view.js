const db = require("../../../connect/localize-db");

function viewallemployees(){    
    return db.promise()
    .query(`
SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee, r.title, d.department, r.salary,CONCAT (m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d on d.id = r.dept_id
LEFT JOIN employee m ON m.id = e.manager_id;`)
    .then(([collected]) => {
        return console.table(``, collected);
    })
    .catch(err => { console.log(err) });
};

function viewallmanagers(){
    return db.promise()
    .query(`
SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS manager, d.department, r.title
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d on d.id = r.dept_id
WHERE is_manager = 1 IN (SELECT id FROM employee);
`)
    .then(([collected]) => {
        let compile = collected.map((obj) => {
            let returnThis = obj.id + ' - ' + obj.manager + ' - ' + obj.department;
            return returnThis;
        })
        return compile;

    })
    .catch(err => { console.log(err) });
}



module.exports = {
    viewallemployees: viewallemployees,
     viewallmanagers: viewallmanagers,
    
    };
