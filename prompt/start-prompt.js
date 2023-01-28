
const inquirer = require('inquirer');
const view = require('../handler/query');
require('console.table');

function startUp(){
    inquirer.prompt([
        {
        name: 'query',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee', 'Log Out']
        }
    ]).then((input) => {
        let queryType = input.query.split(' ').join('').toLowerCase();
        console.log(queryType);
});
}


module.exports = startUp;