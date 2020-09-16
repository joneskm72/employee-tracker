const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.mysql_password,
  database: 'company_db'
});

connection.connect(err => {
  if (err) {
    console.error("error connecting " + err.stack);
    return;
  }
   console.log("Connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;