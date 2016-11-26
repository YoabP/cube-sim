var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('express-jwt');
var auth = jwt({
  secret: config.SECRET,
  userProperty: 'payload'
});
var Solves = require('../db_models/solve/solve.controller');

/* GET home page. */
router.get('/',auth, function(req, res, next) {
  Solves.index(req, res)
  .then(function(result){
    return res.status(200).json(result);
  })
  .catch(function(err){
    handleError(res, err);
  });
});
router.get('/moves/:type/:count',auth, function(req, res, next){
  var type = req.params.type;   //puzzle type
  var user = req.payload;       // user requesting
  var count = parseInt(req.params.count); // amount of scores on top.
  Solves.score(req, res, "Length", count, user.name, type)
  .then(function(result){
    return res.status(200).json(result);
  })
  .catch(function(err){
    handleError(res, err);
  });
});
router.get('/time/:type/:count',auth, function(req, res, next){
  var type = req.params.type;   //puzzle type
  var user = req.payload;       // user requesting
  var count = parseInt(req.params.count); // amount of scores on top.
  Solves.score(req, res, "Time", count, user.name, type)
  .then(function(result){
    return res.status(200).json(result);
  })
  .catch(function(err){
    handleError(res, err);
  });
});

/* POST to scores */
router.post('/',auth, function(req, res) {
    req.body.Name = req.payload.name;
    Solves.create(req,res)
    .then(function(result){
      return res.status(201).json(result);
    })
    .catch(function(err){
      handleError(res, err);
    });
});
module.exports = router;

function handleError(res, err) {
  return res.status(500).send(err);
}
