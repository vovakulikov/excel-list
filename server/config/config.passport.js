var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User  = require('../models/user.js');


module.exports = function(passport){
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.getPassToPassport(jwt_payload.email,(err,userProfile) => {
      if(err){
        return done(err,false);
      }
      if(userProfile){
        return done(null, userProfile);
      } else{
        return done(null,false);
      }
    })
  }));
};
