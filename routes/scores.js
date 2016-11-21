var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('scoresCollection');

  collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

/* POST to scores */
router.post('/', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var scramble = req.body.scramble;
    var solve = req.body.solve;
    var time = req.body.time;
    var type = req.body.type;

    // Set our collection
    var collection = db.get('scoresCollection');

    // Submit to the DB
    collection.insert({
      "userName" : userName,
      "scramble" : scramble,
      "solve" : solve,
      "time" : time,
      "type" : type
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // return insterted
            res.send(doc);
        }
    });
});
module.exports = router;
