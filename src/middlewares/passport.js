const passport = require('passport');
const LocalStrategy = require('passport-local');
const userModel = require('../models/user');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  'local',
  new LocalStrategy(
    customFields,
    async (email, password, cb) => {
      try {
          console.log('local st in use'); 
          console.log(email, password); 
        const user = await userModel.findOne({ email }).select('_id password');
        if (!user) return cb(null, false, { message: 'Invalid email or password' });

        const isValid = await user.authenticate(password);
        if (!isValid) return cb(null, false, { message: 'Invalid email or password' });

        return cb(null, user)
      } catch (error) {
        cb(error);
      }
    }
  )
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
};
