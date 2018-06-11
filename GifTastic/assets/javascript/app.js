//pausing gifs: https://github.com/EpicureanHeron/ClassActivities/blob/master/pastClasses/2018_06_09/pausing%20gifs/Unsolved/pausing-gifs.html

//adding buttons: https://github.com/EpicureanHeron/ClassActivities/blob/master/pastClasses/2018_06_07/MovieProject/WorkingMovieApp-Unsolved/Unsolved/working-movie-app-harder.html

//buttons with attribute and searching: https://github.com/EpicureanHeron/ClassActivities/blob/master/pastClasses/2018_06_09/Unsolved-Movies/Unsolved/button-triggered-ajax.html

//using gify: https://github.com/EpicureanHeron/ClassActivities/blob/master/pastClasses/2018_06_09/Unsolved-catButton/cat-button.html


console.log("working")

    //when something with the ID cat Button is clicked, the funciton happens
 $("#cat-button").on("click", function() {
      //this is our Query URL, it has an API KEY (api_key=) and the parameters random? the &tag=cats
	  
  //my API key
  var apiKey = "api_key=S1J3JVgAulmKTTWZ7ZBEKI7BK1MNDa0v"
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
  //For loop to get 10 responses beceause why not
  console.log("clicked")
  //this is the jquery ajax call
  $.ajax({
	//takes the URL which is our queryURL
	url: queryURL,
	//magic method of GET (something something SERVER HTTP STUFF something something)
	method: "GET"
  })
  //happens after the promise above is fullfilled
	.then(function(response) {
	//grabs the image URL from the response fullfilled in the promise, this format is dictated by the API
	  var imageUrl = response.data.image_original_url;
	  //creates an image jquery object
	  var catImage = $("<img>");
	  //sers the source of the image object to be the data from the API
	  catImage.attr("src", imageUrl);
	  //sets the alt to be "cat image"
	  catImage.attr("alt", "cat image");
	  //adds the cat image to ID on the page #images
	  $("#images").prepend(catImage);
	  
	});
  
});
