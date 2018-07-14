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
        movieInfo()
        break;

    case "do-what-it-says":
        liriSoRandom()
        break;
}

//FUNCTIONS

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
      
       

    for (i = 0; i < data.tracks.items.length; i ++){
        for  (j = 0; j < data.tracks.items[i].album.artists.length; j++){
            console.log(data.tracks.items[i].album.artists[j].name)
        }
          console.log(data.tracks.items[i].name)
          
          console.log(data.tracks.items[i].preview_url)

          console.log(data.tracks.items[i].album.name)
         
     
          console.log("-------------------------------")
          console.log("-------------------------------")
      }
    //   console.log(data.tracks.items[0].artists)

    //   console.log(data.tracks.items[0].artists)
      });
}

function movieInfo(){
    console.log("Movie Stuff")
}

function liriSoRandom(){
    console.log("random")
}