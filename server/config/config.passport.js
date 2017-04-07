const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User  = require('../models/user.js');


module.exports = function(passport) {
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'secret';

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // todo: camelCase!
    User.getPassToPassport(jwt_payload.email, (err,userProfile) => {
      if (err) {
        return done(err, false);
      }

      if (userProfile) {
        return done(null, userProfile);
      }
        return done(null, false);
        // it's a bad looking thing when you have last return in condition.
        /**
         * For example, this can be rewritten like this:
         *
         * if (expression) {
         *    return true;
         * }
         *
         * return false;
         */

      // todo: pls don't make me add all these spaces everywhere, add them by yourself
      // todo: the rules are simple:
      /**
       * 1) A space after every function parameter
       * 2) A space after every operator/reserved word (if, else, return, function etc etc)
       * 3) A newline after if statements, if they're followed by some code
       * 4) A space before curly braces.
       */
    });
  }));
};
