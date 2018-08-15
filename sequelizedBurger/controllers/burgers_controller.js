// 3. Inside the `burgers_controller.js` file, import the following:

//    * Express
//    * `burger.js`

// 4. Create the `router` for the app, and export the `router` at the end of your file.

var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

var getRoutes = ["/", "", "/:anything"]

router.get(getRoutes, function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        }
        
        res.render("index", hbsObject);
    })

})


router.post("/api/burgers", function (req, res) {
    burger.insert(req.body.burgerName, req.body.devoured, function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
//rework this so it works for burger
router.put("/api/burgers/:id", function(req, res) {
    
  
   // console.log("condition", condition);

    burger.update(req.params.id, function(result){
        res.status(200).end();
    })

  });

module.exports = router;