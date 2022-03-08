const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/user');
const { JWT_ACCESS_TOKEN_KEY } = require('../configs');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_ACCESS_TOKEN_KEY;

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        console.log('jwt test here'); 
      const user = await userModel.findOne({ _id: jwt_payload.userId });
      if (!user) return done(null, false);

      return done(false, { userId: 'user1_test', username: 'testuser' });
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  'local',
  new LocalStrategy(customFields, async (email, password, cb) => {
    try {
      const user = await userModel.findOne({ email }).select('_id password');
      if (!user) return cb(null, false, { message: 'Invalid email or password' });

      const isValid = await user.authenticate(password);
      if (!isValid) return cb(null, false, { message: 'Invalid email or password' });

      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  })
);

module.exports = {
  passportLocal: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) next(err);
      if (!user && info?.message) {
        const err = new Error(info.message);
        err.statusCode = 403;
        next(err);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  passportJwt: async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        console.log(err, user)
    })(req, res, next);
  },
};
