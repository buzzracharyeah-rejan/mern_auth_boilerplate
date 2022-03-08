const joi = require('joi');

const signupSchema = joi.object({
  username: joi.string().required().trim().min(3).max(30).label('username'),
  email: joi.string().required().trim().min(3).max(30).label('email'),
  password: joi.string().required().trim().min(3).max(100).label('password'),
  role: joi.string().required().trim().valid('admin', 'user').label('role'),
});

const tokenSchema = joi.object({
  token: joi.string().required().trim().label('token'),
});

const loginSchema = joi.object({
  email: joi.string().required().trim().min(3).max(30).label('email'),
  password: joi.string().required().trim().min(3).max(100).label('password'),
});
module.exports = { signupSchema, tokenSchema, loginSchema};
