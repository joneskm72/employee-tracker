DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT NOT NULL,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER(10),
  FOREIGN KEY (department_id)
  REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10) NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES employee_role (id),
  PRIMARY KEY (id)
);