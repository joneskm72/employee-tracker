DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

CREATE TABLE department (
  dept_id INTEGER(10) NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE employee_role (
  role_id INTEGER(10) NOT NULL,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(10, 2) NOT NULL,
  dept_id INTEGER(10) NOT NULL,
  FOREIGN KEY (dept_id)
  REFERENCES department(dept_id),
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  employee_id INTEGER(10) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10) NOT NULL,
  manager_id INTEGER(10) NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES employee_role (role_id),
  FOREIGN KEY (manager_id)
  REFERENCES employee (manager_id),
  PRIMARY KEY (employee_id)
);