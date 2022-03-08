module.exports = {
  SIGNUP: {
    name: 'signup',
    SIGNUP_SUCCESS: {
      httpStatus: 201,
      status: 'success', 
      message: 'signup success',
    },
    SIGNUP_ERROR: {
      httpStatus: 400,
      status: 'failed', 
      message: 'signup failed',
    },
  },
  LOGIN: {
    name: 'LOGIN',
    LOGIN_SUCCESS: {
      httpStatus: 200,
      success: 'success', 
      message: 'LOGIN success',
    },
    LOGIN_ERROR: {
      httpStatus: 400,
      status: 'failed', 
      message: 'LOGIN error',
    },
  },
  INTERNAL_SERVER_ERROR: {
      httpStatus: 500, 
      status: 'failed', 
      message: 'internal server error'
  }, 
  OK: {
    httpStatus: 200, 
  }, 
  CREATED: {
    httpStatus: 201, 
  }
};
