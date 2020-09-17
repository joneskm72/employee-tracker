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

function addDept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(choice) {
      var query = "SELECT dept_id, dept_name FROM department WHERE ?";
      connection.query(query, { department: answer.department }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Department ID: " + res[i].dept_id + " || Department Name: " + res[i].dept_name);
        }
        runSearch();
      });
    });
}

