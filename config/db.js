var mongoose = require ('mongoose');
var config = require ('./index')

mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
mongoose.connection.on('error', function(err){
  console.log('MongoDB connection error: ' + err);
  process.exit(-1);
});
