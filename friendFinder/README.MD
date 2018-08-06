# Friend Finder - Node and Express Servers

## [Live on Heroku](https://friendfinder-jft.herokuapp.com/)

This is a compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site takes in results from  users' surveys, then compares answers with those from other users. The app then displays the name and picture of the user with the best overall match. 

## Server info

Running the app on a local machine will have the port set at 3000. Otherwise, deploying it on Heroku has the port dynamically assigned.

## Routing

### Get and Posts
* `htmlRoutes.js` file includes two routes:

   * GET Route to `/survey` which displays the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page. 

* `apiRoutes.js` file contains two routes:

   * GET route with the url `/api/friends`. This is used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This is used to handle incoming survey results. This route also is used to handle the compatibility logic. The app runs through the friend seeker's answers and compares them to all other friends in the system. By taking the absolute value of the difference and adding it all together, the closest match is selected and displayed in a modal window. 



## Deployment on Heroku

[Click here to navigate to the deployed application.](https://friendfinder-jft.herokuapp.com/)
