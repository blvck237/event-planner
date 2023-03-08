const mongoose = require('mongoose');

var mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
});

const Meals = mongoose.model('Meals', mealSchema);

module.exports = Meals;
