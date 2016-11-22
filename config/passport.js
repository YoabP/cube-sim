var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var db = require('./db.js');
var User = db.get('usersCollection');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!validPassword(password, user.passData)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
function validPassword(password, passData){
  //var hash = crypto.pbkdf2Sync(password, passData.salt, 1000, 64, 'SHA1', (err, verify) => {}).toString('hex');
  var hash = crypto.pbkdf2Sync('secret', 'salt', 1000, 64).toString('hex');
  return passData.hash === hash;
}
