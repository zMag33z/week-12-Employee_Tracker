const inquirer = require('inquirer');

// need to refractor to another file just to empty the area here.
const viewalldepartments = require('../db/query-db/departments/view');
const viewallroles = require('../db/query-db/roles/view');
const viewallemployees = require('../db/query-db/employees/view');
const addadepartment = require('../db/modify-db/departments/add-department');
const logout = require('../disconnect/disconnect');

// validation-filter properties.
const requireInput = input => {
    while(input.length === 0){
        console.log(`\n\x1b[41m\x1b[90m Input Required \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};

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
        ,
        {
            when: input => input.query === 'Add A Department',
            name: 'addDept',
            message: 'Enter name for New Department.',
            type: 'input',
            validate: requireInput,
        }
    ]).then(async function(input){

        let selection = input.query;
        let newDeptName;



        switch(selection){       // Switch value depending on selection.
            case 'View All Departments':
            case 'View All Roles':
            case 'View All Employees': {
                selection = input.query.split(' ').join('').toLowerCase() + '()';
                break;
            }
            case 'Add A Department': {
                newDeptName = input.addDept;
                console.log('switch', newDeptName, input.addDept);
                selection = input.query.split(' ').join('').toLowerCase() + `(newDeptName)`;
                break;
            }
            // case ``:{

            //     break;
            // }
        }
        await eval(selection);
        startUp();
    });

}


module.exports = startUp;