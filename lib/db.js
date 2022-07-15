const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todoapp",
    password: "december1203@",

});
connection.connect();

module.exports = connection;