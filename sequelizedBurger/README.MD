# Burger 2: The Sequel

# [Deployed on Heroku](https://burger-jft-the-sequel.herokuapp.com/)

# Overview

Updated the 'Eat-Da-Burger!' ([found here](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/burger)) with a number of features.

## Refactored ORM to use Sequelize

* ORM files have been removed and refactored to use the [Sequelize](http://docs.sequelizejs.com/) library instead.

## Customer Associations

* Added a Customer model. 

* Added an association between Burgers and Customer.

* Updated Handlebars, public JS, and CSS to handle sending and parsing Sequelize data.

## Validations and Ordering

* Validations added to  models where:

  * A burger's name cannot be null
  * A burger's devoured status is false by default
  * A Customer's name cannot be null

* Order the Burgers in alphabetical order using the Sequelize "order" option.

