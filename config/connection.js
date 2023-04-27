const mysql = require('mysql2');

//require('dotenv').config(); if time come back to protect passwords



const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'RamRam!6',
        database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db')
);

module.exports = db;

