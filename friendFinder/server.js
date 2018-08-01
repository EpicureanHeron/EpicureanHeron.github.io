//Your `server.js` file should require the basic npm packages we've used in class: `express`, `body-parser` and `path`.


// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")
var friends = require("./app/data/friends.js")

var app = express();
var PORT = 3000;

//following example here: 
//https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
//which has the route required then the app (which is the express server)
//passed to it
var htmlRoutes = require("./app/routing/htmlRoutes.js")(app)

// Sets up the Express App
// =============================================================


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Display all friends
app.get("/api/friends", function(req, res) {
  
  res.json(friends)
  
})

app.post("/api/friends", function(req, res) {
   
  //could need dto leverage a constructor which grabs out the KEY values from the form that is being filled out via javascript on the survery.html
  //then toss those values into a "friend" constructor
  //append the new friend on the friends.js
  var data = "var listOfFriends = ["
  var newFriend = req.body;

  friends.push(newFriend)

  data+= JSON.stringify(friends)
  data+="]"
  data+=" module.exports = listOfFriends;"


  fs.writeFile("./app/data/friends.js", friends, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


 




})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
