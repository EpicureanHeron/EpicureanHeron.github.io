// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

var friends = require("../data/friends.js")

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends)
    })

    app.post("/api/friends", function (req, res) {

        var scoresIntArr = req.body.scores

        var matchedTotal = 100;
        var matchedIndex;

        //For loop cycles through every friend in the data array, but excludes the final array item because that will be the most recently posted friend
        for (j = 0; j < friends.length; j++) {

            //variable where the difference between scores is kept
            var questionDifference = 0;

            //cycles through the potential friend's scores
            for (i = 0; i < friends[j].scores.length; i++) {
                //adds the absolute value of the the difference beween the poster's score and the potential friends
                questionDifference += Math.abs(parseInt(scoresIntArr[i]) - parseInt(friends[j].scores[i]))

            }

            //checks to see if the new value is less than the current value 
            if (questionDifference < matchedTotal) {
                matchedTotal = questionDifference
                matchedIndex = j
            }
            
        }
        friends.push(req.body);
        res.jsonp(friends[matchedIndex]);
    })
}

