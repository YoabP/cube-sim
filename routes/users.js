var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usersCollection');

  collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

//register
//TODO validate duplicates
router.post('/new', function(req, res, next){
  var db = req.db;
  var collection = db.get('usersCollection');
  var password = req.body.password;
  var email = req.body.email;
  var name = req.body.name;
  var passData = encrypt(password);
  collection.insert({
    "name" : name,
    "email" : email,
    "passData" : passData
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.status(404).json(err);
          return;
      }
      else {
          // return insterted
          var token = generateJwt(doc);
          res.status(200);
          res.json({
            "token" : token
          });
      }
  });
});
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
   var token;
   // If Passport throws/catches an error
   if (err) {
     console.log(err);
     res.status(404).json(err);
     return;
   }
   // If a user is found
   if(user){
     token = generateJwt(user);
     res.status(200);
     res.json({
       "token" : token
     });
   } else {
     // If user is not found
     res.status(401).json(info);
   }
 })(req, res);
});
function encrypt(password){
  var r = {};
  r.salt = crypto.randomBytes(16).toString('hex');
  r.hash = crypto.pbkdf2Sync(password, r.salt, 1000, 64).toString('hex');
  return r;
};
function validPassword(password, passData){
  var hash = crypto.pbkdf2Sync(password, passData.salt, 1000, 64).toString('hex');
  return passData.hash === hash;
}
function generateJwt(user) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.SECRET);
};

module.exports = router;
