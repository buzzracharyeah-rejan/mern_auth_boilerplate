const authService = require('../services/authService');
const jwtService = require('../services/jwtService');
const { SIGNUP, OK, CREATED, LOGIN } = require('../constants/lang');
const userModel = require('../models/user');


const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(OK.httpStatus).json({
      status: SIGNUP.SIGNUP_SUCCESS.status,
      message: SIGNUP.SIGNUP_SUCCESS.message,
      data: user,
    });
  } catch (error) {
    error.statusCode = SIGNUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.SIGNUP_ERROR.message;
    next(error);
  }
};

const signupWithEmail = async (req, res, next) => {
  try {
    const resp = await authService.signWithEmail(req.body);
    if (resp) {
      res.status(OK.httpStatus).json({
        status: 'success',
        message: 'user activation link sent',
      });
    }
  } catch (error) {
    error.statusCode = SIGNUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.SIGNUP_ERROR.message;
    next(error);
  }
};

const signupWithEmailConfirm = async (req, res, next) => {
  try {
    const token = req.query.token;
    const decoded = await jwtService.verifyToken(token);
    if (!decoded) throw new Error('invalid or expired jwt token');

    const user = await authService.signup(decoded.data);
    res.status(CREATED.httpStatus).json({
      status: SIGNUP.SIGNUP_SUCCESS.status,
      message: SIGNUP.SIGNUP_SUCCESS.message,
      data: user,
    });
  } catch (error) {
    error.statusCode = SIGNUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.SIGNUP_ERROR.message;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // const { user, accessToken, refreshToken } = await authService.login(req.body);
    const userId = req.user._id; 
    const accessToken = await jwtService.signAccessToken({userId}); 
    const refreshToken = await jwtService.signRefreshToken({userId});
    const user = await userModel.findOneAndUpdate({_id: userId}, {$set: {refreshToken}}); 

    res.status(OK.httpStatus).json({
      status: LOGIN.LOGIN_SUCCESS.status, 
      message: LOGIN.LOGIN_SUCCESS.message, 
      data: {
        user, 
        accessToken, 
        refreshToken
      }
    })
  } catch (error) {
    error.statusCode = LOGIN.LOGIN_ERROR.httpStatus;
    error.message = error.message || LOGIN.LOGIN_ERROR.message;
    next(error);
  }
};

module.exports = { signup, signupWithEmail, signupWithEmailConfirm, login };
