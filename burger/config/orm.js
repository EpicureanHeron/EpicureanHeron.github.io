var connection = require('./connection');

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

var orm = {
    selectAll() {
        connection.query("SELECT * FROM burgers;", function (err, data) {
            if (err) {
                return res.status(500).end();
            }
            // var responseToPass = []
            // data.forEach(element => {
            //     responseToPass.push(element.burger_name)

            // });
            // return responseToPass   
            return data
        });
    },
    insertOne() {
        return
    },
    updateOne() {
        return
    }


}


module.exports = orm;
