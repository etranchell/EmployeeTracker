// const Sequelize = require('sequelize');

// require('dotenv').config();

// const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );

// module.exports = db;

const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    // {
    //     host: 'localhost',
    //     dialect: 'mysql',
    //     port: 3306
    // }


    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'RamRam!6',
        database: 'employee_tracker_db'
      },
);

module.exports = db;

