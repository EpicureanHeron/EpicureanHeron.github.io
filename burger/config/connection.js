var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "192.168.99.100",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});

module.exports = connection;