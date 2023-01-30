const inquirer = require('inquirer');

// need to refractor to another file just to empty the area here.
const viewalldepartments = require('../db/query-db/departments/view');
const viewallroles = require('../db/query-db/roles/view');
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

const pullDeptList = async () => {
    await viewalldepartments();
    return;
};

const pullRoleList = async () => {
    await viewallroles();
    return;
};

const pullManagerList = async () => {
    await viewallmanagers();
    return;
}

const verifyID = input => {
    let numeric = /^-?\d+$/.test(input);
    let negative = input <= 0;
    while(!numeric || negative){
        console.log(`\n\x1b[41m\x1b[90m Enter A Number \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};

const notID = (input, previous) => {
    let numeric = /^-?\d+$/.test(input);
    let negative = input <= 0;
    if(!numeric || negative){
        input = '';
        return input;
    }
    previous.add = previous.add + `, ` + input;
                return input;
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
    previous.add = previous.add + `, ` + input;
                return input;
};

const employeeTypeList = (input, previous) => {
    if(previous.manager === true){
        
    }
    if(previous.manager === false){
        
    }
}

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
            message: 'Enter id # of Department for New Role.\n',
            type: 'input',
            default: pullDeptList,
            validate: verifyID,
            filter: notID,
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
        {   //employee start
            when: input => input.query === 'Add An Employee',
            name: 'manager',
            message: 'Is this Employee A Manager?',
            type: 'confirm',
            filter: input => {
                switch(input){
                    case true: {
                        input = 1;
                        break;
                    }
                    case false: {
                        input = 0;
                        break;
                    }
                };
                return input;
            }
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
        {
            when: input => input.query === 'Add An Employee',
            name: 'addRole',
            message: `Enter Department Role Id for New Employee.\n`,
            type: 'input',
            default: pullRoleList,
            validate: verifyID,
            filter: notID,
        }
        ,
        {
            when: input => input.manager === false,
            name: 'addManager',
            message: 'Enter Manager Id over New Employee.\n',
            type: 'input',
            default: pullManagerList,
            validate: verifyID,
            filter: notID,
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
                selection = input.query.split(' ').join('').toLowerCase() + `(inputInformation)`;
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