const connection = require("./connection");

class db {
  constructor() {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query("SELECT * FROM department")
  }
  findAllEmployees()
  
  findAllRoles()
}