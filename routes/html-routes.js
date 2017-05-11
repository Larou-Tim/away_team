

var express = require("express");
var router = express.Router();
var db = require("../models");

// Routes for front end
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


// module.exports = router;
// =======
// // Dependencies
// // =============================================================
// var path = require("path");

// // Routes
// // =============================================================
// module.exports = function(app) {

//   // Each of the below routes just handles the HTML page that the user gets sent to.

//   // index route loads home page
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

// };
// >>>>>>> ben-branch
