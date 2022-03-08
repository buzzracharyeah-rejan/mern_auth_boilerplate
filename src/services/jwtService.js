const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  JWT_LIFE,
  JWT_ACCESS_TOKEN_KEY,
  JWT_ACCESS_TOKEN_LIFE,
  JWT_REFRESH_TOKEN_KEY,
  JWT_REFRESH_TOKEN_LIFE,
} = require('../configs');

const signToken = async (payload) => {
  const expiresIn = parseInt(JWT_LIFE);
  return await jwt.sign(
    {
      data: payload,
      sub: 'user signup',
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const verifyToken = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

const signAccessToken = async (payload) => {
  const expiresIn = parseInt(JWT_ACCESS_TOKEN_LIFE);
  return await jwt.sign(
    {
      data: payload,
      sub: payload.userId,
    },
    JWT_SECRET,
    { expiresIn }
  );
};

const verifyAccessToken = async (token) => {
  return await jwt.verify(token, JWT_ACCESS_TOKEN_KEY);
};

const signRefreshToken = async (payload) => {
  const expiresIn = parseInt(JWT_REFRESH_TOKEN_LIFE);
  return await jwt.sign(
    {
      data: payload,
      sub: payload.userId, 
    },
    JWT_SECRET,
    { expiresIn }
  );
};

const verifyRefreshToken = async (token) => {
  return await jwt.verify(token, JWT_REFRESH_TOKEN_KEY);
};

module.exports = {
  signToken,
  verifyToken,
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
