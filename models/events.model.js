const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.',
  },
  date: {
    type: Date,
    required: 'This field is required.',
  },
  address: {
    type: String,
    required: 'This field is required.',
  },
  description: {
    type: String,
    required: 'This field is required.',
  },
  maxGuests: {
    type: Number,
    required: 'This field is required.',
  },
  startTime: {
    type: String,
    required: 'This field is required.',
  },
  endTime: {
    type: String,
    required: 'This field is required.',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

mongoose.model('Events', eventSchema);
