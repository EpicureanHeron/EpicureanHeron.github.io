//Imported Modules
require("dotenv").config();
var keys = require("./keys.js")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var fs = require("fs")
var request = require("request")

//spotify and twitter credentials
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


//takes the command from the terminal 
var command = process.argv[2];
var dataToProcess = process.argv[3]

liriBotLogic(command, dataToProcess);

//This function governs which command is executed via switch
function liriBotLogic(argument, searchItem){
    //Logs whatever is passed to log.txt
    log(argument, searchItem )
    
    switch (argument) {
        case "my-tweets":
            getTweets()
            break;

        case "spotify-this-song":
            spotifySong(searchItem)
            break;

        case "movie-this":
            movieInfo(searchItem)
            break;

        case "do-what-it-says":
            liriSoRandom()
            break;
        }
}

//FUNCTIONS

//This will show your last 20 tweets and when they were created at in your terminal/bash window.
function getTweets() {
    var params = { screen_name: 'IoEphe' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at)
                console.log(tweets[i].text)
                console.log("-------------------------------------------------------")
            }
        }
    });

}

//Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
function spotifySong(song){
    //if no song is base, it becomes the Ace of Base The Sign
    if(!song){
        var song = "Ace of Base The Sign"
    }
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //for loop cycles through all the tracks in the response
    for (i = 0; i < data.tracks.items.length; i ++){

        //for loop cycles through the artists in the track (could be multiple)

        for  (j = 0; j < data.tracks.items[i].album.artists.length; j++){
            console.log("Artist name: " + data.tracks.items[i].album.artists[j].name)
        }
        console.log("Track name: " + data.tracks.items[i].name)
          
        console.log("Preview of track: " + data.tracks.items[i].preview_url)

        console.log("Album name: " + data.tracks.items[i].album.name)
            
        console.log("-------------------------------------------------------")
      }
    //   console.log(data.tracks.items[0].artists)

    //   console.log(data.tracks.items[0].artists)
      });
}

//Using the request library and the OMDB API, it returns the following: 

//Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, 
//country where the movie was produced, Language of the movie, Plot of the movie ,Actors in the movie.
function movieInfo(movie){
    //if movie is an actual value
    if (movie){
        // replaces the spaces in the move with + so it is able to be put in the queryURL

        var apiMovie = movie.split(' ').join('+')
    }
    //if movie passed is not a value, we set it to Mr. Nobody
    else{
        var apiMovie = "Mr.+Nobody"
    }
   
    //creates a query URL to be used by the request function
    var queryUrl = "http://www.omdbapi.com/?t=" + apiMovie + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body){

            if(!error && response.statusCode === 200) {
            var parsedBody = JSON.parse(body)
            console.log("Movie Title: " + parsedBody.Title)
            console.log("Release Year: "+ parsedBody.Year)
            console.log("IMDB Rating: "+ parsedBody.imdbRating)

            //checks to see if a Rotten Tomatoes score exists and then prints it
            for(i = 0; i < parsedBody.Ratings.length; i ++){
                if (parsedBody.Ratings[i].Source === "Rotten Tomatoes"){
                    console.log("Rotten Tomatoes Score: " + parsedBody.Ratings[i].Value)
                }
            }
            
            console.log("Country where the movie was produced: " + parsedBody.Country)
            console.log("Language: " + parsedBody.Language)
            console.log("Plot: " + parsedBody.Plot)
            console.log("Actors: " + parsedBody.Actors)

            }
        })
}

//"random function" which then executes another command in the liriBotLogic function 
//this is done by reading a "random.txt" file and executing the command and argument, which are separated by commas in the file
function liriSoRandom(){
    //Reads the random.txt file
    fs.readFile("random.txt", 'utf8', function(err,data) {
        if (err) {
           return err;
        };
        //splits the comma separated values 
        var dataSplit = data.split(",")
        //select a random number, have to be "-1" because the LENGTH is different than INDEX
        var randomSelector = Math.floor(Math.random() * Math.floor(dataSplit.length - 1))
        //to ensure that the code is always grabbing a command (which is always at  even index)
        if(randomSelector%2 !== 0) {
            randomSelector += 1
        }
     
        //the parsed data gets passed to the liriBotLogic function so it can be acted upon
        //the even selector is the command which is passed and the second argument is the parameter, which is always the odd index, hence the +1 to the randomSelector
        liriBotLogic(dataSplit[randomSelector], dataSplit[randomSelector + 1])     
    })
}


function log(commandToLog, dataToLog){

    fs.appendFile("log.txt", commandToLog + " " + dataToLog +"\n", function(err,data) {
        if (err) {
            console.log(err);
        };
    });
}