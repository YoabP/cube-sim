var express = require('express');
var router = express.Router();
var config = require('../config');
var puzzles = require('../config/puzzles');
var jwt = require('express-jwt');
var auth = jwt({
  secret: config.SECRET,
  userProperty: 'payload'
});
var Solves = require('../db_models/solve/solve.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LogIn' });
});

router.get('/replay/:id', function(req, res, next) {
  Solves.find(req, res)
  .then(function(solve){
    if(!solve) return res.status(404).send('Not Found');
    var locals ={
      title: "Replay",
      Time: solve.Time,
      Scramble: solve.Scramble,
      Moves: solve.Moves,
      Length: solve.Length,
      type: solve.Type
    };
    res.render('replay', locals);
  })
  .catch(function(err){
    handleError(res, err);
  });
});
router.get('/leaderboards/:type/:user', function(req, res, next) {
  var type = req.params.type;   //puzzle type
  var user = req.params.user;       // user requesting
  var count = 3;               // amount of scores on top.
  Solves.score(req, res, "Time", count, user, type)
  .then(function(result){
    var locals = {
      scores :{
        global : {time: result.scores, moves: []},
        friends : {time: [], moves: []}
      },
      title : `${puzzles.getTitle(type)} LeaderBoards`,
      own : {
        global:{time: result.own, moves: undefined},
        friends:{time: undefined, moves: undefined}
      },
      user: user,
      puzzles: puzzles.available
    }
    Solves.score(req, res, "Length", count, user, type)
    .then(function(result){
      locals.scores.global.moves = result.scores;
      locals.own.global.moves = result.own;
      console.log(locals);
      return res.render('leaderboards', locals);
    })
    .catch(function(err){
      handleError(res, err);
    });
  })
  .catch(function(err){
    handleError(res, err);
  });
});

router.get('/test/:type/:user', function(req, res, next) {
  var type = req.params.type;   //puzzle type
  var user = req.params.user;       // user requesting
  var count = 3;               // amount of scores on top.
  Solves.score(req, res, "Time", count, user, type)
  .then(function(result){
    var locals = {
      scores : {time: result.scores, moves: []},
      title : `${puzzles.getTitle(type)} LeaderBoards`,
      own : {time: result.own, moves: undefined},
      user: user
    }
    Solves.score(req, res, "Length", count, user, type)
    .then(function(result){
      locals.scores.moves = result.scores;
      locals.own.moves = result.own;
      return res.json(locals);
    })
    .catch(function(err){
      handleError(res, err);
    });
  })
  .catch(function(err){
    handleError(res, err);
  });
});
module.exports = router;
