//might need something like this https://www.npmjs.com/package/sql-cli

var inquirer = require("inquirer")
var mysql = require("mysql")

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
    console.log("work in progress")
}

function addDept(){
    console.log("also a work in progress")
}