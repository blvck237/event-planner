const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Guests = mongoose.model('Guests');
const Events = mongoose.model('Events');

// Called when you open the guest list page
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Events.findById(req.params.eventId);
    const guests = await Guests.find({ event: req.params.eventId });
    res.render('guests/list', {
      list: guests,
      eventId: req.params.eventId,
      event,
    });
  } catch (error) {
    console.log('Error in retrieving guest list :' + err);
  }
});

router.get('/:eventId/invite', async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Events.findById(eventId);

  res.render('guests/addOrEdit', {
    viewTitle: 'Insert Guests',
    eventId: eventId,
    event
  });
});

router.post('/:eventId', (req, res) => {
  if (req.body._id == '') insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var guest = new Guests();
  guest.fullName = req.body.fullName;
  guest.email = req.body.email;
  guest.mobile = req.body.mobile;
  guest.city = req.body.city;
  guest.event = req.body.eventId;
  guest.save((err, doc) => {
    if (!err) {
      res.redirect(`../guests/${req.params.eventId}`);
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('guests/addOrEdit', {
          viewTitle: 'Insert Guests',
          guest: req.body,
        });
      } else console.log('Error during record insertion : ' + err);
    }
  });
}

function updateRecord(req, res) {
  Guests.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      console.log('Guest updated', req.params.eventId);
      // Go back to the guest list page
      res.redirect(`../guests/${req.params.eventId}`);
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('guests/addOrEdit', {
          viewTitle: 'Update Guests',
          guest: req.body,
        });
      } else console.log('Error during record update : ' + err);
    }
  });
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:eventId/details/:id', (req, res) => {
  Guests.findOne(
    {
      _id: req.params.id,
      event: req.params.eventId,
    },
    (err, doc) => {
      if (!err) {
        res.render('guests/addOrEdit', {
          viewTitle: 'Update Guests',
          guest: doc,
          eventId: req.params.eventId,
        });
      }
    }
  );
});

router.get('/:eventId/delete/:id', (req, res) => {
  Guests.findOneAndRemove(
    {
      _id: req.params.id,
      event: req.params.eventId,
    },
    (err, doc) => {
      if (!err) {
        console.log('Guest deleted', req.params.eventId);
        res.redirect(req.get('referer'));
      } else {
        console.log('Error in guest delete :' + err);
      }
    }
  );
});

module.exports = router;
