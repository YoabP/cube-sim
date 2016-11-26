'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config = require('../../config');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

//define Schema
var userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name:  { type: String, unique: true, required: true },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.SECRET);
};
module.exports = mongoose.model('User', userSchema);
