const jwt = require('jsonwebtoken');

const signToken = async (payload) => {
    const expiresIn = parseInt(process.env.JWT_LIFE); 
  return await jwt.sign(
    {
      data: payload,
      sub: 'user signup',
      exp: expiresIn,
    },
    process.env.JWT_SECRET
  );
};

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET); 
}

module.exports = {
  signToken,
  verifyToken
};
