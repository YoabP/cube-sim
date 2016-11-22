var URI = 'localhost:27017/cube-sim';
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(URI);
module.exports = db;
