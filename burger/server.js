// Create a server.js file.

// 5. Install the Handlebars npm package: `npm install express-handlebars`.

// 6. Install the body-parser npm package: `npm install body-parser`.

// 7. Install MySQL npm package: `npm install mysql`.

// 8. Require the following npm packages inside of the server.js file:
//    * express
//    * body-parser




var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
