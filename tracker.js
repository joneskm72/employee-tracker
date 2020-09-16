const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { exit } = require("process");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'PIpsie#12',
  database: 'company_db'
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add an employee role",
        "Add an employee",
        "View a department",
        "View an employee role",
        "View an employee",
        "Update an employee role",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.choice) {
      case "Add a department":
        addDept();
        break;

      case "Add an employee role":
        empRole();
        break;

      case "Add an employee":
        addEmp();
        break;

      case "View a department":
        viewDept();
        break;

      case "View an employee role":
        viewRole();
        break;

      case "View an employee":
        viewEmp();
        break;

      case "Update an employee role":
        updateRole();
        break;

      case "Exit":
        exit();
        break;
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

