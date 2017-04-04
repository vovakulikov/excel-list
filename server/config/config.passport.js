const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User  = require('../models/user.js');


module.exports = function(passport){
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
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
