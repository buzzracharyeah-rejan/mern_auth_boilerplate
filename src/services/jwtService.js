const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_LIFE } = require('../configs');

const signToken = async (payload) => {
    const expiresIn = parseInt(JWT_LIFE); 
  return await jwt.sign(
    {
      data: payload,
      sub: 'user signup',
    },
    JWT_SECRET, 
    {expiresIn: '1d'}
  );
};

const verifyToken = async (token) => {
    return await jwt.verify(token, JWT_SECRET); 
}

module.exports = {
  signToken,
  verifyToken
};
