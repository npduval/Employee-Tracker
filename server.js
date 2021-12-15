const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log('Connected to the database')
  );

const initialQ = () => {
    inquirer.prompt([
            {
                type: 'list',
                name: 'inital',
                message: 'What would you like to do?',
                choices: [  
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
                ]
            },
            
        ])

    .then((responce) => {
        const { choices } = responce;
        //TODO if else or switch stament for all options to detemine next steps
        if (choices === "View All Employees") {
            allEmployees();
        }
        if (choices === "Add Employee") {
            addEmployee();
        }
        if (choices === "Update Employee Role") {
            updateRole();
          }
        if (choices === "View All Roles") {
            allRoles();
          }
        if (choices === "Add Role") {
            addRole();
          }
        if (choices === "View All Departments") {
            allDepartments();
        }
        if (choices === "Add Department") {
            addDepartment();
        }
 
    })
}