const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');
const jwtService = require('../services/jwtService');
const { CLIENT_URI } = require('../configs');

const authService = {
  userSignup: async ({ username, email, password, role }) => {
    try {
      let user = await userModel.findOne({ email });
      if (user) throw new Error('email already exists');
      user = await userModel.create({ username, email, password, role });
      return user;
    } catch (error) {
      throw error; 
    }
  },
  userSignupWithEmail: async ({ username, email, password, role }) => {
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
};

module.exports = authService;
