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

  collection.find({},{},function(err,docs){

      console.log(err);
        res.json(docs);
    });
});

//register
//TODO validate duplicates
router.post('/new', function(req, res, next){
  console.log(req,res,next);
  var db = req.db;
  console.log("DB");
  var User = db.get('usersCollection');
  console.log("collection");
  var password = req.body.password;
  var email = req.body.email;
  var name = req.body.name;
  console.log("params");
  var passData = encrypt(password);
console.log("encrypt()");
  var exists = false;
  User.findOne({ email: email }, function (err, user) {
    console.log(err);
    if (err) { res.status(404).json(err); return;}
    console.log("Mail");
    if (!user) {
      User.findOne({ name: name }, function (err, user) {
        console.log(err);
        if (err) { res.status(404).json(err); return;}
        console.log("name");
        if (!user) {
          User.insert({
            "name" : name,
            "email" : email,
            "passData" : passData
          }, function (err, doc) {
              if (err) {
                  // If it failed, return error
                  console.log("fail");
                  res.status(404).json(err);
              }
              else {
                console.log("done");
                  // return insterted
                  var token = generateJwt(doc);
                  res.status(200);
                  res.json({
                    "token" : token
                  });
              }
          });
        }
        else{
          // Return if name is duplicate.
          res.status(404).json({message: "UserName already in use."})
        }
      });
    }else{
      // Return if email is duplicate.
      res.status(404).json({message: "Email already in use."})
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
  r.hash = crypto.pbkdf2Sync('secret', 'salt', 1000, 64, 'sha1').toString('hex');

  return r;
};
function validPassword(password, passData){
  var hash = crypto.pbkdf2Sync('secret', 'salt', 1000, 64, 'sha1').toString('hex');

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
