var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('puzzle', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
router.get('/play/:type', function(req, res, next){
  var type = req.params.type;
  res.render('game',{
    title: "Puzzle: " + type,
    type: type
  });
});

module.exports = router;
