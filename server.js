const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require("./db/db");
const { printTable } = require("console-table-printer");



function main() {
  inquirer
    .prompt([{
      name: "main",
      type: "list",
      message: "What would you like to work with?",
      choices: [
        "Employees",
        "Roles",
        "Departments",
        "Exit"
      ]
    }])
    .then(function(answer) {
      switch (answer.main) {
      case "Employees":
        employee_choices();
        break;
      case "Roles":
        role_choices();
        break;
      case "Departments":
        department_choices();
        break;
      case "Exit":
        exit();
      }
    });
}

function employee_choices() {
  inquirer
    .prompt([
      {
        name: "employeeMain",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add an employee",
          "View employees",
          "Exit"
        ]
      }
    ])

    .then(function (answers) {
      switch (answers.employeeMain) {
        case "Add an employee":
          add_employee();
          break;
        case "View employees":
          view_employees();
          break;
        case "Exit":
          exit();
      }
    })
}

function role_choices() {
  inquirer
    .prompt([
      {
        name: "roleMain",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a role",
          "View roles",
          "Update a role",
          "Exit"
        ]
      }
    ])

    .then(function (answers) {
      switch(answers.roleMain) {
        case "Add a role":
          add_role();
          break;
        case "View roles":
          view_roles();
          break;
        case "Update a role":
          update_role();
          break;
        case "Exit":
          exit();
      }
    })
}

function department_choices() {
  inquirer
    .prompt([
      {
        name: "departmentMain",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a department",
          "View departments",
          "Exit"
        ]
      }
    ])

    .then(function (answers) {
      switch(answers.departmentMain) {
        case "Add a department":
          add_department();
          break;
        case "View departments":
          view_departments();
          break;
        case "Exit":
          exit();
      }
    });
};

async function add_department() {
  const departments = await db.findAllDepartments();

  inquirer
  .prompt([
    {
      name: "dept_name",
      type: "input",
      message: "What is the name of this department?"
    }
  ])

  .then(function(answers) {
    db.createDepartment(answers.dept_name).then(
      function(response) {
        console.log(response);
        view_departments();
      });
  });
};

async function add_role() {
  const departments = await db.findAllDepartments();
  const departmentOptions = departments.map(({ id, dept_name }) => ({
    name: dept_name,
    value: id
  }));

  inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of this role?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?"
    },
    {
      name: "id",
      type: "list",
      message: "What is the department ID associated with this position?",
      choices: departmentOptions
    }
  ])

  .then(function(answers) {
    db.createEmployeeRole(answers.title, answers.salary, answers.id).then(
      function (response) {
        console.log(response);
        view_roles();
      }
    )
  })
}

async function add_employee() {
  const roles = await db.findAllRoles();
  const roleOptions = roles.map(({ id, role_title }) => ({
    name: role_title,
    value: id
  }));

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please enter the employee's first name"
      },
      {
        name: "last_name",
        type: "input",
        message: "Please enter the employee's last name"
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the employee's role?",
        choices: roleOptions
      }
    ])

    .then(function(answers) {
      db.createEmployee(
        answers.first_name,
        answers.last_name,
        answers.role_id
      ).then(function (response) {
        console.log(response);
        view_employees();
      });
    });
};

function view_employees() {
  console.log("Here are your employees:");
  db.findAllEmployees().then(function (response) {
    printTable(response);
    main();
  });
};

function view_departments() {
  console.log("Here are your departments:");
  db.findAllDepartments().then(function (response) {
    printTable(response);
    main();
  });
};

function view_roles() {
  console.log("Here are your roles:");
  db.findAllRoles().then(function (response) {
    printTable(response);
    main();
  });
};

function exit() {
  console.log("Thank you for using Employee Tracker!");
  process.exit()
}

main();