const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const authMiddleware = async (req, res, next) => {
  const user = await Users.findById(req.session.userId);
  if (!user) {
    return res.redirect('/login');
  }
  req.user = user;
  next();
};

module.exports = { authMiddleware };
