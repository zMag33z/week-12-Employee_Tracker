const inquirer = require('inquirer');

// need to refractor to another file just to empty the area here.
const { viewalldepartments, listAllDepartments } = require('../db/query-db/departments/view');
const { viewallroles, viewSpecificRoles } = require('../db/query-db/roles/view');
const { viewallemployees, viewallmanagers } = require('../db/query-db/employees/view');
const addadepartment = require('../db/modify-db/departments/add-department');
const addarole = require('../db/modify-db/roles/add-role');
const addanemployee = require('../db/modify-db/employees/add-employee');
const logout = require('../disconnect/disconnect');


// validation-filter properties.     Note: just found loop for inquirer.  useful for future use when gathering multiple inputs needed separately.
const requireInput = (input) => {
    while(input.length === 0){
        console.log(`\n\x1b[41m\x1b[90m Input Required \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};

const isSalary = (input) => {
    let length = input.length >= 5;
    let numeric = /^-?\d+$/.test(input);
    let negative = input <= 0;

    while(!length || !numeric || negative){
        console.log(`\n\x1b[41m\x1b[90m Enter 5 digit Salary. \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};

const notSalary = (input, previous) => {
    let length = input.length >= 5;
    let numeric = /^-?\d+$/.test(input);
    let negative = input <= 0;
    if(!length || !numeric || negative){
        input = '';
        return input;
    }
    if(previous.manager === true){
        previous.manager = 1;
    }else{
        previous.manager = 0;
    }

    previous.add = previous.add + `, ` + input + ', ' + previous.manager;
                return input;
};

// Prompts set to only message when: previous prompt meets set value.
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
            name: 'add',
            message: `Enter name for New Department.\n`,
            type: 'input',
            validate: requireInput,
        }
        ,
        {
            when: input => input.query === 'Add A Role',
            name: 'manager',
            message: 'Is this a Manager role?\n',
            type: 'confirm',
        }
        ,
        {   // Role start
            when: input => input.query === 'Add A Role',
            name: 'add',
            message: 'Enter name of New Role.\n',
            type: 'input',
            validate: requireInput,
        }
        ,
        {
            when: input => input.query === 'Add A Role',
            name: 'addThis',
            message: 'Select id # of Department for New Role.',
            type: 'list',
            choices: listAllDepartments,
            filter: (input, previous) => {
                let idOnly = input.charAt(0);
                previous.add = previous.add + ', ' + idOnly;
                return;
            }
        }
        ,
        {
            when: input => input.query === 'Add A Role',
            name: 'addThat',
            message: 'Enter salary amount for New Role.\n',
            type: 'input',
            validate: isSalary,
            filter: notSalary,
        }
        ,
        {   //employee start - two types: manager, regular
            when: input => input.query === 'Add An Employee',
            name: 'manager',
            message: 'Is this Employee A Manager?',
            type: 'confirm',
        }
        ,
        {
            when: input => input.query === 'Add An Employee',
            name: 'add',
            message: 'Enter first name of New Employee.\n',
            type: 'input',
            validate: requireInput,
        }
        ,
        {
            when: input => input.query === 'Add An Employee',
            name: 'addLast',
            message: 'Enter last name of New Employee.\n',
            type: 'input',
            validate: requireInput,
            filter: (input, previous) => {
                previous.add = previous.add + `, ` + input;
                return input;
            }
        }
        ,
        {   // check employee type
            when: input => input.query === 'Add An Employee',
            name: 'addRole',
            message: `Select Department Role Id for New Employee.`,
            type: 'list',
            choices: input => viewSpecificRoles(input),
            filter: (input, previous) => {
                let idOnly = input.charAt(0);
                previous.add = previous.add + ', ' + idOnly;
                if(previous.manager === true){
                    let manager = 1;
                    previous.add = previous.add + ', ' + manager;
                }
                return;
            }
        }
        ,
        {   // if not manager 
            when: input => input.manager === false,
            name: 'addManager',
            message: 'Select Manager Id over New Employee.',
            type: 'list',
            choices: viewallmanagers,
            filter: (input, previous) => {
                let idOnly = input.charAt(0);
                let notManager = 0;
                previous.add = previous.add + ', ' + idOnly + ', ' + notManager;
                return;
            },
        }
    ]).then(async function(input){



        // Switch statement, variables, strings to function for eval: depending on prompt instances.
        let selection = input.query;
        let inputInformation;

    


        switch(selection){
            case 'View All Departments':
            case 'View All Roles':
            case 'View All Employees':
            case 'Log Out': {
                selection = input.query.split(' ').join('').toLowerCase() + '()';
                break;
            }
            case 'Add A Department':
            case 'Add A Role':
            case 'Add An Employee': {
                inputInformation = input.add.split(', ');
                selection = input.query.split(' ').join('').toLowerCase() + `(inputInformation, input)`;
                break;
            }
            // case ``:{

            //     break;
            // }
        }
        // eval turns string into function
        await eval(selection);
        startUp();
    });
}


module.exports = startUp;


/*  zMaG33z  */