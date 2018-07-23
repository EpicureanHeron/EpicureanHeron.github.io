var inquirer = require("inquirer")
var mysql = require("mysql")

var managerChoices = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

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
            message: "What would you like to do, Mr. Manager? ",
            type: "list",
            choices: managerChoices
        }
    ]).then(function (answers) {
        switch (answers.choice) {
            case ("View Products for Sale"):
                readDB()
                break;
            case ("View Low Inventory"):
                readDB("five")
                break;
            case ("Add to Inventory"):
                readDB("add")
                break;
            case ("Add New Product"):
                insertProduct()
                break;
        }

    })
}



function readDB(selection) {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var numOfDBItems = 0
        res.forEach(element => {
            if (selection === "five") {
                if (element.stock_quantity < 5) {
                    console.log(element.item_id + ": " + element.product_name + " | Price:  $" + element.price + " | Stock: " + element.stock_quantity)
                }
            }
            else {
                numOfDBItems++
                console.log(element.item_id + ": " + element.product_name + " | Price:  $" + element.price + " | Stock: " + element.stock_quantity)
            }
        });
        if (selection === "add") {
            addInv(numOfDBItems)
        }
    })

}

function addInv(dbItems) {

    inquirer.prompt([
        {
            name: "item",
            message: "Input the ID for the product  you wish to add to:  ",
            type: "input",
            validate: function (value) {

                if (isNaN(value) === false && value <= dbItems && value > 0) {
                    return true
                }
                return false
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answers) {
        if (answers) {
            var query = connection.query("SELECT * FROM products WHERE item_id=?", [answers.item], function (err, res) {
                if (err) throw err;

                var updatedQuantity = parseInt(res[0].stock_quantity) + parseInt(answers.quantity)
                var query = connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updatedQuantity, answers.item], function (err, res) {
                    if (err) throw err;

                    console.log("Stock increased to " + updatedQuantity)
                })
            })
        }
    })
}

function insertProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "What is the product called? ",
            type: "input",
            //add some validation probably to conform with database limitations

        },
        {
            name: "department_name",
            type: "input",
            message: "Which department?",
            //might make this a list to chose a valid department to make sure the proper thing gets selected for step 3 
        },
        {
            name: "price",
            message: "How much does it cost? ",
            type: "input",
            //add some interger validation

        },
        {
            name: "stock_quantity",
            message: "How many are being added? ",
            type: "input",
            //add some interger validation

        }

    ]).then(function (answers) {



        var posts = { product_name: answers.product_name, department_name: answers.department_name, price: answers.price, stock_quantity: answers.stock_quantity }
        var query = connection.query('INSERT INTO products SET ?', posts, function (err, res) {
            if (err) throw err;
        })
        // connection.end();
    })
}