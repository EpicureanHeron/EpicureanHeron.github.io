// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")
var friends = require("./app/data/friends.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

// Displays survey
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

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
