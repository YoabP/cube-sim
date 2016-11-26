'use strict';

var User = require('./user.model');
var passport = require('passport');

exports.index = function(req, res) {
  return new Promise(function (resolve, reject){
    User.find(function (err, users) {
      if(err) { reject(err); }
      resolve(users);
    });
  });
};

exports.register = function(req, res) {
  return new Promise(function(resolve,reject){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    console.log("pass");
    user.setPassword(req.body.password);
    console.log("pass done");
    user.save(function(err) {
      console.log(err);
      if(err) { reject(err); }
      var token;
      token = user.generateJwt();
      resolve({"token" : token });
    });
  });
};

exports.login = function(req, res) {
  var result = {};
  return new Promise(function(resolve, reject){
    passport.authenticate('local', function(err, user, info){
      var token;
      // If Passport throws/catches an error
      if (err) {
        result.err = err;
        reject(result);
        return;
      }
      // If a user is found
      if(user){
        token = user.generateJwt();
        resolve({"token" : token});
      } else {
        result.notFound = true;
        result.info = info;
        reject(result);
      }
    })(req, res);
  });
};
