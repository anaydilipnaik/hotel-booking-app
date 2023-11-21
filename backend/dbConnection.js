var mysql = require("mysql2");

var con = mysql.createPool({
  connectionLimit: 500,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = con;
