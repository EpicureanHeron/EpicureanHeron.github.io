var db = require("../models");




module.exports = function(app) {


app.get("/", function (req, res) {
    db.Burger.findAll(
        {
            include: [{
        model: db.Customer
    }],
        order: [ ['burger_name', 'ASC']],
},
).then(function(data) {


        var hbsObject = {
            burgers: data
        }
        
        res.render("index", hbsObject);

      
    })
})
       
        

app.post("/api/burgers", function (req, res) {

    db.Burger.create({burger_name: req.body.burgerName}).then(function(burgers){
        
        res.json(burgers)
    })
 
    });

app.post("/api/customers", function (req, res) {
    db.Customer.create(
        {customer_name: req.body.newCustomer})
        
        .then(function(customers){
            //console.log(customers)
            res.json(customers)
        })
    })


//rework this so it works for burger
app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
        {devoured: true, CustomerId: req.body.customerID},
        {where: { id: req.params.id }}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })

  });


    


}