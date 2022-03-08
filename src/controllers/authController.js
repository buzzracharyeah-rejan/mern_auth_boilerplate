const authService = require('../services/authService');
const jwtService = require('../services/jwtService');
const { SIGNUP } = require('../constants/lang');

const signup = async (req, res, next) => {
  try {
    const user = await authService.userSignup(req.body);
    res.status(201).json({
      status: SIGNUP.GROUP.SIGNUP_SUCCESS.httpStatus,
      message: SIGNUP.GROUP.SIGNUP_SUCCESS.message,
      data: user,
    });
  } catch (error) {
    error.statusCode = SIGNUP.GROUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.GROUP.SIGNUP_ERROR.message;
    next(error);
  }
};

const signupWithEmail = async (req, res, next) => {
  try {
    const resp = await authService.userSignupWithEmail(req.body);
    if (resp) {
      res.status(200).json({
        status: 200,
        message: 'user activation link sent',
      });
    }
  } catch (error) {
    error.statusCode = SIGNUP.GROUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.GROUP.SIGNUP_ERROR.message;
    next(error);
  }
};

const signupWithEmailConfirm = async (req, res, next) => {
  try {
    const token = req.query.token; 
    const decoded = await jwtService.verifyToken(token);
    if(!decoded) throw new Error('invalid or expired jwt token'); 
    const user = await authService.userSignup(decoded.data);
    res.status(201).json({
      status: SIGNUP.GROUP.SIGNUP_SUCCESS.httpStatus,
      message: SIGNUP.GROUP.SIGNUP_SUCCESS.message,
      data: user,
    });
  } catch (error) {
    error.statusCode = SIGNUP.GROUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.GROUP.SIGNUP_ERROR.message;
    next(error);
  }
};

module.exports = { signup, signupWithEmail, signupWithEmailConfirm};
