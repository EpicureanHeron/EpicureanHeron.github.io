// * Import (require) `connection.js` into `orm.js`

//    * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. 
//       These are the methods you will need to use in order to retrieve and store data in your database.

//      * `selectAll()`
//      * `insertOne()`
//      * `updateOne()`

//    * Export the ORM object in `module.exports`.




var connection = require('./connection');

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * from " + tableInput +";";
        connection.query(queryString,function(err, result){
            if (err) throw err

            cb(result)

        })

    },
    insertOne: function(table_name, col1, col2, value1, value2 ,cb){
        var queryString = "INSERT INTO " + table_name
        queryString += "(" + col1 + ", " + col2 + ") "
        queryString += " VALUES('" + value1 + "', " + value2 + ");"
        console.log(queryString)
        connection.query(queryString, function(err, result){
            if (err) throw err

            cb(result)
        })
    // INSERT INTO table_name (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);
    },
    // orm.updateOne("burgers", "devoured", true, id, function(res){
        //cb(res)
    updateOne: function (table_name, col1, val1, col2, condition, cb){
        var queryString = "UPDATE " + table_name
        queryString += " SET " + col1 + " = " + val1
        queryString += " WHERE " + col2 + "="+ condition +";"
        console.log(queryString)
        connection.query(queryString, function(err, result){
            if (err) throw err

            cb(result)
        })

    }
   
        // UPDATE table_name
        // SET column1 = value1, column2 = value2, ...
        // WHERE condition;
    


}


// all: function(tableInput, cb) {
//     var queryString = "SELECT * FROM " + tableInput + ";";
//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }
//       cb(result);
//     });
//   },

module.exports = orm;
