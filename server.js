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

  let employee =[];

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
            allJobs();
            break;
          
        case "Add Role":
            addJob();
            break;
          
        case "View All Departments":
            allDepartments();
            break;
        
        case "Add Department":
            addDepartment();
            break;
          
        default: 
          initialQ();
 
    }
  })
};

allEmployees = () => {
  db.query('SELECT * FROM employees', function (err, results) {
    if (err) throw err;
    cTable(results);
    initialQ();
  })
};

allJobs = () => {
  db.query('SELECT * FROM job', function (err, results) {
    if (err) throw err;
    cTable(results);
    initialQ();
  })
};

allDepartments = () => {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    console.table(results);
    initialQ();
  })
};

addEmployee = async () => {

  db.query('SELECT job_title FROM job',  await function (err, results) {
    if (err) throw err;
    const rolesArray = results.map(({ job_title }) => (job_title ));
    // console.log(rolesArray);
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_first',
            message: 'What is the employee\'s first name?',
            validate: input => {
              if  (input) {
                  return true; 
              } else {
                console.log ('Please enter the employee\'s first name')
                  return false;
              }
          },
        },
        {
          type: 'input',
          name: 'employee_last',
          message: 'What is the employee\'s last name?',
          validate: input => {
            if  (input) {
                return true; 
            } else {
              console.log ('Please enter the employee\'s last name')
                return false;
            }
          },
        },
        {
          type: 'input',
          name: 'employee_last',
          message: 'What is the employee\'s last name?',
          validate: input => {
            if  (input) {
                return true; 
            } else {
              console.log ('Please enter the employee\'s last name')
                return false;
            }
          },
        },
        {
          type: 'list',
          name: 'employee_job',
          message: 'What is the employee\'s role?',
          choices: rolesArray
        },
        {
          type: 'number',
          name: 'employee_mgr',
          message: 'What is the employee\'s manager\'s ID?',
          validate: input => {
            if  (input) {
                return true; 
            } else {
              console.log ('Please enter the employee\'s manager\'s ID')
                return false;
          }}
        }
      ])
    .then(response=> { 
      const { employee_first, employee_last, employee_job, employee_mgr } = response;
      
      db.query(`SELECT id FROM job WHERE job_title = ?` , employee_job, function (err, result) {
        if (err) throw err;
        const job_id = result.map(({ id }) => ( id ));
        employee.push(employee_first, employee_last,  employee_mgr, job_id)

             
      db.query(`INSERT into employees (first_name, last_name, manager_id, job_id) VALUES (?,?,?,?)` , employee, function (err, results) {
        if (err) throw err;
        console.log('Employee added to Database');
        initialQ();
            }
         )}
       )}
     )}
  )};



   updateRole = () => {

    db.query("SELECT id, first_name, last_name FROM employees", function (err, name) {
      if (err) throw err;
      const namesArray = name.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    
    db.query('SELECT job_title FROM job',  function (err, job) {
      if (err) throw err;
      const rolesArray = job.map(({ job_title }) => (job_title ));

      inquirer.prompt([

      {
        type: 'list',
        name: 'employee_id',
        message: 'Which employee would you like to update?',
        choices: namesArray
      },
      {
        type: 'list',
        name: 'new_role',
        message: 'What is the employee\'s new role?',
        choices: rolesArray
      },

      ])

      .then(data => {
          console.log(data);
        // const { employee_name, new_role} = data;
        // console.log(employee_name + new_role );
        // db.query('UPDATE employee set job_id = ? WHERE id = ?', new_role )
      })
    })
   })
  };

initialQ();