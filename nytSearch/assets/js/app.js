

$("#search").on("click", function() {
    console.log("clicked")
    var searchParam = $("#search1").val().trim()
    var numberOfArticles = $("#search2").val().trim()
    var beginYear = $("#search3").val().trim()
    var endYear = $("#search4").val().trim()
         
    var queryURLstem = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var apikey = "api-key=27221a6d54e94979826fb6e63cbd2df8"

    var mainSearchQuery = "&q=" + searchParam

    if (beginYear > 0) {
        beginDateQuery ="&begin_date="+ beginYear + "0101"
    }
    else {
        beginDateQuery = "&begin_date=19000101"
    }
    if (endYear > 0) {
        endDateQuery = "&end_date=" + endYear + "0101"
    }
    else {
        endDateQuery = "&end_date=20180101"
    }

    var fullURL = queryURLstem + apikey + mainSearchQuery + beginDateQuery + endDateQuery


      $.ajax({
        url: fullURL,
        method: "GET"
      }).then(function(response) {

        console.log(response)
        for (i = 0; i < numberOfArticles; i ++){

       // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
        
          //headline 
        $("#results").prepend("<p>"+ response.response.docs[i].headline.main + "</p>")
          //publisher
        $("#results").prepend("<p>"+ response.response.docs[i].source + "</p>")
          
          //date-time
        $("#results").prepend("<p>"+ response.response.docs[i].pub_date + "</p>")

        $("#results").prepend("<p>"+ response.response.docs[i].web_url + "</p>")


        }
        
     
        
      });
    })
