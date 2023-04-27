

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Peter', 'Griffin', 1, NULL),
    ('Micheal', 'Scott', 2, 1),
    ('Homer', 'Simpson', 3, NULL),
    ('Ron', 'Swanson', 4, 3),
    ('Leslie', 'Knope', 5, NULL),
    ('Dennis', 'Reynolds', 6, 5),
    ('Jim', 'Halpert', 7, NULL),
    ('April', 'Ludgate', 8, 7);
    