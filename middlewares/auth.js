const mongoose = require('mongoose');
const Users = require('../models/users.model');
const Guests = require('../models/guest.model');

const userAuthMiddleware = async (req, res, next) => {
  // log route
  const user = await Users.findById(req.session.userId);
  if (!user) {
    return res.redirect('/login');
  }
  req.user = user;
  next();
};

const guestAuthMiddleware = async (req, res, next) => {
  const guest = await Guests.findById(req.session.userId);
  if (!guest) {
    return res.redirect('/login-guest');
  }
  req.user = guest;
  next();
};

module.exports = { userAuthMiddleware, guestAuthMiddleware };
