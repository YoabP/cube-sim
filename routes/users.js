var express = require('express');
var router = express.Router();
var Users = require('../db_models/user/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.index(req,res)
  .then(function(result){
    return res.status(200).json(result);
  })
  .catch(function(err){
    handleError(res, err);
  });
});

//register
router.post('/new', function(req, res, next){
  Users.register(req,res)
  .then(function(result){
    return res.status(201).json(result);
  })
  .catch(function(err){
    handleError(res, err);
  });

});

router.post('/login', function(req, res, next){
  Users.login(req, res)
  .then(function(result){
    return res.status(200).json(result);
  })
  .catch(function(result){
    if(result.err){
      return res.status(404).json(result.err);
    }
    if(result.notFound){
      return res.status(401).json(result.info);
    }
  });
});

module.exports = router;

function handleError(res, err) {
  return res.status(500).send(err);
}
