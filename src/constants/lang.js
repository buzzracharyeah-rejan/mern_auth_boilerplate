module.exports = {
  SIGNUP: {
    GROUP: {
      name: 'signup',
      SIGNUP_SUCCESS: {
        httpStatus: 200,
        message: 'signup success',
      },
      SIGNUP_ERROR: {
        httpStatus: 400,
        message: 'signup failed',
      },
    },
  },
  INTERNAL_SERVER_ERROR: {
      httpStatus: 500, 
      message: 'internal server error'
  }
};
