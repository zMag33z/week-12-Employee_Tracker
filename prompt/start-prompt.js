//  Welcome to yet another mess.
const inquirer = require('inquirer');

// need to refractor to another file just to empty the area here.  Honestly need to redo the whole thing.
const { viewalldepartments, listAllDepartments } = require('../db/query-db/departments/view');
const { viewallroles, viewSpecificRoles } = require('../db/query-db/roles/view');
const { viewallemployees, listNONmanagers, listManagers } = require('../db/query-db/employees/view');
const addadepartment = require('../db/modify-db/departments/add-department');
const addarole = require('../db/modify-db/roles/add-role');
const addanemployee = require('../db/modify-db/employees/add-employee');
const updateanemployee = require('../db/modify-db/employees/update-employee');
const logout = require('../disconnect/disconnect');

// validation-filter properties.
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

// salary is in the role table and has other values needing tallying
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

// Prompts set to only message when: previous prompt meets set value.  Future note: Look into inquirer-loop to reduce when instances.
function startUp(){
    inquirer.prompt([
        {
        name: 'query',
        message: 'What would you like to do?',
        type: 'list',
        default: () => console.log(`\x1b[33m*Use caution:\x1b[0m
    \x1b[36mFor BEST list display and Database accuracy
    Add a New Manager Role OR Demote Manager from current Role
    'Before'
    Adding a New Manager OR Promoting another Employee to Manager
    \x1b[0m`),
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
        {   // Department
            when: input => input.query === 'Add A Department',
            name: 'add',
            message: `Enter name for New Department.\n`,
            type: 'input',
            validate: requireInput,
        }
        ,
        {   // Role start
            when: input => input.query === 'Add A Role',
            name: 'manager',
            message: 'Is this a Manager role?\n',
            type: 'confirm',
        }
        ,
        {   
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
                let idOnly = input.split(' ')[0];
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
        {   // manager
            when: input => input.query === 'Add An Employee',
            name: 'addRole',
            message: `Select Department Role Id for New Employee.`,
            type: 'list',
            choices: input => viewSpecificRoles(input),
            filter: (input, previous) => {
                let idOnly = input.split(' ')[0];
                    previous.add = previous.add + ', ' + idOnly;
                return input;
            }
        }
        ,
        {   // not manager 
            when: input => input.manager === false,
            name: 'addManager',
            message: 'Select Manager Id over New Employee.',
            type: 'list',
            choices: listManagers,

            filter: (input, previous) => {
                let idOnly = input.split(' ')[0];
                previous.add = previous.add + ', ' + idOnly;
                return;
            }
        }
        ,
        {   // Update employee
            when: input => input.query === 'Update An Employee',
            name: 'manager',
            message: 'Is this Employee A Manager?',
            type: 'confirm',
        }
        ,
        {   // need to refactor this quest and the next because the list functions parameter values
            when: input => input.manager === true,
            name: 'add',
            message: 'Select Id of Employee to Update',
            type: 'list',
            choices: listManagers,
        }
        ,
        {
            when: input => input.manager === false,
            name: 'add',
            message: 'Select Id of Employee to Update',
            type: 'list',
            choices: listNONmanagers,
        }
        ,
        {
            when: input => input.query === 'Update An Employee',
            name: 'motion',
            message: 'Select Promotion, Demotion, or Role Change',
            type: 'list',
            choices: ['Promotion', 'Demotion', 'Role Change'],
            filter: (input, previous) => {
                if(input === 'Promotion'){
                    previous.manager = true;
                }else{
                    previous.manager = false;
                }
                return input;
            }
        }
        ,
        {
            when: input => input.query === 'Update An Employee',
            name: 'newRoleID',
            message: 'Select Id Role to Update Employee',
            type: 'list',
            choices: input => viewSpecificRoles(input),
            filter: (input, previous) => {
                if(previous.motion === 'Promotion'){

                    previous.add = input.split(' ')[0] + ', ' + previous.add.split(' ')[0];
                }
                return input;
            }
        }
        ,
        {
            when: input => input.motion === 'Demotion' || input.motion === 'Role Change',
            name: 'addManager',
            message: 'Select new Manager Id over Updated Employee',
            type: 'list',
            choices: listManagers,
            filter: (input, previous) => {
                let roleId = previous.newRoleID.split(' ')[0];
                previous.add = roleId + ', ' + input.split(' ')[0] + ', ' + previous.add.split(' ')[0];
            }
        }
    ]).then(async function(input){
        // console.log('\x1b[31mCHECKING FOR ENTRANCE\x1b[0m');

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
            case 'Add An Employee':
            case 'Update An Employee': {
                inputInformation = input.add.split(', ');
                selection = input.query.split(' ').join('').toLowerCase() + `(inputInformation, input)`;
                break;
            }
        }
        // eval turns string into function
        await eval(selection);
        // console.log('\x1b[31mCHECKING FOR EXIT\x1b[0m');
        startUp();
    });
}


module.exports = startUp;


/*  zMaG33z  */