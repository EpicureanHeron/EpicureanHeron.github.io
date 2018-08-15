# Eat-Da-Burger!

## [Deployed Heroku App](https://burger-jft.herokuapp.com/)

## Overview
* Eat-Da-Burger! is a restaurant app that allows users input the names of burgers they'd like to eat.

* Whenever a user submits a burger's name, it will display on the left column `Burgers Ready to Eat!` column    

* Each burger in the waiting area also has a `Devour!` button. When the user clicks it, the burger is moved to the `Devoured Burgers` column with a strikethrough.

* Every burger remains in the database and is displayed in one of th two columns

# Concepts 

## 3/4 CRUD database 

### JAWSDB on Heroku handles the MySQL database deployment

* Create - Users can use the HTTP POST method to create burgers, which INSERTS a row into the database
* Read - Loading the page employs an HTTP GET to render the results from the database 
* Update - Users can use the HTTP PUT method to update the devoured state of the burger which uses an UPDATE on the database at a specfic ID
* Delete - Users do not have an option to delete anything from the database


## ORM and MVC 

### Model-View-Controller

* Model: MySQL database handled by JAWSDB
* View: Handlebars is used to render the HTML and CSS. Some front end javascript is deployed as well to handle posting, putting, and getting data.
* Controller: Express server and model files (including the ORM)

### Object Relational Mapping

* orm.js seperates out the business logic of the burger app in order to make the code reusable and through this level of abstraction, SQL injection attacks are tougher to use for bad actors

* burger.js connects to the orm.js and provides specific logic for working with the burger based database

* burgers_controller.js is used to handle the express server's routes, including API routes for interacting with the database 




