const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SALT } = require('../configs');

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
      select: false, 
      required: [true, 'password required'],
    },
    role: {
      type: String,
      select: false, 
      enum: ['admin', 'user'], 
      default: 'user',
    },
    refreshToken: {
      type: String, 
      select: false, 
      default: ''
    }, 
    resetPasswordLink: {
      type: String,
      select: false, 
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
};

userSchema.statics.encryptPassword = async function (salt, password) {
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
}; 

userSchema.static('makeSalt',  async function () {
  return await bcrypt.genSalt(parseInt(SALT));
}); 

// userSchema.pre('save', function(next) {
//   if(this.isModified('password')) {
//     const salt = makeSalt(); 
//     const hash = encryptPassword(salt, this.password); 
//     this.password = hash; 
//   }
//   next(); 
// }) 

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
