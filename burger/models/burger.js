
//     * Inside `burger.js`, import `orm.js` into `burger.js`

//     * Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.

//     * Export at the end of the `burger.js` file.

var orm = require("../config/orm.js")

var burger = {
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res)
        })
    },
    //insertOne: function(table_name, col1, col2, value1, value2 ,cb){
    insert: function(burgerName, devouredState, cb){
        orm.insertOne("burgers", "burger_name", "devoured", burgerName, devouredState, function(res){
            cb(res)
        })
    },
   // updateOne: function (table_name, col1, val1, condition, cb){
    update: function(id, cb){
        orm.updateOne("burgers", "devoured", true, "id", id, function(res){
            cb(res)
        } )
    }
}


module.exports = burger;