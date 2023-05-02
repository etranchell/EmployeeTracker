const inquirer = require('inquirer');
const db = require('./config/connection');


db.connect(err => {
    if (err) throw err;
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
                    // 'Delete a department',
                    // 'Delete a role',
                    // 'Delete an employee',
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
                    });
                })
            } else if (response.prompt === 'Add a role') {
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'New role name',
                                validate: roleInput => {
                                    if (roleInput) {
                                        return true;

                                    } else {
                                        console.log('Please add a role');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'Salary of new role',
                                validate: salaryInput => {
                                    if (salaryInput) {
                                        return true;
                                    } else {
                                        console.log('Add a salary');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                name: 'department',
                                message: 'Add new role to which department?',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].name);
                                    }
                                    return array;
                                }
                            }
                        ]).then((response) => {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].name === response.department) {
                                    var department = result[i];
                                }
                            }
                            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [response.role, response.salary, department.id], (err, result) => {
                                if (err) throw err;
                                console.log(`Added ${response.role} to the database`)
                                tracker();
                            });
                        })
                });
            } else if (response.prompt === 'Add an employee') {
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'New employees first name?',
                                validate: firstNameInput => {
                                    if (firstNameInput) {
                                        return true;
                                    } else {
                                        console.log('Add first name');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'New employees last name?',
                                validate: lastNameInput => {
                                    if (lastNameInput) {
                                        return true;
                                    } else {
                                        console.log('Add last name');
                                        return false;
                                    }
                                }
                            },

                            {
                                type: 'list',
                                name: 'role',
                                message: 'New employee role',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].title);
                                    }
                                    var newArray = [...new Set(array)];
                                    return newArray;
                                }
                            },
                            {
                                type: 'input',
                                name: 'managerId',
                                message: 'New employee manager id',
                                validate: managerInput => {
                                    if (managerInput) {
                                        return true;

                                    } else {
                                        console.log('Add a manager id');
                                        return false;
                                    }
                                }
                            }
                        ]).then((response) => {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].title === response.role) {
                                    var role = result[i];
                                }
                            }
                            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [response.firstName, response.lastName, role.id, response.managerId], (err, result) => {
                                if (err) throw err;
                                console.log(`Added ${response.firstName} ${response.lastName} to database`)
                                tracker();
                            });
                        })
                });
            } else if (response.prompt === 'Update an employee role') {
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employee',
                                message: 'Which employees role do you want to update?',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].last_name);
                                    }
                                    var employeeArray = [...new Set(array)];
                                    return employeeArray;
                                }
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: 'What is their new role?',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].title);
                                    }
                                    var newArray = [...new Set(array)];
                                    return newArray;
                                }
                            }
                        ]).then((response) => {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].last_name === response.employee) {
                                    var name = result[i];
                                }
                            }

                            for (var i = 0; i < result.length; i++) {
                                if (result[i].title === response.role) {
                                    var role = result[i];
                                }
                            }

                            db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: role }, { last_name: name }], (err, result) => {
                                if (err) throw err;
                                console.log(`Updated ${response.employee} role to the database.`)
                                tracker();
                            });
                        })
                });
            } else if (response.prompt === 'Exit') {
                db.end();
                console.log("Good-Bye!");
            }
        })
};
