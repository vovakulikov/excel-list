var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var UserM  = require('../models/user.js');
var User = new UserM();

module.exports = function(passport){
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.getPassToPassport(jwt_payload.username,(err,user) => {
      if(err){
        return done(err,false);
      }
      if(user){
        return done(null, user);
      } else{
        return done(null,false);
      }
    })
  }));
};
