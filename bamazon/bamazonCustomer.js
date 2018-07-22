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

read()

function read() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(element => {
            itemList.push(res)
            console.log(element.item_id + ": " + element.product_name + ", $" + element.price)
        });
        choseItem()
    })
}

function choseItem() {
    inquirer.prompt([
        {
            name: "item",
            message: "Input the ID for the product  you wish to purchase:  ",
            type: "input",
            validate: function (value) {

                if (isNaN(value) === false && value <= itemList.length && value > 0) {
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
            console.log(answers.item)
            console.log(answers.quantity)

            var query = connection.query("SELECT * FROM products WHERE item_id=?", [answers.item], function (err, res) {
                if (err) throw err;
                
                if (parseInt(answers.quantity) < parseInt(res[0].stock_quantity)) {
                    var updatedQuantity = parseInt(res[0].stock_quantity) - parseInt(answers.quantity)
                    var priceOfItem = res[0].price
                    
                    //updates the row 
                    var query = connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updatedQuantity, answers.item], function (err, res) {
                        if (err) throw err;
                        var totalOrderAmount = parseFloat(priceOfItem) * parseFloat(answers.quantity)
                        console.log("Your order has been placed! Your order will cost $" + totalOrderAmount)
                    })
                }
                else {
                    console.log("There is not enough in stock to fulfill your order, sorry!")
                }
            })
        }
    })
}
