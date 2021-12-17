const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


const app = express();

app.use(express.urlencoded({ extended: false }));
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
            }
            
        ])

    .then(response => {
      const { inital } = response;

      switch (inital) {
      
        case "View All Employees":
            allEmployees();
            break;
        
        case "Add Employee":
            addEmployee();
            break;
        
        case "Update Employee Role":
            updateRole();
            break;
          
        case "View All Roles":
            allRoles();
            break;
          
        case "Add Role":
            addRole();
            break;
          
        case "View All Departments":
            allDepartments();
            break;
        
        case "Add Department":
            addDepartment();
            break;
          
        default: 
            restart();
 
    }
  })
};


initialQ();