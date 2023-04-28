const inquirer = require('inquirer');
const db = require('./config/connection');

db.connect(err => {
    console.log('Database connected.');
    tracker();
})

const tracker = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'prompt',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'Exit',
                ],
            }
        ]).then((response) => {
            if (response.prompt === 'View all departments') {
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    console.log('Viewing all departments');
                    console.table(result);
                    tracker();
                });
            } else if (response.prompt === 'View all roles') {
                db.query(`SELECT * FROM role`, (err, result) => {
                    if (err) throw err;
                    console.log('Viewing all roles');
                    console.table(result);
                    tracker();
                });
            } else if (response.prompt === 'View all employees') {
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) throw err;
                    console.log('Viewing all employees');
                    console.table(result);
                    tracker();
                });
            } else if (response.prompt === 'Add a department') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        } else {
                            console.log('Please add department');
                            return false;
                        }
                     }
                    
                }]).then((response) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [response.department], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${response.department} to the database.`);
                        tracker();
                    })
                })
            }
        })};