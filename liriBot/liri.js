//Imported Modules
require("dotenv").config();
var keys = require("./keys.js")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var fs = require("fs")
var request = require("request")

//takes the command from the terminal 
var command = process.argv[2];
var searchItem = process.argv[3]

//spotify and twitter credentials
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify); 

//switch statement to govern which function is used
switch (command) {
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

//FUNCTIONS

//This will show your last 20 tweets and when they were created at in your terminal/bash window.
function getTweets(){

   client.get('search/tweets', {q: 'IoEphe'}, function(error, tweets, response) {
        for(i = 0; i < tweets.statuses.length; i++){
            
            console.log(tweets.statuses[i].text)
    
            console.log("-------------------------------------------------------")
    
        }
    });
}

//Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
function spotifySong(song){
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //for loop cycles through all the tracks in the response
    for (i = 0; i < data.tracks.items.length; i ++){

        //for loop cycles through the artists in the track (could be multiple)

        for  (j = 0; j < data.tracks.items[i].album.artists.length; j++){
            console.log(data.tracks.items[i].album.artists[j].name)
        }
        console.log(data.tracks.items[i].name)
          
        console.log(data.tracks.items[i].preview_url)

        console.log(data.tracks.items[i].album.name)
            
        console.log("-------------------------------------------------------")
      }
    //   console.log(data.tracks.items[0].artists)

    //   console.log(data.tracks.items[0].artists)
      });
}

// Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, 
//Ccountry where the movie was produced, Language of the movie, Plot of the movie ,Actors in the movie.
function movieInfo(movie){
    // replaces the spaces in the move with + so it is able to be put in the queryURL
    var apiMovie = movie.split(' ').join('+')
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

function liriSoRandom(){
    console.log("random")
}