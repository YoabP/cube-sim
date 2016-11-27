var express = require('express');
var router = express.Router();
var puzzles = require('../config/puzzles');
/* GET home page. */
router.get('/', function(req, res, next) {
  var locals = {
    title: 'Puzzles',
    puzzles: puzzles.available
  };
  res.render('puzzle', locals);
});

router.get('/play/:type', function(req, res, next){
  var type = req.params.type;
  var title = puzzles.getTitle(type);

  res.render('game',{
    title: "Puzzle: " + title,
    type: type
  });
});

module.exports = router;
