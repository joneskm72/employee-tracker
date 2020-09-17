const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require("./db/db");
const { printTable } = require("console-table-printer");
const { exit } = require("process");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Pipsie#12',
  database: 'company_db'
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What would you like to work with?",
      choices: [
        "Employees",
        "Roles",
        "Departments",
        "Exit"
      ]
    })
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
      default:
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

    .then(function (answer) {
      switch (answer.employeeMain) {
        case "Add an employee":
          add_employee();
          break;
        case "View employees":
          view_employees();
          break;
        default:
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

    .then(function (answer) {
      switch(answer.roleMain) {
        case "Add a role":
          add_role();
          break;
        case "View roles":
          view_roles();
          break;
        case "Update a role":
          update_role();
          break;
        default:
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

    .then(function (answer) {
      switch(answer.departmentMain) {
        case "Add a department":
          add_department();
          break;
        case "View departments":
          view_departments();
          break;
        default:
          exit();
      }
    })
}



