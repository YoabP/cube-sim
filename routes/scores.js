var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('express-jwt');
var auth = jwt({
  secret: config.SECRET,
  userProperty: 'payload'
});

/* GET home page. */
router.get('/',auth, function(req, res, next) {
  var db = req.db;
  var collection = db.get('scoresCollection');

  collection.find({},{},function(e,docs){
        res.send(docs);
    });
});
router.get('/moves/:type', function(req, res, next){
  var type = req.params.type;
  db.user.find({ changesId : '1234' },
      { limit : 10, sort : { time : 1 } }, // <-  here
      function (err,res) {


      });
});

router.get('/time/:type', function(req, res, next){
  var type = req.params.type;
  console.log(type);
  var db = req.db;
  var collection = db.get('scoresCollection');
  collection.find(
    {
      "type": type
      },
      {
        fields:{
          "name": 1,
          "time": 1,
          "solve": 1
        },
        sort: {time : 1}
      }, // <-  here
      function (err,doc) {
        console.log(err);
        if (err) { res.status(404).json(err); return;}
        res.json(doc);
      });
});

/* POST to scores */
router.post('/',auth, function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.name;
    var scramble = req.body.scramble;
    var solve = req.body.solve;
    var time = parseInt(req.body.time);
    var type = req.body.type;

    // Set our collection
    var collection = db.get('scoresCollection');

    // Submit to the DB
    collection.insert({
      "name" : userName,
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
