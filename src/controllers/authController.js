const authService = require('../services/authService'); 
const {SIGNUP} = require('../constants/lang'); 

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.userSignup(req.body); 
    res.status(201).json({
      status: SIGNUP.GROUP.SIGNUP_SUCCESS.httpStatus, 
      message: SIGNUP.GROUP.SIGNUP_SUCCESS.message, 
      data: user
    })
  } catch (error) {
    error.statusCode = SIGNUP.GROUP.SIGNUP_ERROR.httpStatus;
    error.message = error.message || SIGNUP.GROUP.SIGNUP_ERROR.message;
    next(error); 
  }
};
