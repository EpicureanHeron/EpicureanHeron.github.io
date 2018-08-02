// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

var friends = require("../data/friends.js")

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friends)
        })
    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
        res.json(friends);
    })
}