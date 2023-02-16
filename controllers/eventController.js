const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { userAuthMiddleware } = require('../middlewares/auth');
const Events = mongoose.model('Events');
const Guests = mongoose.model('Guests');

router.get('/', userAuthMiddleware, (req, res) => {
  res.render('events/addOrEdit', {
    viewTitle: 'Insert Events',
  });
});
// Details page
router.get('/details/:id', userAuthMiddleware, (req, res) => {
  getRecord(req, res);
});

router.post('/', userAuthMiddleware, (req, res) => {
  if (req.body._id == '') insertRecord(req, res);
  else updateRecord(req, res);
});

async function getRecord(req, res) {
  try {
    const event = await Events.findById(req.params.id);
    // Enum: ['yes', 'no', 'maybe', 'pending']
    const confirmedGuests = await Guests.find({ event: req.params.id, rsvp: 'yes' }).count();
    const pendingGuests = await Guests.find({ event: req.params.id, rsvp: 'pending' }).count();
    const refusedGuests = await Guests.find({ event: req.params.id, rsvp: 'no' }).count();
    const totalGuests = await Guests.find({ event: req.params.id }).count();
    res.render('events/details', {
      event,
      confirmedGuests,
      pendingGuests,
      totalGuests,
      refusedGuests,
    });
  } catch (error) {
    console.log(error);
  }
}

function insertRecord(req, res) {
  // Check if all the fields are filled
  if (!req.body.name || !req.body.date || !req.body.startTime || !req.body.endTime || !req.body.address || !req.body.description || !req.body.maxGuests) {
    res.render('events/addOrEdit', {
      viewTitle: 'Insert Events',
      event: req.body,
      error: 'Please fill all the fields',
    });
    return;
  }

  // Check if date format is correct
  const date = new Date(req.body.date);
  if (isNaN(date.getTime())) {
    res.render('events/addOrEdit', {
      viewTitle: 'Insert Events',
      event: req.body,
      dateError: 'Please enter a valid date in the format DD/MM/YYYY',
    });
    return;
  }

  // Check if start time format is correct
  if (!/^\d{2}:\d{2}$/.test(req.body.startTime)) {
    res.render('events/addOrEdit', {
      viewTitle: 'Insert Events',
      event: req.body,
      startTimeError: 'Please enter a valid start time in the format HH:MM',
    });
    return;
  }

  // Check if end time format is correct
  if (!/^\d{2}:\d{2}$/.test(req.body.endTime)) {
    res.render('events/addOrEdit', {
      viewTitle: 'Insert Events',
      event: req.body,
      endTimeError: 'Please enter a valid end time in the format HH:MM',
    });
    return;
  }

  var event = new Events();
  event.name = req.body.name;
  event.date = new Date(req.body.date); // MM/DD/YYYY
  event.startTime = req.body.startTime; // HH:MM
  event.endTime = req.body.endTime; // HH:MM
  event.address = req.body.address;
  event.description = req.body.description;
  event.maxGuests = Number(req.body.maxGuests);

  event.createdBy = req.user._id;

  event.save((err, doc) => {
    console.log(err);
    if (!err) res.redirect('events/list');
    else {
      res.render('events/addOrEdit', {
        viewTitle: 'Insert Events',
        event: req.body,
        error: 'Error in inserting record',
      });
    }
  });
}

function updateRecord(req, res) {
  Events.findOneAndUpdate({ _id: req.body._id, createdBy: req.user._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.redirect('events/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('events/addOrEdit', {
          viewTitle: 'Update Events',
          event: req.body,
        });
      } else console.log('Error during record update : ' + err);
    }
  });
}

router.get('/list', userAuthMiddleware, async (req, res) => {
  try {
    const events = await Events.find({ createdBy: req.user._id });
    res.render('events/list', { events });
  } catch (error) {
    console.log('Error in retrieving event list :' + err);
  }
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'name':
        body['nameError'] = err.errors[field].message;
        break;
      case 'date':
        body['dateError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:id', userAuthMiddleware, (req, res) => {
  Events.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('events/addOrEdit', {
        viewTitle: 'Update Events',
        event: doc,
      });
    }
  });
});

router.get('/delete/:id', userAuthMiddleware, (req, res) => {
  Events.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/events/list');
    } else {
      console.log('Error in event delete :' + err);
    }
  });
});

module.exports = router;
