//might need something like this https://www.npmjs.com/package/sql-cli

var inquirer = require("inquirer")
var mysql = require("mysql")
const Tablefy = require("tablefy")

let table = new Tablefy()


var itemList = []

var connection = mysql.createConnection({
    host: "192.168.99.100",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

choseOption()

function choseOption() {


    inquirer.prompt([
        {
            name: "choice",
            message: "What would you like to do?  ",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department"]
        },

    ]).then(function (answers) {

        switch (answers.choice) {
            case ("View Product Sales by Department"):
                viewDept()
                break;
            case ("Create New Department"):
                addDept()
                break;

        }




    })
}

function viewDept(){
//   departments db  departments db    departments db    products db     over_head_costs - products sales 
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. 
//`total_profit` should not be stored in any database. You should use a custom alias.

//You may need to look into aliases in MySQL. Hint: You may need to look into GROUP BYs.  Hint: You may need to look into JOINS.

   
var select = "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit "
var from = "FROM departments d "
var join =  "LEFT JOIN products p ON d.department_name = p.department_name "
var groupBy =  "GROUP BY d.department_name, d.department_id, d.over_head_costs "
var orderBy = "ORDER BY d.department_id;"
   
var queryToUse = select + from + join + groupBy + orderBy
    var query = connection.query(queryToUse, function (err, res) {
        if(err) throw err;
        table.draw(res);
        
        
    })
}

function addDept() {


    // CREATE TABLE departments(
    //     department_id INTEGER NOT NULL AUTO_INCREMENT,
    //     department_name VARCHAR(50) NOT NULL,
    //     over_head_costs INTEGER(50) NOT NULL,
    //     PRIMARY KEY (department_id)
    // );
        
    inquirer.prompt([
        {
            name: "department_name",
            message: "What is the department called? ",
            type: "input",
            //add some validation probably to conform with database limitations

        },
        {
            name: "over_head_costs",
            message: "How much is the over head cost? ",
            type: "input",
            validate: function (value) {

                if (isNaN(value) === false &&  value > 0) {
                    return true
                }
                return false
            }

        }
        

    ]).then(function (answers) {



        var posts = { department_name: answers.department_name, over_head_costs: answers.over_head_costs }
        var query = connection.query('INSERT INTO departments SET ?', posts, function (err, res) {
            if (err) throw err;
        })
        // connection.end();
    })
}