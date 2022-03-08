const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');
const jwtService = require('../services/jwtService');
const { CLIENT_URI } = require('../configs');

const authService = {
  signup: async ({ username, email, password, role }) => {
    try {
      let user = await userModel.findOne({ email });
      if (user) throw new Error('email already exists');

      const salt = await userModel.makeSalt();
      const hash = await userModel.encryptPassword(salt, password);
      user = await userModel.create({ username, email, password: hash, role });
      return user;
    } catch (error) {
      throw error;
    }
  },
  signupWithEmail: async ({ username, email, password, role }) => {
    try {
      let user = await userModel.findOne({ email });
      if (user) throw new Error('email already exists');

      // gen a token
      const token = await jwtService.signToken({ username, email, password, role });

      // send confirmation email
      await emailService.triggerEmail({
        emailTo: email,
        subject: 'account activation link',
        html: `
        <p> Please use the following link to <strong>activate</strong> your account</p>
        <a href='${CLIENT_URI}/auth/activate/${token}'> activation link </a>
        <p> This email may contain sensitive information </p>
        `,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      let user = await userModel.findOne({email}).select('password'); 
      if (!user) throw new Error('invalid username or password');

      const isValid = await user.authenticate(password);
      if (!isValid) throw new Error('invalid username or password');

      const accessToken = await jwtService.signAccessToken({userId: user._id}); 
      const refreshToken = await jwtService.signRefreshToken({userId: user._id});
      user = await userModel.findOneAndUpdate({email}, {$set: {refreshToken}}); 
      return {
        user, 
        accessToken, 
        refreshToken
      }
    } catch (error) {
      throw error
    }
  },
};

module.exports = authService;
