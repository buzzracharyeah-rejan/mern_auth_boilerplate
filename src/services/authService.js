const userModel = require('../models/user');
const authService = {
  userSignup: async ({ username, email, password, role }) => {
    let user = await userModel.findOne({ email });
    if (user) throw new Error('email already exists');
    user = await userModel.create({ username, email, password, role });
    return user;
  },
};

module.exports = authService; 