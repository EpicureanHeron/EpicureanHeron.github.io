//Your `server.js` file should require the basic npm packages we've used in class: `express`, `body-parser` and `path`.

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")
var friends = require("./app/data/friends.js")


//sets up express server 
var app = express();
var PORT = process.env.PORT || 3000;

//enables the parsing of json in posts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//following example here: 
//https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
//which has the route required then the app (which is the express server)
//passed to it

//router
var htmlRoutes = require("./app/routing/htmlRoutes.js")(app)
var apiRoutes = require("./app/routing/apiRoutes.js")(app)

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
