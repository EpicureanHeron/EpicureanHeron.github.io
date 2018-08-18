# Todos 

* foreign key required for creating burger??? 
* posting a new customer to the customer table through the public/burger.js
* displaying the customer name in the devoured category

#8/17/218
* How to do a POST where I create a customer then...do a PUT where I reference the new customer in the update to the burger status...

* NOTE: I removed the 1 to many reference in customer. Customers will each eat one burger. 

* really spun my wheels, very frustrating. How do you update a record's foreign key AND use express...
    * currenlty chaining a post and put...so should I do the POST and use the response to do send back the new data's unique ID as it relates to the database...so the PUT can reference it? Or os there something baked into SEQUELIZE which will allow me to do this without so many hoops. Read documentation for 2 hours...and I don't think I made much headway. Other than how the naming conventions MIGHT work. 
