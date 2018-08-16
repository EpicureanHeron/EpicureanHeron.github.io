var db = require("../models");




module.exports = function(app) {


app.get("/", function (req, res) {
    db.Burger.findAll({}).then(function(data) {


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

//rework this so it works for burger
app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
        {devoured: true},
        {where: { id: req.params.id }}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })

  });


    


}