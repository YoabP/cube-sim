
'use strict';

var Solve = require('./solve.model');

exports.index = function(req, res) {
  return new Promise(function (resolve, reject){
    Solve.find(function (err, solves) {
      if(err) { reject(err); }
      resolve(solves);
    });
  });
};
//get leaderboards, plus the user position.
exports.score= function(req, res, column, count, user, type){
  return new Promise(function (resolve, reject){
    Solve.aggregate()
    .match({Type: type})
    .group({
      _id: '$Name',  //user name
      score: {$min: '$'+column}
        })
    .sort("score")
    .limit(count)
    .exec(function (err, docs){
      if(err) { reject(err); }
      var alreadyOnLeaderboard = docs.find(function(elem){ return elem._id === user});
      var result;
      if(alreadyOnLeaderboard){
        result = {scores: docs, own: undefined};
        resolve(result);
      }
      else{
        //Get own user max score
        Solve.findOne()
        .where('Name').equals(user)
        .sort(column)
        .select('Name '+column)
        .exec(function(err, usrSolve){
          if(err) { reject(err); }
          //Check if own score is already in leaderboard
          result = {scores: docs, own: (alreadyOnLeaderboard? undefined : usrSolve)};
          resolve(result);
        });
      }
    });
  });
};

exports.create = function(req, res) {
  return new Promise(function(resolve,reject){
    Solve.create(req.body, function(err, solve) {
      if(err) { return reject(err); }
      resolve(solve);
    });
  });
};
