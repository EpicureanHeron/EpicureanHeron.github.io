// 3. Inside the `burgers_controller.js` file, import the following:

//    * Express
//    * `burger.js`

// 4. Create the `router` for the app, and export the `router` at the end of your file.

var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        }
        console.log(data)
        res.render("index", hbsObject);
    })

})
// router.post("/", function (req, res) {
//     burger.all(function (data) {
//         var hbsObject = {
//             burgers: data
//         }
//         console.log(data)
//         res.render("index", hbsObject);
//     })

// })

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
  //update this below because it is still cats and not burgers
    // burger.update({
    //   sleepy: req.body.sleepy
    // }, condition, function(result) {
    //   if (result.changedRows == 0) {
    //     // If no rows were changed, then the ID must not exist, so 404
    //     return res.status(404).end();
    //   } else {
    //     res.status(200).end();
    //   }
    // });
  });

module.exports = router;