
var express = require("express");
var router = express.Router();
var db = require("../models");

// Routes for front end
router.get("/", function (req, res) {



    res.render("index");
});



router.get("/", function (req, res) {


    res.render("index");
});



// router.post("/", function (req, res) {
//     console.log(req.body);
//     db.Burger.create(req.body).then(function (dbBurger) {
//         res.redirect("/");
//     });
// });

// router.put("/:id", function (req, res) {


//     db.Burger.update(
//         req.body,
//         {
//             where: {
//                 id: req.params.id
//             }
//         }).then(function (dbPost) {
//             res.redirect("/");
//         });
// });


module.exports = router;
