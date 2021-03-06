const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { response } = require('express');


//const app = express();

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Bootcamp2022',
      database: 'employees_db'
    },
    console.log('Connected to the database')
  );

  let employee = [];
  let upRole = [];
  let createRole = [];
  

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

        case "Quit":
          process.exit();
      
          
        default: 
          initialQ();
 
    }
  })
};

allEmployees = () => {
  db.query('SELECT * FROM employees', function (err, results) {
    if (err) throw err;
    console.table(results);
    initialQ();
  })
};

allJobs = () => {
  db.query('SELECT * FROM job', function (err, results) {
    if (err) throw err;
    console.table(results);
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

addEmployee = () => {

  db.query('SELECT job_title FROM job', function (err, results) {
    if (err) throw err;
    const rolesArray = results.map(({ job_title }) => (job_title ));
 
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
        employee.push(employee_first, employee_last,  employee_mgr, job_id);

             
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

    db.query("SELECT id FROM employees", function (err, name) {
      if (err) throw err;
    const namesArray = name.map(({ id }) => (id));

    
    db.query('SELECT id FROM job',  function (err, job) {
      if (err) throw err;
      const rolesArray = job.map(({id}) => (id));

      inquirer.prompt([

      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the Employee ID for which you would like to update?',
        choices: namesArray
      },
      {
        type: 'list',
        name: 'new_role',
        message: 'What is the employee\'s new role ID?',
        choices: rolesArray
      },

      ])

      .then(data => {
      const { employee_id, new_role} = data;
      upRole.push(new_role, employee_id);
      
      db.query('UPDATE employees set job_id = ? WHERE id = ?', upRole, function (err, result) {
        if (err) throw err;
        console.log('Employee role updated');
        initialQ();
      })
    })
   })
  })
};

addJob = () => {

  db.query('SELECT id FROM department', function (err, results){
    if (err) throw err;
    const departments = results.map(({id}) => (id));


  inquirer.prompt([
        {
        type: 'input',
        name: 'job',
        message: 'What is the name of the new role?',
        validate: input => {
          if  (input) {
              return true; 
          } else {
            console.log ('Please enter the name of the new role')
              return false;  
          }}
        },
        {
          type: 'number',
          name: 'salary',
          message: 'What is the salary of this new role?',
          validate: input => {
            if  (input) {
                return true; 
            } else {
              console.log ('Please enter the name of the new role')
                return false;  
            }}
        },
        {
          type: 'list',
          name: 'dept',
          message: 'What is the department ID for this new role?',
          choices: departments
        }
    ])

.then(response => {
 const {job, salary, dept} = response;
 createRole.push(job,salary,dept);


 db.query('INSERT into job (job_title, salary, department_id) VALUES (?,?,?)', createRole,function (err, result) {
  if (err) throw err;
  console.log('Employee role added to Database'); 
  initialQ();

      })
    })
  })
};

addDepartment = () => {


  inquirer.prompt([
        {
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department?',
        validate: input => {
          if  (input) {
              return true; 
          } else {
            console.log ('Please enter the name of the new department')
              return false;  
          }}
        },

    ])

.then(response => {
 const {department} = response;


 db.query('INSERT into department (department_name) VALUES (?)', department,function (err, result) {
  if (err) throw err;
  console.log('Department added to Database'); 
  initialQ();

      })
    })
};





initialQ();