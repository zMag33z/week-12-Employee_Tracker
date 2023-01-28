const inquirer = require('inquirer');
const viewalldepartments = require('../db/query-db/departments/view');
const viewallroles = require('../db/query-db/roles/view');
const viewallemployees = require('../db/query-db/employees/view');
const logout = require('../disconnect/disconnect');


function startUp(){
    inquirer.prompt([
        {
        name: 'query',
        message: 'What would you like to do?',
        type: 'list',
        choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee',
                    'Log Out'
                ]
        }
    ]).then(async function(input){
        let selection = input.query.split(' ').join('').toLowerCase() + '()';

        await eval(selection);

        startUp();
    });


}


module.exports = startUp;