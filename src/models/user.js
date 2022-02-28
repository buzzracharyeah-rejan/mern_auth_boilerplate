const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'user name required'],
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password required'],
    },
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// virtual
// userSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.password = this.encryptPassword(salt, password);
//   })
//   .get(function () {
//     return this._password;
//   });

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  encryptPassword: async function (salt, password) {
    try {
      return await bcrypt.hash(salt, password);
    } catch (error) {
      console.log(error);
    }
  },
  makeSalt: async function () {
    return await bcrypt.genSalt(process.env.SALT);
  },
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
