const express = require('express');
const router = express.Router();

const { userAuthMiddleware } = require('../middlewares/auth');
const Meals = require('../models/meals.model');

router.get('/', userAuthMiddleware, (req, res) => {
  // Get meals
  Meals.find((err, docs) => {
    if (!err) {
      res.render('meals/list', {
        list: docs,
        user: req.user,
      });
    } else {
      console.log('Error in retrieving meal list :' + err);
    }
  });
});
