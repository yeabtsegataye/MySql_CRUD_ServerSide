const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
const sqlpool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});
module.exports = sqlpool;
