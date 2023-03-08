const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'This field is required.',
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: 'This field is required.',
  },
  role: {
    type: String,
    default: 'user',
  },
  token: {
    type: String,
  },
});

async function hashPassword(value) {
  const hash = await bcrypt.hash(value, 12);
  return hash;
}

// Custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// Check mongoose documentation for more hooks: https://mongoosejs.com/docs/middleware.html
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jsonwebtoken.sign({ _id: this._id }, 'JWTKEY');
  this.token = token;
  await this.save();
  return token;
};

userSchema.methods.comparePassword = async function (requestPwd, pwd) {
  const pwdMatch = await bcrypt.compare(requestPwd, pwd);
  return pwdMatch;
};

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
