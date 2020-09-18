const connection = require("./connection");

class db {
  constructor() {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query("SELECT * FROM department")
  }
  findAllEmployees() {
    return this.connection.query("SELECT * FROM employee")
  }
  
  findAllRoles() {
    return this.connection.query("SELECT * FROM employee_role")
  }

  createDepartment(dept_name) {
    return this.connection.query("INSERT INTO department SET ?", {
      dept_name: dept_name
    });
  }
  createEmployeeRole(role_title, role_salary, department_id) {
    return this.connection.query("INSERT INTO employee_role SET ?", {
      role_title: role_title,
      role_salary: role_salary,
      department_id: department_id
    });
  }

  createEmployee(first_name, last_name, role_id) {
    return this.connection.query("INSERT INTO employee SET ?", {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id
    });
  }

  employeesByDepartment() {
    return this.connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employee")
  }
}

module.exports = new db(connection);