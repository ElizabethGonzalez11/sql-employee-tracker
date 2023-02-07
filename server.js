const inquirer = require('inquirer');
const mysql = require('mysql');

// Connect to database
const db = mysql.createConnection(
  {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Abc123!!',
  database: 'employee_db',
  });

  db.connect(function (err) {
    if (err) throw err;
    promptUser();
  });

 function promptUser() {
   inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee',
        'Exit'
      ]
    }
  ])
  .then (function (answer) {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
        
      case 'View all roles':
        viewAllRoles();
        break;

      case 'View all employees':
        viewAllEmployees();
        break;
        
      case 'Add a department':
        addDepartment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add an employee':
        addEmployee();
        break;

      case 'Update employee role':
        updateEmployeeRole();
        break;
      
      case 'Exit':
        exitPrompt();
        break;
    }
  });
}

function viewAllDepartments() {
  console.log('Viewing all departments...\n');
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  })
}
  

function viewAllRoles()  {
  console.log('Viewing all roles...\n');
  db.query('SELECT * FROM employee_role', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  })
}

function  viewAllEmployees() {
  console.log('Viewing all employees...\n');
  db.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  })
}

function addDepartment() {
  inquirer.prompt([
    {
    name: 'department_name',
    message: "Enter department name:",
    type: 'input',
    }
  ])
  .then(function ({department_name}) {
    db.query('INSERT INTO department SET ?', 
      {
        name: department_name
      },
      function (err, res) {
        if (err) throw err;
        console.log(`Successfully added ${department_name} into table`)
        viewAllDepartments();
        promptUser();
      })
    }) 
}

function addRole () {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter role title:',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the salary for this role?',
      name: 'salary',
    },
    { 
      type: 'input',
      message: 'What is the department ID?',
      name: 'department_id',
    }
  ])
  .then(function({title, salary, department_id}) {
    db.query('INSERT INTO employee_role SET?',
    {
      title: title,
      salary: salary,
      department_id: department_id,
    },
    function (err, res) {
      if (err) throw err;
        console.log(`Successfully added ${title} into table.`)
        viewAllRoles();
        promptUser();
    })
  })
}


function addEmployee () {
  inquirer.prompt ([
    {
      type: 'input',
      message: 'What is their first name?',
      name: 'first_name',
    },
    {
      type: 'input',
      message: 'What is their last name?',
      name: 'last_name',
    },
    {
      type: 'input',
      message: 'What is the role id number?',
      name: 'role_id',
    },
    {
      type: 'input',
      message: 'What is the manager ID?',
      name: 'manager_id',
    }
    ])
    .then(function ({first_name, last_name, role_id, manager_id}) {
    db.query('INSERT INTO employee SET ?',
      {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        manager_id: manager_id,
      },
      function (err, res) {
        if (err) throw err;
        console.log(`Successfully added ${first_name} ${last_name} into the table`)
        viewAllEmployees();
        promptUser();
      })
  })
}
      
function updateEmployeeRole () {
  db.query('SELECT * FROM employee_role',
  function (err, res) {
    if (err) throw err;
    const roles = res;
    console.table(roles);
    inquirer.prompt ([
      {
        type: 'input',
        message: 'Enter employees ID:',
        name: 'employee_id'
      },
      {
        type: 'list',
        message: 'Choose new employee role:',
        choices: function() {
          const choiceArr = [];
          for (let i = 0; i <res.length; i++) {
            choiceArr.push(`${res[i].title}`);
          }
          return choiceArr;
        },
        name: 'chosenRole'
      }
    ])
    .then(function ({employee_id, chosenRole}) {
      console.log('Updating employee role...\n');
      db.query('UPDATE employee SET ? WHERE ?',
      [
        {
          role_id: chosenRole.split('')[0]
        },
        {
          id: employee_id
        }
      ],
      function (err, res) {
        if (err) throw err;
        console.log(`Employee ${employee_id} role has been updated to ${chosenRole}\n`);
        viewAllEmployees();
        promptUser();
      }
    );
    })
  })
} 

function exitPrompt() {
  db.end();
}