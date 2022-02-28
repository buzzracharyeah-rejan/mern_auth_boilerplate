const joi = require('joi');

const bodySchema = joi.object({
  username: joi.string().required().trim().min(3).max(30).label('username'),
  email: joi.string().required().trim().min(3).max(30).label('email'),
  password: joi.string().required().trim().min(3).max(100).label('password'),
  role: joi.string().required().trim().valid('admin', 'user').label('role')
});

module.exports = { bodySchema };
