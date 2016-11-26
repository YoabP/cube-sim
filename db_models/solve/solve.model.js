'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var solveSchema = new Schema({
  Name: {type:String, required:true},     //username
  Time: {type:Number, required:true},     //seconds solve took
  Moves: {type:String, required:true},    //Algorithm used to solve
  Length: {type: Number, required:true},  //Amount of moves used.
  Scramble: {type:String, required:true}, //Algorithm used for scrambling.
  Type: {type:String, required:true}      //Puzzle Type solved.
});
//virtuals
solveSchema.virtual('Algorithm').set(function (moveArray) {
  this.Moves = moves.join(' ');
  this.Length = moves.length;
});

module.exports = mongoose.model('Solve', solveSchema);
